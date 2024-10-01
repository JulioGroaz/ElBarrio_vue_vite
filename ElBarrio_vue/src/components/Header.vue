<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <!-- Inserisci il logo al posto del testo Navbar -->
        <a class="navbar-brand" href="#">
          <img src="@/assets/Logo.png" alt="Logo" class="logo">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <!-- Usa <a> con href per la navigazione -->
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
  </style>
  