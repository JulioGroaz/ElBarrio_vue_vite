<template>
  <div class="page-wrapper">
    <!-- Sidebar fissa per il filtraggio -->
    <aside class="sidebar">
      <ul>
        <!-- Pulsante per mostrare tutti i prodotti -->
        <li @click="filterByCategory('all')" :tabindex="0" :class="{'active-category': selectedCategory === 'all'}">
          <i class="fa-solid fa-box-open"></i>
          <span class="category-text">Tutti i prodotti</span>
        </li>

        <!-- Elenco delle categorie principali con icone -->
        <li v-for="category in categories" 
            :key="category.id"
            @click="category.name === 'vini' ? toggleViniDropdown() : filterByCategory(category.name)"
            :tabindex="0"
            :class="{'active-category': selectedCategory === category.name}">
          <i :class="getCategoryIcon(category.name)"></i>
          <span class="category-text">{{ category.name }}</span>

          <!-- Aggiungi un'icona dropdown solo per "Vini" -->
          <i v-if="category.name === 'vini'" class="fa" :class="viniDropdownOpen ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
          
          <!-- Mostra le sottocategorie dei vini solo se "Vini" è selezionato -->
          <ul v-if="viniDropdownOpen && category.name === 'vini'" class="wine-subcategories">
            <li @click="filterByCategory('vini_rossi')" :tabindex="0" :class="{'active-category': selectedCategory === 'vini_rossi'}">
              <i class="fa-solid fa-wine-glass" style="color: #800f2f;"></i> <span class="wine-category-text">Vini Rossi</span>
            </li>
            <li @click="filterByCategory('vini_bianchi')" :tabindex="0" :class="{'active-category': selectedCategory === 'vini_bianchi'}">
              <i class="fa-solid fa-wine-glass" style="color: #fdf8e1;"></i> <span class="wine-category-text">Vini Bianchi</span>
            </li>
            <li @click="filterByCategory('vini_rose')" :tabindex="0" :class="{'active-category': selectedCategory === 'vini_rose'}">
              <i class="fa-solid fa-wine-glass" style="color: #ff8fa3;"></i> <span class="wine-category-text">Vini Rosé</span>
            </li>
            <li @click="filterByCategory('vini_bollicine')" :tabindex="0" :class="{'active-category': selectedCategory === 'vini_bollicine'}">
              <i class="fa-solid fa-wine-bottle"></i> <span class="wine-category-text">Vini Bollicine</span>
            </li>
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
    if (imagePath.startsWith('http')) {
        // Se il percorso già contiene un URL completo, restituiscilo così com'è
        return imagePath;
    }
    // Altrimenti, aggiungi il prefisso per l'URL pubblico
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

    // Funzione per associare icone alle categorie
    getCategoryIcon(categoryName) {
      switch (categoryName) {
        case 'birre':
          return 'fa-solid fa-beer-mug-empty';
        case 'caffetteria':
          return 'fa-solid fa-mug-saucer';
        case 'cocktail':
          return 'fa-solid fa-martini-glass-citrus';
        case 'superalcolici':
          return 'fa-solid fa-martini-glass';
        case 'food':
          return 'fa-solid fa-burger';
        case 'analcolici':
          return 'fa-solid fa-bottle-water';
        case 'vini':
          return 'fa-solid fa-champagne-glasses'; 
        case 'aperitivi':
          return 'bi bi-cup-straw aperitivi-icon';
        default:
          return 'fa-solid fa-box-open'; // Icona predefinita
      }
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

/*grandezza icona aperitivi */
.aperitivi-icon {
  font-size: 21px;
}

/* L'ultimo li di ogni ul non ha margin-bottom */
ul li:last-child {
  margin-bottom: 0;
}

/* Il primo li della categoria wine-subcategories ha margin-top */
.wine-subcategories li:first-child {
  margin-top: 10px; 
}


/* Wrapper per la pagina */
.page-wrapper {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

/* Sidebar fissa */
.sidebar {
  width: 250px;
  background-color: black;
  color: white;
  position: fixed;
  top: 70px;
  height: calc(100vh - 70px);
  padding: 20px;
  box-sizing: border-box;
}

.sidebar ul {
  list-style: none;
  padding-left: 10px;
  height: 100%;
  align-content: center;
}

.sidebar li {
  margin-bottom: 15px;
  cursor: pointer;
  color: white;
  transition: color 0.3s ease;
  outline: none;
  display: flex;
  align-items: center;
}

.sidebar li i {
  margin-right: 10px;
}

/* Hover e focus sugli elementi di lista */
.sidebar li:focus, .sidebar li:hover {
  color: #d80630;
  border-left: 4px solid #d80630;
  padding-left: 16px;
}

/* Stili per le sottocategorie (es. vini) */
.wine-subcategories li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding-left: 0px;
}

.wine-category-text {
  margin-left: 10px;
}

/* *** Stili per mobile *** */
@media (max-width: 768px) {
  .sidebar {
    width: 60px;
    top: 50px;
    height: calc(100vh - 50px);
    padding: 0;
  }

  .sidebar li {
    display: block;
    text-align: center;
    margin-bottom: 25px;
  }

  .sidebar li i {
    display: block;
    margin-bottom: 5px;
  }

  .sidebar li .category-text,
  .wine-category-text {
    display: none; /* Nascondi il testo delle categorie e delle sottocategorie su mobile */
  }

  .main-content {
    margin-left: 80px;
  }

  /* Stili specifici per le sottocategorie in mobile */
  .wine-subcategories li {
    padding-left: 0 !important; /* Rimuovi padding a sinistra per allineare con l'icona principale */
  }
  ul.wine-subcategories{
    padding-left: 0;
  }
  .wine-subcategories li:hover, .wine-subcategories li.active-category {
    padding-left: 0 !important; /* Mantieni allineate le sottocategorie anche quando selezionate o hover */
  }
}

/* Layout per tablet: visualizzazione in coppie */
@media (min-width: 769px) and (max-width: 1024px) {
  .container_cards {
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .card-item {
    flex: 1 1 calc(50% - 20px);
    max-width: calc(50% - 20px);
  }
}

/* Layout per desktop: visualizzazione originale */
@media (min-width: 1025px) {
  .container_cards {
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
  }

  .card-item {
    flex: 1 1 calc(25% - 20px);
    max-width: calc(25% - 20px);
  }
}

/* Sfondo per il main */
.container-background {
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding-top: 70px;
  box-sizing: border-box;
}

/* Assicurati che i contenuti non vadano sotto l'header */
.main-content {
  margin-left: 250px;
  width: calc(100vw - 250px);
  min-height: calc(100vh - 70px);
  padding-top: 70px;
  padding: 0;
  box-sizing: border-box;
  overflow-y: auto;
  background-image: url(../style/partials/Sala.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 60px;
    width: calc(100vw - 60px);
  }

  .container-background {
    padding-top: 70px;
    min-height: 100vh;
  }
  .sidebar li:focus, .sidebar li:hover {
    padding-left: 0;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .main-content {
    margin-left: 200px;
    width: calc(100vw - 200px);
  }
}

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
  box-sizing: border-box;
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
