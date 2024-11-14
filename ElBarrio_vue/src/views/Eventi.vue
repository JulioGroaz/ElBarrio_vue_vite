<template>
  <div class="container">
    <!-- Mostra il loader mentre i dati sono in caricamento -->
    <div v-if="isLoading" class="loader-container">
      <span class="loader"></span>
    </div>

    <!-- Mostra il contenuto quando il caricamento è completato -->
    <div v-else class="cards-container">
      <div
        class="card mb-3"
        v-for="event in events"
        :key="event.id"
        style="background-color: #2c2e3a; color: #ffffff;"
      >
        <img
          :src="getImagePath(event.image_path)"
          class="img-fluid"
          :alt="event.title"
          style="height: 300px; object-fit: cover;"
        />
        <div class="card-body">
          <h5 class="card-title">{{ event.title }}</h5>
          <p class="card-text">{{ event.description }}</p>
          <p class="card-text">
            <small>Data e ora: {{ event.event_date_time }}</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventsPage',
  data() {
    return {
      events: [], // Elenco degli eventi
      isLoading: true, // Variabile che controlla se il caricamento è in corso
    };
  },
  methods: {
    // Metodo per ottenere il percorso completo dell'immagine
    getImagePath(imagePath) {
      return `http://localhost:8001/storage/${imagePath}`;
    },
  },
  mounted() {
    console.log('Componente montato');
    // Simula il caricamento degli eventi con una chiamata API
    fetch('http://localhost:8001/api/eventi')
      .then((response) => response.json())
      .then((data) => {
        console.log('Dati ricevuti per gli eventi:', data);
        this.events = data;
        // Ritarda la fine del caricamento di 1 secondo dopo aver ottenuto i dati
        setTimeout(() => {
          this.isLoading = false;
        }, 1000); // 1 secondo di ritardo
      })
      .catch((error) => {
        console.error('Errore nel recupero degli eventi:', error);
        this.isLoading = false; // Disabilita comunque il caricamento in caso di errore
      });
  },
};
</script>

<style scoped>
.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

/* Stili per le card */
.card {
  flex: 1 1 calc(100%); /* Su mobile prende tutta la larghezza */
  max-width: 100%;
}

.card-body {
  background-color: #2c2e3a; /* Colore dello sfondo della card */
  color: #ffffff; /* Colore del testo */
}

.card-text small {
  color: #ffffff; /* Colore per la data e l'ora */
}

.card-title {
  color: #ffffff; /* Colore per il titolo */
}

.mb-3 {
  margin-top: 25px;
}

/* Disposizione a coppie per tablet */
@media (min-width: 768px) {
  .card {
    flex: 1 1 calc(50% - 20px); /* Prende metà dello spazio disponibile */
    max-width: calc(50% - 20px);
  }
}

/* Disposizione a coppie per desktop */
@media (min-width: 1024px) {
  .card {
    flex: 1 1 calc(50% - 20px); /* Prende metà dello spazio disponibile */
    max-width: calc(50% - 20px);
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
  background-color:  rgb(26, 26, 26); /* Sfondo scuro */
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
