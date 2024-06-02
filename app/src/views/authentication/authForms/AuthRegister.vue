<script setup lang="ts">
import { ref, watch } from 'vue';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/auth';
import { useUIStore } from '@/stores/ui';
import type { Lead } from '@/models/Lead';
import type { Ruc } from '@/models/Ruc';
import type { Response } from '@/models/Response';
import VerifyRuc from './partials/VerifyRuc.vue';
import { useToast } from "vue-toastification";
import { router } from '@/router';

// Get toast interface
const toast = useToast();

// Store
const authStore = useAuthStore();
const uiStore = useUIStore();

//Define Emits
const emit = defineEmits(['ruc-verified']);

//Create a instance of the Ruc interface
let ruc: Ruc = {
  ruc: '',
  businessname: '',
  subsidiaries: [],
};

// Form validation schema
const schema = yup.object({
  address: yup.string(),
  commercialname: yup.string(),
  businessname: yup.string(),
  code: yup.string().required('Filial es obligatoria'),
  email: yup.string().email('Correo electrónico no es válido').required('Correo electrónico es obligatorio'),
});

// Use VeeValidate for form validation
const { handleSubmit, errors, validate } = useForm<Lead>({
  validationSchema: schema,
});

// Form fields
const { value: addressValue } = useField<string>('address');
const { value: commercialnameValue } = useField<string>('commercialname');
const { value: businessnameValue } = useField<string>('businessname');
const { value: codeValue } = useField<string>('code');
const { value: emailValue } = useField<string>('email');

// Is ruc verified
const isRucVerified = ref(false);

// Codes for subsidiaries
let codes: string[] = [];

// Load ruc data from emit ruc-verified
const loadRuc = (rucData: Ruc) => {
  isRucVerified.value = true;
  ruc = rucData;
  businessnameValue.value = ruc.businessname;
  codes = ruc.subsidiaries.map((subsidiary) => subsidiary.code);
}

// Store lead data
const storeLead = async (lead: Lead) => {
  // Verify form
  const verifyForm = await validate();
  if (!verifyForm.valid) return false;
  //Merge the lead with authStore.lead
  lead = {...authStore.lead, ...lead};
  // Add ruc data to lead
  lead.ruc = ruc.ruc;
  lead.businessname = ruc.businessname;
  // Store lead
  try {
    // Make call to store lead
    uiStore.isLoading = true;
    const response: Response<Lead> = await authStore.storeLead(lead);
    uiStore.isLoading = false;
    // Check response
    if (response.status) {
      toast.success(response.message);
      // Redirect to approval page
      router.push('/auth/approval');
    }
    else {
      toast.error(response.message);
    }
  } catch (error) {
    uiStore.isLoading = false;
    toast.error('Error store lead');
    return false;
  }
};

// Submit function
const onSubmit = handleSubmit(async (values: Lead) => {
  // Verify form
  const verifyForm = await validate();
  if (!verifyForm.valid) return false;
  // Store lead
  await storeLead(values);
});

// Update subsidiary fields when code changes
const updateSubsidiaryFields = (code: String) => {
  const selectedSubsidiary = ruc.subsidiaries.find(sub => sub.code === code);
  if (selectedSubsidiary) {
    addressValue.value = selectedSubsidiary.address;
    commercialnameValue.value = selectedSubsidiary.commercial_name;
  } else {
    addressValue.value = '';
    commercialnameValue.value = '';
  }
};

// Watch for changes in the code value
watch(codeValue, (newValue) => {
  updateSubsidiaryFields(newValue);
});

</script>

<template>
  <!-- Partial Verify Ruc with event when is verified with the ruc data -->
  <VerifyRuc @ruc-verified="loadRuc" />
  <!-- Form Lead completion -->
  <v-form @submit="onSubmit" lazy-validation class="mt-7 loginForm">
    <template v-if="isRucVerified">
      <!-- Business name -->
      <v-text-field :loading="uiStore.isLoading" v-model="businessnameValue" :error-messages="errors.businessname" placeholder="Razón Social"
        variant="outlined" color="primary" label="Razón Social" class="mt-4" style="text-align: center;" readonly
        autocomplete="businessname">
      </v-text-field>
      <v-row>
        <!-- Filial -->
        <v-col cols="4">
          <v-select :loading="uiStore.isLoading" v-model="codeValue" :error-messages="errors.code" :items="codes" variant="outlined" color="primary"
            label="Filial" class="mt-4" style="text-align: center;" clearable autocomplete="code">
          </v-select>
        </v-col>
        <!-- Address -->
        <v-col cols="8">
          <v-text-field :loading="uiStore.isLoading" v-model="addressValue" :error-messages="errors.address" placeholder="Dirección"
            variant="outlined" color="primary" label="Dirección" class="mt-4" style="text-align: center;" readonly>
          </v-text-field>
        </v-col>
      </v-row>
      <!-- Commercial name -->
      <v-text-field :loading="uiStore.isLoading" v-model="commercialnameValue" :error-messages="errors.commercialname" placeholder="Nombre Comercial"
        required variant="outlined" color="primary" label="Nombre Comercial" class="mt-4" style="text-align: center;"
        readonly></v-text-field>
      <!-- Email -->
      <v-text-field :loading="uiStore.isLoading" v-model="emailValue" :error-messages="errors.email" placeholder="Correo electrónico"
        variant="outlined" color="primary" label="Correo electrónico" class="mt-4" style="text-align: center;"
        autocomplete="email"></v-text-field>
      <!-- Store lead -->
      <v-btn color="primary" block class="mt-4" variant="flat" size="large" @click="onSubmit"
        :loading="uiStore.isLoading">CREAR DEMO</v-btn>
    </template>
  </v-form>
  <!-- End Form Lead completion -->
</template>
