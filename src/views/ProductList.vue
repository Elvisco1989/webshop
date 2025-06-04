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
    fetch('https://localhost:7155/api/Products')
      .then(res => res.json())
      .then(data => {
        this.products = data;
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
