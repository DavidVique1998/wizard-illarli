<script setup lang="ts">
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/auth';
import { useUIStore } from '@/stores/ui';
import type { Lead } from '@/models/Lead';
import type { Response } from '@/models/Response';
import { router } from '@/router';
import { useToast } from "vue-toastification";
// Get toast interface
const toast = useToast();
// Store
const authStore = useAuthStore();
const uiStore = useUIStore();
// OTP as a string
const otp = ref(''); // OTP as a string
// Validation schema
const schema = yup.object({
  name: yup.string().required('Nombre es obligatorio'),
  lastname: yup.string().required('Apellido es obligatorio'),
  phone: yup
    .string()
    .matches(/^09\d{8}$/, 'Número de teléfono debe tener 10 dígitos y empezar con "09"')
    .required('Número de teléfono es obligatorio'),
});

// Use VeeValidate for form validation
const { handleSubmit, errors, validate } = useForm<Lead>({
  validationSchema: schema,
});

// Form fields
const { value: nameValue } = useField<string>('name');
const { value: lastnameValue } = useField<string>('lastname');
const { value: phoneValue } = useField<string>('phone');

// OTP handling
const isOtpSent = ref(false);
const isOtpVerified = ref(false); // Start as false until OTP is verified

// Send OTP to phone
const sendOTP = async () => {
  // Verify the form
  const verifyForm = await validate();
  if (!verifyForm.valid) return false;
  // Send OTP
  try {
    uiStore.isLoading = true;
    // Send OTP to phone
    const response: Response<any> = await authStore.sendOtp(phoneValue.value);
    uiStore.isLoading = false;
    isOtpSent.value = response.status;
    // Verify if OTP was sent
    if (response.status) {
      toast.success(response.message);
    } else {
      toast.error(response.errors);
    }
  } catch (error) {
    uiStore.isLoading = false;
    isOtpSent.value = false;
    toast.error('Error sending OTP');
    return false;
  }
};

// Verify OTP from phone
const verifyOTP = async (): Promise<boolean> => {
  //Verify the OTP
  try {
    uiStore.isLoading = true;
    // Verify OTP
    const response: Response<Lead> = await authStore.verifyOtp(otp.value);
    uiStore.isLoading = false;
    isOtpVerified.value = response.status;
    // Verify if OTP was verified
    if (response.status) {
      toast.success(response.message);
    } else {
      toast.error(response.errors);
    }
    return response.status;
  } catch (error) {
    uiStore.isLoading = false;
    isOtpVerified.value = false;
    toast.error('Error verifying OTP');
    return false;
  }
};

// Store lead data
const storeLead = async (values: Lead) => {
  // Verify the form
  const verifyForm = await validate();
  if (!verifyForm.valid) return;
  // Store lead
  try {
    uiStore.isLoading = true;
    // Store lead
    const response: Response<Lead> = await authStore.storeLead(values);
    uiStore.isLoading = false;
    // Check response
    if (response.status) {
      toast.success(response.message);
      // Redirect to register page for completion of registration
      router.push('/auth/register');
    } else {
      toast.error(response.errors);
    }
  } catch (error) {
    uiStore.isLoading = false;
    toast.error('Error storing lead');
  }
};

//Set lead data
const onSubmit = handleSubmit(async (values: Lead) => {
  // Verify the form
  const verifyForm = await validate();
  if (!verifyForm.valid) return;
  // Verify OTP
  const verifyOtp = await verifyOTP();
  if (!verifyOtp) return;
  // Store lead
  await storeLead(values);
});

// Reload the form
const reload = () => {
  isOtpSent.value = false;
  isOtpVerified.value = false;
  otp.value = '';
  uiStore.isLoading = false;
};
</script>

<template>
  <!-- Form for OTP verification -->
  <v-form @submit="onSubmit" lazy-validation class="mt-7 loginForm">
    <v-row class="my-0">
      <!-- Name -->
      <v-col cols="12" sm="6" class="py-0">
        <v-text-field :loading="uiStore.isLoading" v-model="nameValue" :error-messages="errors.name" required variant="outlined" class="mt-2 "
          color="primary" placeholder="Nombre" label="Nombre" :disabled="isOtpSent" style="text-align: center;"
          autocomplete="name">
        </v-text-field>
      </v-col>
      <!-- Lastname -->
      <v-col cols="12" sm="6" class="py-0">
        <v-text-field :loading="uiStore.isLoading" v-model="lastnameValue" :error-messages="errors.lastname" required variant="outlined" class="mt-2"
          color="primary" placeholder="Apellido" label="Apellido" :disabled="isOtpSent" style="text-align: center;"
          autocomplete="lastName">
        </v-text-field>
      </v-col>
    </v-row>
    <div>
      <!-- Phone -->
      <v-text-field :loading="uiStore.isLoading" v-model="phoneValue" :error-messages="errors.phone" placeholder="1234567890" class="mt-2" required
        variant="outlined" color="primary" label="Teléfono (e.j., 09xxxxxxxx)" :disabled="isOtpSent"
        style="text-align: center;"></v-text-field>
      <!-- Send OTP -->
      <v-btn color="primary" block class="mt-4" variant="flat" size="large" @click="sendOTP"
        :disabled="isOtpSent" :loading="uiStore.isLoading">SOLICITAR CÓDIGO</v-btn>
      <p class="instruction-text mt-2 text-center">
        <strong> Haz clic en "Solicitar código" </strong>
        <br>
        Enviaremos un <strong>mensaje de texto</strong> con un código a tu número de celular.<br>
      </p>
    </div>
    <div v-if="isOtpSent" class=" text-center">
      <p class="instruction-text text-center">
        El código tiene vigencia de 2 minutos
      </p>
      <!-- OTP input -->
      <v-otp-input :loading="uiStore.isLoading" v-model="otp" length="6"></v-otp-input>
      <!-- Verify OTP -->
      <v-btn :disabled="otp.length < 6 || uiStore.isLoading" color="primary" block class="mt-4" variant="flat" size="large"
        @click="onSubmit" :loading="uiStore.isLoading">VALIDAR CÓDIGO</v-btn>
      <p class="instruction-text text-center">
        Si no recibiste el código haz clic en "Solicitar código"
      </p>
      <!-- Reload button -->
      <div style="display: flex; justify-content: center;">
        <v-btn color="primary" variant="flat" icon style="border-radius: 7px; width: 30px; height: 30px;" @click="reload" :disabled="uiStore.isLoading">
          <v-icon>mdi-reload</v-icon>
        </v-btn>
      </div>
    </div>
  </v-form>
  <!-- End Form for OTP verification -->
</template>