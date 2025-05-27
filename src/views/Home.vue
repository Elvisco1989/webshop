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

    <button class="create-button" @click="createProduct">Opret test-produkt</button>

    <ProductList :products="filteredProducts" />
  </div>
</template>

<script>
import ProductList from '../components/ProductList.vue'
import axios from 'axios'

export default {
  components: { ProductList },
  data() {
    return {
      selectedCategory: 'Alle',
      categories: ['Alle', 'Øl', 'Sodavand'],
      products: []
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
    },
    async fetchProducts() {
      try {
        const response = await axios.get('https://localhost:7155/api/Products')
        this.products = response.data
      } catch (error) {
        console.error('Kunne ikke hente produkter:', error)
      }
    },
    async createProduct() {
      try {
        const newProduct = {
          name: 'Test Produkt',
          category: 'Sodavand',
          price: 25
        }

        await axios.post('https://localhost:7155/api/Products', newProduct)

        this.fetchProducts() // genindlæs listen
      } catch (error) {
        console.error('Kunne ikke oprette produkt:', error)
      }
    }
  },
  mounted() {
    this.fetchProducts()
  }
}
</script>

<style scoped>
.home-container {
  padding: 2rem;
}

.category-filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.category-filters button {
  border: none;
  background-color: #f4f4f4;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
}

.category-filters button.active {
  background-color: #1a4d29;
  color: white;
}

.category-filters button:hover {
  background-color: #e0b000;
  color: white;
}

.create-button {
  margin-bottom: 1rem;
  background-color: #1a4d29;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.create-button:hover {
  background-color: #145522;
}
</style>
