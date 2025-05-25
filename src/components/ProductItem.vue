<template>
    <div class="card">
      <h3>{{ product.name }}</h3>
      <p>Kategori: {{ product.category }}</p>
      <p>{{ product.price }} kr.</p>
      <button
        :class="{ added: justAdded }"
        @click="addToCart"
      >
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
      }
    },
    methods: {
      addToCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || []
        const existing = cart.find(item => item.id === this.product.id)
        if (existing) {
          existing.quantity++
        } else {
          cart.push({ ...this.product, quantity: 1 })
        }
        localStorage.setItem('cart', JSON.stringify(cart))
        window.dispatchEvent(new Event('storage'))
  
        // Trigger animation
        this.justAdded = true
        setTimeout(() => {
          this.justAdded = false
        }, 400)
      }
    }
  }
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #ccc;
    background-color: white;
    border-radius: 8px;
    padding: 1rem;
    width: 200px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  button {
    background-color: #e0b000; /* guld */
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