<template>
  <div>
    <h2>Top Sales Products</h2>

    <div v-if="loading">Loading top sales...</div>
    <div v-if="error" style="color: red;">Error: {{ error }}</div>

    <div v-if="!loading && !error && products.length">
      <div
        v-for="product in products"
        :key="product.name"
        class="product-bar"
      >
        <span class="product-name">{{ product.name }}</span>
        <div class="progress-container">
          <div
            class="progress-bar"
            :style="{ width: getBarWidth(product.quantitySold) + '%' }"
          ></div>
        </div>
        <span class="quantity">{{ product.quantitySold }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopSales',
  data() {
    return {
      products: [],
      loading: true,
      error: null
    };
  },
  async created() {
    const apiBase = import.meta.env.VITE_API_URL || 'https://localhost:7155';
    const apiUrl = `${apiBase}/api/orders/products/top-sales`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Failed to fetch top sales');
      const data = await response.json();
      this.products = data;
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  },
  methods: {
    getBarWidth(quantitySold) {
      if (!this.products.length) return 0;
      const maxQuantity = Math.max(...this.products.map(p => p.quantitySold));
      return (quantitySold / maxQuantity) * 100;
    }
  }
};
</script>

<style scoped>
.product-bar {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.product-name {
  width: 150px;
  font-weight: 600;
}

.progress-container {
  flex-grow: 1;
  background-color: #eee;
  border-radius: 8px;
  overflow: hidden;
  margin: 0 12px;
  height: 24px;
}

.progress-bar {
  height: 100%;
  background-color: #42b983;
  transition: width 0.5s ease;
}

.quantity {
  width: 40px;
  text-align: right;
  font-weight: 500;
}
</style>
