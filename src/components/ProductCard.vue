<template>
  <div class="product-card">
    <h3>{{ product.name }}</h3>
    <img :src="getImageUrl(product.imagePath)" alt="Product image" class="product-img" />
    <p>{{ product.price }} kr.</p>
    <p>{{ product.description }}</p>
    <p>Lager: {{ product.stock }}</p>

    <button @click="addToCart">Læg i kurv</button>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  methods: {
    getImageUrl(path) {
      return `https://localhost:7155/${path}`;
    },
    async addToCart() {
  const customerId = localStorage.getItem('customerId');
  if (!customerId) {
    alert('Du skal være logget ind for at tilføje produkter.');
    return;
  }

  try {
    const response = await fetch(`https://localhost:7155/api/Basket/${customerId}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: this.product.productId || this.product.id, // try both keys
        quantity: 1
      }),
    });

    if (!response.ok) {
      throw new Error('Kunne ikke tilføje til kurven.');
    }

    // Update local cart UI
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => (item.productId || item.id) === (this.product.productId || this.product.id));
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ ...this.product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));

    this.justAdded = true;
    setTimeout(() => (this.justAdded = false), 400);

    // alert('Tilføjet til kurven!');
  } catch (error) {
    console.error(error);
    alert('Noget gik galt.');
  }
}

  }
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ccc;
  padding: 1rem;
  max-width: 250px;
  border-radius: 8px;
  margin: 1rem;
}
.product-img {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
}
</style>
