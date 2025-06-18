<template>
  <div class="product-list">
    <ProductCard v-for="p in products" :key="p.id" :product="p" />
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue';

export default {
  name: 'ProductList',
  components: { ProductCard },
  data() {
    return {
      products: []
    };
  },
  mounted() {
    // === Toggle backend URL here ===
    // For LOCAL testing, uncomment the line below:
    const url = 'https://localhost:7155/api/Products';

    // For AZURE deployment/testing, uncomment the line below:
    // const url = 'https://hoved-opgave-datamatiker.azurewebsites.net/api/Products';

    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.products = data;
      })
      .catch(err => {
        console.error('Failed to fetch products:', err);
      });
  }
};
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
</style>
