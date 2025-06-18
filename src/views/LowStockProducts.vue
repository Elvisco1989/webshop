<template>
  <div class="low-stock-container">
    <h2>⚠️ Low Stock Products</h2>

    <div v-if="loading">Loading low stock products...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="!loading && !error" class="product-list">
      <div v-for="product in products" :key="product.name" class="product-card">
        <div class="info">
          <h3>{{ product.name }}</h3>
          <p>Stock: {{ product.stock }}</p>
        </div>
        <div class="progress-bar">
          <div class="fill" :style="{ width: (product.stock / 60 * 100) + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const products = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(() => {
  // === Toggle backend URL here ===
  // For LOCAL testing, uncomment the line below:
   const url = 'https://localhost:7155/api/Products/low-stock'

  // For AZURE deployment/testing, uncomment the line below:
  // const url = 'https://hoved-opgave-datamatiker.azurewebsites.net/api/Products/low-stock'

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch low stock products')
      return res.json()
    })
    .then(data => {
      products.value = data
      loading.value = false
    })
    .catch(err => {
      error.value = err.message
      loading.value = false
    })
})
</script>

<style scoped>
.low-stock-container {
  max-width: 700px;
  margin: auto;
  padding: 2rem;
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-card {
  background: #fffbe6;
  border: 1px solid #ffc107;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.info {
  margin-bottom: 0.5rem;
}

.progress-bar {
  background: #e0e0e0;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
}

.fill {
  background: #ff6f00;
  height: 100%;
}
.error {
  color: red;
}
</style>
