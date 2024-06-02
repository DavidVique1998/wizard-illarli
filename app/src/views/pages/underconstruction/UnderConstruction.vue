<script setup lang="ts"></script>

<template>
  <v-row no-gutters class="bg-containerBg" style="min-height: 100vh">
    <v-col class="d-flex align-center justify-center">
      <div class="text-center">
        <div class="constructionWrapper">
          <img src="@/assets/images/maintenance/under-construction.svg" alt="under construction" />
        </div>
        <h1 class="text-h1 mt-9 mb-3">Construyendo</h1>
        <p class="text-h6 text-lightText constructionContent">
          Hey! Favor checkear este sitio despues. Estamos haciendo algunos mantenimientos en este momento.
        </p>
        <v-btn variant="flat" color="primary" to="/auth/login">Volver al inicio</v-btn>
      </div>
    </v-col>
  </v-row>
</template>
<style lang="scss">
.constructionWrapper {
  @media (min-width: 0px) {
    width: 300px;
    margin-inline: auto;
  }
  @media (min-width: 768px) {
    width: 480px;
  }
}
.constructionContent {
  width: 83%;
  margin-inline: auto;
}
</style>
