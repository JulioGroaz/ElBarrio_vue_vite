<template>
  <div class="container">
    <div
      class="card mb-3"
      v-for="menu in menus"
      :key="menu.id"
      style="max-width: 540px;"
    >
      <div class="row g-0">
        <div class="col-md-4">
          <img
            :src="getImagePath(menu.image_path)"
            class="img-fluid rounded-start"
            :alt="menu.name"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ menu.name }}</h5>
            <p class="card-text">{{ menu.description }}</p>
            <p class="card-text">
              <small class="text-muted">{{ formatPrice(menu.price) }} €</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      menus: [],
    };
  },
  methods: {
    // Modifica per restituire un URL assoluto con http://localhost
    getImagePath(imagePath) {
      return `http://localhost/storage/${imagePath}`;
    },
    // Formatta il prezzo in modo appropriato
    formatPrice(price) {
      if (price == null || price === '') {
        return 'N/A';
      }
      const numericPrice = parseFloat(price);
      if (isNaN(numericPrice)) {
        return 'N/A';
      }
      return numericPrice.toFixed(2).replace('.', ',');
    },
  },
  mounted() {
    console.log('Componente montato');
    // Effettua una chiamata API per recuperare i menu
    fetch('http://localhost:8001/api/menu')
      .then(response => response.json())
      .then(data => {
        console.log('Dati ricevuti:', data);
        this.menus = data;
      })
      .catch(error => {
        console.error('Errore durante il fetch del menu:', error);
      });
  },
};
</script>
