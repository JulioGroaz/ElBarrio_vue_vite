<template>
  <div class="container">
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
</template>

<script>
export default {
  name: "ChiSiamo",
  data() {
    return {
      chisiamo: [], // Array per memorizzare i dati recuperati
    };
  },
  methods: {
    // Metodo per recuperare i dati dall'API
    fetchChiSiamo() {
      fetch("http://localhost:8001/api/chi-siamo") // Sostituisci con l'endpoint API corretto
        .then((response) => response.json())
        .then((data) => {
          this.chisiamo = data;
        })
        .catch((error) => {
          console.error("Errore nel recupero dei dati:", error);
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

.card-img-top {
  max-height: 300px;
  object-fit: cover;
}

.card-body {
  text-align: center;
}
</style>
