<template>
    <center>
      <h1>The page was not Found!</h1>
      <p>
        <NuxtLink to="/profile">Go home?</NuxtLink>
      </p>
    </center>
  </template>
  
  <script>
  
    export default {
      name: 'NotFound'
    }
  
  </script>
  
  <style scoped>
  
    center {
      margin: 15vw;
    }
  
    h1 {
      color: var(--border);
      font-size: 2em;
    }
  
  </style>
  