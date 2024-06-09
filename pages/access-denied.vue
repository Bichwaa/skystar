<template>
    <center>
      <h1>Access to this page is restricted. Contact admin if this is a mistake</h1>
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
  