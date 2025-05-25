<template>
    <div id="app">
      <Navbar />
      <router-view />
    </div>
  </template>
  
  <script>
  import Navbar from './components/Navbar.vue'
  export default { components: { Navbar } }
  </script>
  
  <style>
  body {
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    background-color: #f4f4f4;
    color: #1a1a1a;
  }
  a {
    color: inherit;
  }
  </style>