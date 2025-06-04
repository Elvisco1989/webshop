<template>
  <nav class="navbar">
    <div class="nav-left">
      <div class="logo" @click="$router.push('/')">
        <!-- SVG logo inline -->
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 427.99 275.59"
          style="width: 120px; height: auto;"
          aria-label="Royal Unibrew Logo"
          role="img"
        >
          <title>Royal Unibrew</title>
          <!-- Paste all your <path> elements here -->
          <path
            d="M255.74,265.67c-38.49-.6-64.43-23.34-64.88-61.82l.29-88.41,39.34,17.29-.26,66.58C230.22,253.72,244.41,258.1,255.74,265.67Z"
            transform="translate(-50.47 -115.44)"
            style="fill:#b49d5b"
          ></path>
          <path
            d="M290.14,199.31l-.28-66.58,39.35-17.29.28,88.41c-.43,38.48-26.39,61.22-64.87,61.82C276,258.1,290.14,253.72,290.14,199.31Z"
            transform="translate(-50.47 -115.44)"
            style="fill:#b49d5b"
          ></path>
          <!-- include all other <path> elements here exactly as you have them -->
          <path
            d="M317.5,318.95l-.69-.09c-3.48-.51-3.79-.63-5.76-4.27L299.9,291.93l-.1-.25h-1.92l-.13.08-.1.22-5,9.33c-2.54,4.81-4.07,7.72-7.09,13-1.74,3.06-2.44,4.06-5.55,4.63l-1.28.18v.17l-.06,1.65H279l5.84,0,5.45,0H291l0-.15-.17-1.65-.1,0-.41-.06c-1.72-.25-2.49-.55-2.75-1.05a1,1,0,0,1-.1-.47,7.36,7.36,0,0,1,1.08-2.81l2.8-5.29,12.1,0,2.91,5.74a7.11,7.11,0,0,1,.75,2.43,1,1,0,0,1-.11.5c-.3.54-1.26.71-2.8.94l-.34,0v.11l-.09,1.73h.19l1.06,0,4.48,0,7.46,0h.77l0-.14L317.6,319Zm-25-11.38,5-9.61,4.9,9.61Zm54.72,4.34-.32,0-2.21.19h-.34v.1l0,.36-.09,2.29V315c-.21,3-.25,3.56-5.7,3.56h-7.42c0-.25,0-21.41,0-21.41,0-2.36.85-2.53,3.38-3l1.15-.24.09-.12v-1.47h-.44l-7.07,0-6.34,0h-.72v1.58l.24,0c4.27.82,4.57,1,4.57,3.21v18.25c0,2.84-.14,2.86-3.67,3.36l-.23,0-.27,0V319l-.06,1.57,0,.3h.82l5.16,0,19.52.06Zm-152.17-5.29h.1c5.49-.23,9.63-3.51,9.63-7.63,0-5.72-5.36-6.58-11.16-6.66l-4,0-10.68,0v1.57l.26,0c3.9.46,4.4.6,4.4,2.68v19.26c0,2.53-.83,2.67-3.89,3.21l-.7.13-.25,0v1.55h1.16l5.8,0,6,0h1.09V319.3l-.09-.11-.08,0-1-.17c-2.2-.36-3.41-.56-3.41-2.87V307c4.07,2.91,14.95,13.87,15.05,14l0,0h1.79l5.74,0-.24-.25Zm-6.82-1.34c0-.24,0-11,0-11.25H193c5.41,0,6.59,2,6.7,5.11a5.48,5.48,0,0,1-1.73,4.45C196.52,305,191.86,305.38,188.26,305.27ZM281.33,294l.26,0v-.1l.15-1.48h-.32l-7.46,0-3.22,0,0,.13V294l.19.06.92.1,2.08.27c.42.09.63.2.69.35a.32.32,0,0,1,0,.12,6.34,6.34,0,0,1-1.26,2.22c-1.39,2-5.84,8.89-6.39,9.73l-6.66-10.21-.22-.37c-.36-.59-.57-.94-.36-1.4s.26-.56,1.73-.77l.65-.08v-1.58h-.9l-3.86,0-7.64,0h-.34V294l.3,0c2.75.32,3.88.85,6,3.76,1.86,2.75,7.52,11.14,7.65,11.7.08.33.07,3.64.07,5.05v.54c0,3.13-.7,3.25-3.64,3.74l-1,.17-.27.05v1.73l7.4-.07,6.21,0,1.06,0h.25v-1.74l-.23,0-1-.16c-3.11-.51-3.76-.62-3.83-4a43.14,43.14,0,0,1,.15-6.28l2.38-3.64,5.37-8.08c1.64-2.42,2.24-2.49,4.73-2.78ZM234,291.76l-4.15-.18-3.59.13c-4.32.32-7.33,1.54-9.46,3.82-2.51,2.68-3.35,5.44-3.35,10.94,0,6.47,1.95,9.38,3.64,11.19a12.09,12.09,0,0,0,7.38,3.71,40.74,40.74,0,0,0,5.39.33,38.57,38.57,0,0,0,5.38-.35,12.81,12.81,0,0,0,7.59-3.63c2.17-2.33,3.47-6.55,3.47-11.28,0-4.41-.56-7.95-3.31-10.89C240.91,293.34,238.06,292.13,234,291.76Zm-4,27.84c-7.66-.18-10.93-4.1-10.93-13.11,0-6.32.84-12.52,10.93-12.75,9,.21,10.85,5.25,10.85,12.75C240.85,312.48,239.61,319.38,230,319.6Z"
            transform="translate(-50.47 -115.44)"
            style="fill:#b49d5b"
          ></path>
        </svg>
      </div>
