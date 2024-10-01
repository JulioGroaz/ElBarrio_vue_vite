<!-- src/views/ChiSiamo.vue -->
<template>
    <div class="chi-siamo">
      <h1>Chi Siamo</h1>
      <p>{{ chiSiamo.description }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ChiSiamo',
    data() {
      return {
        chiSiamo: {},
      };
    },
    mounted() {
      fetch('http://your-laravel-backend/api/chi-siamo')
        .then(response => response.json())
        .then(data => {
          this.chiSiamo = data;
        });
    },
  };
  </script>
  
  <style scoped>
  .chi-siamo {
    padding: 2rem;
  }
  </style>
  