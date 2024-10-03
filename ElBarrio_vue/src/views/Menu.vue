<template>
  <div class="page-wrapper">
    <!-- Sidebar fissa per il filtraggio -->
    <aside class="sidebar">
      <ul>
        <!-- Pulsante per mostrare tutti i prodotti -->
        <li @click="filterByCategory('all')" :tabindex="0" :class="{'active-category': selectedCategory === 'all'}">
          Tutti i prodotti
        </li>

        <!-- Elenco delle categorie principali -->
        <li v-for="category in categories" 
            :key="category.id"
            @click="category.name === 'vini' ? toggleViniDropdown() : filterByCategory(category.name)"
            :tabindex="0"
            :class="{'active-category': selectedCategory === category.name}">
          <span>{{ category.name }}</span>
          
          <!-- Aggiungi un'icona dropdown solo per "Vini" -->
          <i v-if="category.name === 'vini'" class="fa" :class="viniDropdownOpen ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
          
          <!-- Mostra le sottocategorie dei vini solo se "Vini" è selezionato -->
          <ul v-if="viniDropdownOpen && category.name === 'vini'" class="wine-subcategories">
            <li @click="filterByCategory('vini_rossi')" :tabindex="0" :class="{'active-category': selectedCategory === 'vini_rossi'}">Vini Rossi</li>
            <li @click="filterByCategory('vini_bianchi')" :tabindex="0" :class="{'active-category': selectedCategory === 'vini_bianchi'}">Vini Bianchi</li>
            <li @click="filterByCategory('vini_rose')" :tabindex="0" :class="{'active-category': selectedCategory === 'vini_rose'}">Vini Rosé</li>
            <li @click="filterByCategory('vini_bollicine')" :tabindex="0" :class="{'active-category': selectedCategory === 'vini_bollicine'}">Vini Bollicine</li>
          </ul>
        </li>
      </ul>
    </aside>

    <!-- Contenuto principale -->
    <main class="main-content">
      <!-- Sfondo opaco che copre solo il main -->
      <div class="container-background">
        <div class="container_cards">
          <div
            class="card-item"
            v-for="menu in menus"
            :key="menu.id"
          >
            <div class="card-menu">
              <div class="card-image-menu">
                <img
                  :src="getImagePath(menu.image_path)"
                  class="img-fluid rounded-start card-image-menu"
                  :alt="menu.name"
                />
              </div>
              <div class="card-description">
                <h5 class="card-title">{{ menu.name }}</h5>
                <p class="card-text">{{ menu.description }}</p>
                <p class="card-text">
                  <small>{{ formatPrice(menu.price) }} €</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      menus: [], // Elenco completo dei menu
      categories: [], // Elenco delle categorie principali
      selectedCategory: 'all', // Categoria selezionata, default 'all'
      viniDropdownOpen: false, // Variabile per gestire l'apertura del dropdown dei vini
    };
  },
  methods: {
    // Metodo per ottenere il percorso completo delle immagini
    getImagePath(imagePath) {
      return `http://localhost:8001/storage/${imagePath}`;
    },

    // Formattazione del prezzo
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

    // Funzione per filtrare i prodotti in base alla categoria
    filterByCategory(categoryName) {
      this.selectedCategory = categoryName;
      this.viniDropdownOpen = false; // Chiude il dropdown dopo la selezione
      this.fetchMenus(categoryName); // Filtra i menu
    },

    // Funzione per aprire/chiudere il dropdown di "Vini"
    toggleViniDropdown() {
      this.viniDropdownOpen = !this.viniDropdownOpen;
      this.selectedCategory = 'vini'; // Mantiene "Vini" come categoria selezionata
    },

    // Chiamata API per ottenere i menu, eventualmente filtrati per categoria
    fetchMenus(category = null) {
      let url = 'http://localhost:8001/api/menu';
      if (category && category !== 'all') {
        url += `?category=${category}`;
      }

      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.menus = data;
        })
        .catch(error => {
          console.error('Errore durante il fetch del menu:', error);
        });
    },

    // Chiamata API per ottenere le categorie
    fetchCategories() {
      fetch('http://localhost:8001/api/categories')
        .then(response => response.json())
        .then(data => {
          this.categories = data;
        })
        .catch(error => {
          console.error('Errore durante il fetch delle categorie:', error);
        });
    },
  },

  // Quando il componente è montato, recupera i menu e le categorie
  mounted() {
    this.fetchMenus();
    this.fetchCategories();
  },
};
</script>

<style scoped>
/* Wrapper per la pagina */
.page-wrapper {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden; /* Previene overflow e spazi bianchi */
}

/* Sidebar fissa */
.sidebar {
  width: 250px;
  background-color: black;
  color: white;
  position: fixed;
  top: 70px; /* Posiziona sotto l'header */
  height: calc(100vh - 70px); /* Altezza calcolata per evitare sovrapposizione con l'header */
  padding: 20px;
  box-sizing: border-box;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 15px;
  cursor: pointer;
  color: white;
  transition: color 0.3s ease; /* Transizione morbida per il colore */
  outline: none;
}

/* Focus sugli elementi di lista */
.sidebar li:focus, .sidebar li:hover {
  color: #d80630; /* Colore rosso al focus e hover */
  border-left: 4px solid #d80630; /* Aggiungi una linea rossa a sinistra al focus/hover */
  padding-left: 16px; /* Compensa la larghezza del bordo */
}

.wine-subcategories li {
  margin-bottom: 10px;
  padding-left: 20px; /* Aggiungi spazio a sinistra per le sottocategorie */
}

/* Contenuto principale */
.main-content {
  margin-left: 250px; /* Stessa larghezza della sidebar */
  width: calc(100vw - 250px); /* Sottrai la larghezza della sidebar */
  min-height: calc(100vh - 70px); /* Usa min-height per garantire che il contenuto copra sempre tutto lo schermo */
  padding: 0;
  box-sizing: border-box;
  overflow-y: auto;
  background-image: url(../style/partials/Sala.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed; /* L'immagine di sfondo rimane fissa */
}

.container-background {
  background-color: rgba(0, 0, 0, 0.7); /* Sfondo opaco solo per il main */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white; /* Colore del testo bianco */
}

/* Mantieni invariato lo stile delle card e del contenuto */
.container_cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
}

.card-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  flex: 1 1 calc(25% - 20px); /* 25% per ciascuna card meno il gap */
  box-sizing: border-box;
  max-width: calc(25% - 20px); /* Imposta la larghezza massima per avere 4 card per riga */
  min-height: 300px; /* Imposta un'altezza minima comune per tutte le card */
  padding: 10px;
}

.card-menu {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
}

.card-image-menu {
  border-radius: 50%;
  background-color: black;
  height: 150px;
  width: 150px;
}

.card-description {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 10px 0;
}

.card-text {
  font-size: 1rem;
  margin: 5px 0;
}
</style>
