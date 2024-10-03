<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-body-tertiary fixed-header">
      <div class="container-fluid">
        <!-- Inserisci il logo al posto del testo Navbar -->
        <a class="navbar-brand" href="#">
          <img src="@/assets/Logo.png" alt="Logo" class="logo">
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-link" href="/">Home</a>
            <a class="nav-link" href="/menu">Menu</a>
            <a class="nav-link" href="/eventi">Eventi</a>
            <a class="nav-link" href="/chi-siamo">Chi Siamo</a>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: "HeaderApp",
  };
  </script>
  
  <style scoped>
  /* Stile per il logo */
  .logo {
    height: 50px;
    width: auto;
  }
  
  /* Fissa l'header in cima alla pagina */
  .fixed-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000; /* Assicura che l'header sia sopra altri elementi */
    background-color: #FA7070; /* Colore di sfondo come richiesto */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Aggiunge un'ombra per l'evidenziazione */
  }
  
  /* Aggiungi un margine al contenuto per evitare sovrapposizioni con l'header */
  body, html {
    padding-top: 70px; /* Altezza dell'header */
  }
  </style>
  