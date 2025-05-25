<template>
    <div class="grid">
      <ProductItem v-for="product in products" :key="product.id" :product="product" />
    </div>
  </template>
  
  <script>
  import ProductItem from './ProductItem.vue'
  export default {
    props: ['products'],
    components: { ProductItem }
  }
  </script>
  
  <style scoped>
  .grid {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    padding: 1rem;
  }
  </style>  