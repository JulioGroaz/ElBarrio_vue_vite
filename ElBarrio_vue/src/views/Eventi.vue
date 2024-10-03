<template>
  <div class="container">
    <div
      class="card mb-3"
      v-for="event in events"
      :key="event.id"
      style="max-width: 540px;"
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
          <small class="text-muted">Data e ora: {{ event.event_date_time }}</small>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventsPage',
  data() {
    return {
      events: [],
    };
  },
  methods: {
    getImagePath(imagePath) {
      // Assicurati che l'URL del percorso sia corretto e funzioni in produzione
      return `http://localhost:8001/storage/${imagePath}`;
    },
  },
  mounted() {
    console.log('Componente montato');
    // Modifica l'URL per corrispondere al tuo percorso API
    fetch('http://localhost:8001/api/eventi') // Modifica "events" a "eventi" in base alla rotta definita
      .then(response => response.json())
      .then(data => {
        console.log('Dati ricevuti per gli eventi:', data);
        this.events = data;
      })
      .catch(error => {
        console.error('Errore nel recupero degli eventi:', error);
      });
  },
};
</script>

<style scoped>
/* Puoi aggiungere i tuoi stili qui */
</style>
