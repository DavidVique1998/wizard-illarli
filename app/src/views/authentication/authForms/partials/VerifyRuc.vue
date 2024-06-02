<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/auth';
import { useUIStore } from '@/stores/ui';
import type { Lead } from '@/models/Lead';
import type { Response } from '@/models/Response';
import type { Ruc } from '@/models/Ruc';
import { useToast } from "vue-toastification";
// Get toast interface
const toast = useToast();
// Store
const authStore = useAuthStore();
const uiStore = useUIStore();
//Define Emits
const emit = defineEmits(['ruc-verified', 'ruc-not-verified']);
// Form validation schema
const schema = yup.object({
    ruc: yup.string().required('RUC es obligatorio'),
});
// Use VeeValidate for form validation
const { handleSubmit, errors, validate } = useForm<Lead>({
    validationSchema: schema,
});
// Form fields
const { value: rucValue } = useField<string>('ruc');

// Verify ruc
const verifyRuc = async () => {
    // Verify the form
    const verifyForm = await validate();
    if (!verifyForm.valid) return false;
    // Verify RUC
    try {
        uiStore.isLoading = true;
        //Call the verifyRuc method from the store
        const response: Response<Ruc> = await authStore.verifyRuc(rucValue.value);
        uiStore.isLoading = false;
        // Verify if RUC was verified
        if (response.status) {
            toast.success("RUC verified");
            emit('ruc-verified', response.data);
        }else{
            toast.error(response.errors);
            emit('ruc-not-verified');
        }
    } catch (error) {
        uiStore.isLoading = false;
        toast.error('Error verifying RUC');
    }
};

// Submit function
const onSubmit = handleSubmit(async (values: Lead) => {
    // Verify the form
    const verifyForm = await validate();
    if (!verifyForm.valid) return false;
    // Verify RUC
    await verifyRuc();
});

</script>

<template>
    <section>
        <!-- Form to verify RUC -->
        <v-form @submit="onSubmit" lazy-validation class="mt-7 loginForm">
            <v-row>
                <!-- Ruc Num -->
                <v-col cols="10">
                    <v-text-field :loading="uiStore.isLoading" v-model="rucValue" :error-messages="errors.ruc"
                        placeholder="Ingrese su número de RUC" required variant="outlined" color="primary" label="RUC"
                        class="centered-input" autocomplete="ruc">
                    </v-text-field>
                </v-col>
                <!-- Verify RUC -->
                <v-col cols="2" class="d-flex align-top">
                    <v-btn :loading="uiStore.isLoading"  icon color="primary" style="border-radius: 7px;" @click="verifyRuc">
                        <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
        <!-- End Form to verify RUC -->
    </section>
</template>