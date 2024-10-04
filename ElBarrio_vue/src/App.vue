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
  <header>
     <!-- Usa il componente Header -->
    <Header />
    <!-- Usa router-view per rendere le pagine dinamicamente -->
    
  </header>
   
  <main>
    <div class="container-background">
      <router-view></router-view>
    </div>
  </main>
</template>

<style lang="scss">
@use '../node_modules/bootstrap/scss/bootstrap.scss'; // Usa Bootstrap per gli stili

main{
  height: 100vh; 
  padding-top: 75px; 
  overflow-y: auto; 
}
@media (max-width: 768px){
  main{
    height: 100vh; 
  padding-top: 42px; 
  overflow-y: auto;
  }
}
</style>
