<template>
    <div class="home-container">
      <h1>Produkter</h1>
  
      <div class="category-filters">
        <button
          v-for="cat in categories"
          :key="cat"
          :class="{ active: selectedCategory === cat }"
          @click="filterCategory(cat)"
        >
          {{ cat }}
        </button>
      </div>
  
      <ProductList :products="filteredProducts" />
    </div>
  </template>
  
  <script>
  import ProductList from '../components/ProductList.vue'
  
  export default {
    components: { ProductList },
    data() {
      return {
        selectedCategory: 'Alle',
        categories: ['Alle', 'Øl', 'Sodavand'],
        products: [
          { id: 1, name: 'Faxe Kondi', category: 'Sodavand', price: 12 },
          { id: 2, name: 'Royal Pilsner', category: 'Øl', price: 14 },
          { id: 3, name: 'Pepsi Max', category: 'Sodavand', price: 11 },
          { id: 4, name: 'Albani Mosaic IPA', category: 'Øl', price: 18 }
        ]
      }
    },
    computed: {
      filteredProducts() {
        if (this.selectedCategory === 'Alle') return this.products
        return this.products.filter(p => p.category === this.selectedCategory)
      }
    },
    methods: {
      filterCategory(cat) {
        this.selectedCategory = cat
      }
    }
  }
  </script>
  
  <style scoped>
  .home-container {
    padding: 2rem;
  }
  
  .category-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem 0;
  }
  
  .category-filters button {
    border: none;
    background-color: #f4f4f4;
    padding: 0.4rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.2s ease;
  }
  
  .category-filters button.active {
    background-color: #1a4d29; /* grøn */
    color: white;
  }
  
  .category-filters button:hover {
    background-color: #e0b000; /* guld */
    color: white;
  }
  </style>
  