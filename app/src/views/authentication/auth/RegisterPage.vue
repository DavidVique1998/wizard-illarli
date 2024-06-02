<script setup lang="ts">
import WizardContainer from '../utils/WizardContainer.vue';
import AuthRegister from '../authForms/AuthRegister.vue';
</script>

<template>
  <WizardContainer>
    <template #subtitle>
      <p class="instruction-text text-center">
        Ingresa el número de RUC de tu negocio para finalizar la configuración de tu <strong>DEMO</strong>.
      </p>
    </template>
    <!-- Register Form -->
    <AuthRegister />
    <!-- Register Form -->
  </WizardContainer>
</template>
