<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import type { Lead } from '@/models/Lead';

// Store
const authStore = useAuthStore();

//Lead
const lead: Lead = authStore.lead;

</script>
<template>
  <div>
    <!-- Check Icon -->
    <v-img src="/img/check-icon.png" class="mb-10 mx-auto" style="max-width: 125px" aspect-ratio="1"></v-img>
    <!-- Details -->
    <p class="text-center">
      Las credenciales y link de acceso fueron enviadas a tu correo electrónico <br />
      <strong>{{ lead.email }}</strong> también las podrás encontrar en tu Whatsapp, verifica el spam de tu correo <br />
      Si necesitas ayuda puedes comunicarte al número <strong>0985364973</strong>
    </p>
  </div>
</template>
