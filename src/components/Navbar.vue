<template>
    <nav class="navbar">
      <div class="nav-left">
        <router-link to="/" class="nav-link">Produkter</router-link>
        <router-link to="/login" class="nav-link">Login</router-link>
      </div>
      <router-link to="/cart" class="cart-link">
        <CartIcon :count="cartCount" />
      </router-link>
    </nav>
  </template>
  
  <script>
  import CartIcon from './CartIcon.vue'
  
  export default {
    components: { CartIcon },
    data() {
      return {
        cartCount: 0
      }
    },
    mounted() {
      this.updateCartCount()
      window.addEventListener('storage', this.updateCartCount)
    },
    beforeUnmount() {
      window.removeEventListener('storage', this.updateCartCount)
    },
    methods: {
      updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || []
        this.cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
      }
    }
  }
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1a4d29; /* Royal Unibrew grøn */
    padding: 1rem 2rem;
    color: white;
  }
  .nav-link {
    color: white;
    margin-right: 1rem;
    text-decoration: none;
    font-weight: bold;
  }
  .nav-link:hover {
    text-decoration: underline;
  }
  .cart-link {
    color: white;
    text-decoration: none;
  }
  </style>  