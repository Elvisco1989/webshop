<template>
  <div class="card">
    <h3>{{ product.name }}</h3>

    <img :src="getImageUrl(product.imagePath)" alt="Product image" class="product-img" />

    <p>{{ product.price }} kr.</p>
    <p>{{ product.description }}</p>
    <p>Lager: {{ product.stock }}</p>

    <button :class="{ added: justAdded }" @click="addToCart">
      Læg i kurv
    </button>
  </div>
</template>

<script>
export default {
  props: ['product'],
  data() {
    return {
      justAdded: false
    };
  },
  methods: {
    getBaseUrl() {
      return import.meta.env.MODE === 'development'
        ? 'https://localhost:7155'
        : import.meta.env.VITE_API_URL;
    },
    getImageUrl(path) {
      return `${this.getBaseUrl()}/${path}`;
    },
    async addToCart() {
      const customerId = localStorage.getItem('customerId');
      if (!customerId) {
        alert('Du skal være logget ind for at tilføje produkter.');
        return;
      }

      try {
        const response = await fetch(`${this.getBaseUrl()}/api/Basket/${customerId}/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: this.product.productId || this.product.id,
            quantity: 1
          })
        });

        if (!response.ok) {
          throw new Error('Kunne ikke tilføje til kurven.');
        }

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
      } catch (error) {
        console.error(error);
        alert('Noget gik galt.');
      }
    }
  }
};
</script>

<style scoped>
.card {
  width: 220px;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;
}

button {
  background-color: #e0b000;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-top: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #cc9e00;
}

button.added {
  animation: pulse 0.4s;
  background-color: #1a4d29 !important;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    background-color: #e0b000;
  }
  50% {
    transform: scale(1.1);
    background-color: #1a4d29;
  }
  100% {
    transform: scale(1);
    background-color: #e0b000;
  }
}
</style>
