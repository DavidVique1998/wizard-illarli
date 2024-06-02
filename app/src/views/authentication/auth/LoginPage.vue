<script setup lang="ts">
import WizardContainer from '../utils/WizardContainer.vue';
import AuthLogin from '../authForms/AuthLogin.vue';
</script>

<template>
  <WizardContainer>
    <template #subtitle>
      <p class="instruction-text">
        <strong>Favor llena estos campos para acceder al DEMO de inmediato</strong>.
      </p>
    </template>
    <!---Login Form-->
    <AuthLogin />
    <!---Login Form-->
  </WizardContainer>
</template>
