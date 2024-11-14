<template>
  <div class="container">
    <!-- Mostra il loader mentre i dati sono in caricamento -->
    <div v-if="isLoading" class="loader-container">
      <span class="loader"></span>
    </div>

    <!-- Mostra il contenuto quando il caricamento è completato -->
    <div v-else>
      <!-- Verifica se ci sono elementi da mostrare -->
      <div v-if="chisiamo.length > 0">
        <div
          v-for="item in chisiamo"
          :key="item.id"
          class="card mb-3"
        >
          <!-- Percorso corretto per visualizzare l'immagine -->
          <img
            :src="getImagePath(item.image_path)"
            class="card-img-top"
            :alt="item.title"
          />

          <div class="card-body">
            <h5 class="card-title">{{ item.title }}</h5>
            <p class="card-text">{{ item.description }}</p>
          </div>
        </div>
      </div>
      <!-- Messaggio nel caso in cui non ci siano elementi -->
      <div v-else>
        <p>Nessuna informazione disponibile.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChiSiamo",
  data() {
    return {
      chisiamo: [], // Array per memorizzare i dati recuperati
      isLoading: true, // Stato del caricamento
    };
  },
  methods: {
    // Metodo per recuperare i dati dall'API
    fetchChiSiamo() {
      fetch("http://localhost:8001/api/chi-siamo") // Sostituisci con l'endpoint API corretto
        .then((response) => response.json())
        .then((data) => {
          this.chisiamo = data;
          // Ritarda la fine del caricamento di 1 secondo dopo il caricamento dei dati
          setTimeout(() => {
            this.isLoading = false;
          }, 1000); // 1 secondo di ritardo
        })
        .catch((error) => {
          console.error("Errore nel recupero dei dati:", error);
          this.isLoading = false; // Disabilita comunque il caricamento in caso di errore
        });
    },
    // Metodo per ottenere il percorso dell'immagine
    getImagePath(imagePath) {
      return `http://localhost:8001/storage/${imagePath}`; // Adatta l'URL a seconda dell'ambiente (prod/localhost)
    },
  },
  mounted() {
    this.fetchChiSiamo(); // Richiama il metodo per recuperare i dati quando il componente è montato
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}

.card {
  background-color: #2c2e3a; /* Colore dello sfondo della card */
  color: #ffffff; /* Colore del testo */
}

.card-img-top {
  max-height: 300px;
  object-fit: cover;
}

.card-body {
  text-align: center;
  color: #ffffff; /* Colore del testo nel body */
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