<router-link to="/" class="nav-link">Produkter</router-link>
<router-link to="/about" class="nav-link">About Us</router-link>
<router-link to="/contact" class="nav-link">Contact</router-link>
<router-link to="/markets" class="nav-link">Markets</router-link>
<router-link to="/brand" class="nav-link">Brand</router-link>
<router-link to="/faq" class="nav-link">FAQ</router-link>
<router-link to="/career" class="nav-link">Career</router-link>
<router-link v-if="!isLoggedIn" to="/register" class="nav-link">Register</router-link>
<div class="nav-dropdown">
  <button class="nav-link" type="button">Products ▼</button>
  <div class="dropdown-content">
    <router-link to="/products" class="dropdown-item">View Products</router-link>
    <router-link to="/products/create" class="dropdown-item">Add Product</router-link>
    <router-link to="/products/update" class="dropdown-item">Update Product</router-link>
    <router-link to="/products/delete" class="dropdown-item">Delete Product</router-link>
  </div>
  <div class="nav-dropdown">
  <button class="nav-link" type="button">Customers ▼</button>
  <div class="dropdown-content">
    <router-link to="/customers" class="dropdown-item">View Customers</router-link>
    <router-link to="/customers/create" class="dropdown-item">Add Customer</router-link>
     <router-link to="/customers/update" class="dropdown-item">Update Customer</router-link>
      <router-link to="/customers/delete" class="dropdown-item">Delete Customer</router-link>
  </div>
</div>

</div>

<router-link v-if="!isLoggedIn" to="/login" class="nav-link">Login</router-link>
<a v-else href="#" class="nav-link" @click.prevent="logout">Logout</a>

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
  computed: {
    isLoggedIn() {
      return localStorage.getItem('isLoggedIn') === 'true'
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
    },
    logout() {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('customerId')
      this.$router.push('/login')
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
  padding: 1.5rem 3rem;
  color: white;
  font-size: 1.125rem; /* larger base font size */
}
.nav-left {
  display: flex;
  align-items: center;
}
.logo {
  cursor: pointer;
  margin-right: 2rem;
  display: flex;
  align-items: center;
}
.logo svg {
  width: 150px;
  height: auto;
}
.nav-link {
  color: white;
  margin-right: 1.5rem;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.125rem;
}
.nav-link:hover {
  text-decoration: underline;
}
.cart-link {
  color: white;
  text-decoration: none;
  font-size: 1.125rem;
}
.nav-dropdown {
  position: relative;
  display: inline-block;
}
.nav-dropdown button.nav-link {
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  font-weight: 600;
  color: white;
}
.nav-dropdown button.nav-link:hover,
.nav-dropdown button.nav-link:focus {
  color: #d6bc64;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #1a4d29;
  min-width: 180px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  z-index: 1000;
  border-radius: 0 0 6px 6px;
}
.nav-dropdown:hover .dropdown-content,
.nav-dropdown:focus-within .dropdown-content {
  display: block;
}
.dropdown-item {
  color: white;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  display: block;
  font-weight: 600;
}
.dropdown-item:hover,
.dropdown-item:focus {
  background-color: #d6bc64;
  color: #1a4d29;
  outline: none;
}

</style>

