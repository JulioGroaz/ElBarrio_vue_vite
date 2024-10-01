<script>
import Header from './components/Header.vue'; // Importa il componente Header
import { RouterView } from 'vue-router'; // Importa RouterView

export default {
  components: {
    Header,
  },
  data() {
    return {
      // Puoi definire qui i tuoi dati se necessario
    };
  },
};
</script>

<template>
  <div>
    <!-- Usa il componente Header -->
    <Header />

    <!-- Usa router-view per rendere le pagine dinamicamente -->
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@use '../node_modules/bootstrap/scss/bootstrap.scss'; // Usa Bootstrap per gli stili
</style>
