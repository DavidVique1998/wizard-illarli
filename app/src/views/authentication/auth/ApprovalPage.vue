<script setup lang="ts">
import WizardContainer from '../utils/WizardContainer.vue';
import ApprovalMessage from '../authForms/ApprovalMessage.vue';
</script>

<template>
  <WizardContainer>
    <template #subtitle>
      <h1 class="instruction-text">
        <strong> ¡Te recordamos que tu DEMO ya fue creado! </strong>
      </h1>
    </template>
    <!---Approval Form-->
    <ApprovalMessage />
    <!---Approval Form-->
  </WizardContainer>
</template>
