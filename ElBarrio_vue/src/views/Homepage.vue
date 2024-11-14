<!-- src/views/Home.vue -->
<template>
  <div>
    <!-- Mostra il loader mentre i dati sono in caricamento -->
    <div v-if="isLoading" class="loader-container">
      <span class="loader"></span>
    </div>

    <!-- Mostra il contenuto quando il caricamento è completato -->
    <div v-else class="home">
      <router-link to="/menu" class="section menu">
        <div class="overlay">
          <span>Menu</span>
        </div>
      </router-link>
      <router-link to="/eventi" class="section eventi">
        <div class="overlay">
          <span>Eventi</span>
        </div>
      </router-link>
      <router-link to="/chi-siamo" class="section chi-siamo">
        <div class="overlay">
          <span>Chi siamo</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      isLoading: true, // Stato di caricamento iniziale
    };
  },
  mounted() {
    // Ritarda la rimozione del loader di 1 secondo
    setTimeout(() => {
      this.isLoading = false;
    }, 1000); // 1 secondo di ritardo
  },
};
</script>

<style scoped>
.home {
  padding: 0;
  display: flex;
  flex-direction: column; /* Le sezioni sono una sotto l'altra per mobile */
}

/* Stili per le sezioni */
.section {
  height: 15rem;
  width: 100%;
  position: relative; /* Necessario per posizionare l'overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0;
  transition: height 0.3s ease, width 0.3s ease;
  text-align: center;
}
.section:hover{
  height: 20rem;
}
/* Overlay semitrasparente */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Opacità al 50% */
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff; /* Colore delle scritte */
  font-size: 2rem;
  font-weight: bold;
}

/* Aggiungi colori diversi per ogni sezione (facoltativo) */
.menu {
  background-image: url(../assets/Menu_Background.webp);
  background-position: center;
  background-size: cover;
}

.eventi {
  background-image: url(../assets/eventi_background.jpg);
  background-position: center;
  background-size: cover;
}

.chi-siamo {
  background-image: url(../assets/chisiamo_background.jpg);
  background-position: center;
  background-size: cover;
}

/* Media query per desktop */
@media (min-width: 1024px) {
  .home {
    flex-direction: row;
    align-content: center;
    justify-content: center;
    margin-top: 5rem;
  }

  .section {
    height: 465px;
    width: calc(80% / 3);
  }

  .section:hover {
    height: 465px;
    width: calc(100% / 3);
    
  }
}

/* Stili per il loader */
.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(26, 26, 26); /* Sfondo scuro */
  z-index: 1000; /* Mantieni il loader visibile sopra tutto */
}

/* Stile del loader */
.loader {
  width: 40px;
  height: 98px;
  display: inline-block;
  border: 2px solid white; /* Colore bianco per il bordo */
  border-radius: 20px 20px 4px 4px;
  background: white; /* Colore del loader bianco */
  position: relative;
  animation: fill 2s linear infinite alternate;
}

.loader::after {
  content: '';
  position: absolute;
  left: 50%;
  top: -35px; /* Posiziona l'elemento pseudo sopra */
  transform: translateX(-50%);
  border: 2px solid white; /* Bordo bianco */
  border-bottom: none;
  background: white; /* Colore bianco */
  width: 15px;
  height: 35px;
  border-radius: 10px 10px 0 0;
  animation: fillNeck 2s linear infinite alternate;
}

@keyframes fill {
  0% { box-shadow: 0 0 inset; }
  50%, 100% { box-shadow: 0 -98px inset red; } /* Contenuto riempito in rosso */
}

@keyframes fillNeck {
  0%, 50% { box-shadow: 0 0 inset; }
  100% { box-shadow: 0 -20px inset red; } /* Colore rosso per il collo */
}
</style>
