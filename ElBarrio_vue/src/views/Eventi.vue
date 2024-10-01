<!-- src/views/Eventi.vue -->
<template>
    <div class="eventi">
      <h1>I nostri Eventi</h1>
      <ul>
        <li v-for="evento in eventi" :key="evento.id">{{ evento.title }} - {{ evento.event_date_time }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Eventi',
    data() {
      return {
        eventi: [],
      };
    },
    mounted() {
      fetch('http://your-laravel-backend/api/eventi')
        .then(response => response.json())
        .then(data => {
          this.eventi = data;
        });
    },
  };
  </script>
  
  <style scoped>
  .eventi {
    padding: 2rem;
  }
  </style>
  