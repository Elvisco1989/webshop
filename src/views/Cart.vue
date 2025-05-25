<template>
    <div class="cart-container">
      <h1>Din Kurv</h1>
  
      <div v-if="cartItems.length === 0" class="empty-cart">
        <p>🛒 Din kurv er tom.</p>
      </div>
  
      <div v-else>
        <ul class="cart-list">
          <li v-for="item in cartItems" :key="item.id" class="cart-item">
            <div class="item-info">
              <h3>{{ item.name }}</h3>
              <p>{{ item.price }} kr. pr. stk.</p>
              <div class="quantity">
                <button @click="decreaseQuantity(item.id)">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="increaseQuantity(item.id)">+</button>
              </div>
            </div>
            <div class="item-actions">
              <p><strong>{{ item.price * item.quantity }} kr.</strong></p>
              <button class="remove" @click="removeFromCart(item.id)">Fjern</button>
            </div>
          </li>
        </ul>
  
        <div class="summary">
          <p><strong>Samlet pris: {{ totalPrice }} kr.</strong></p>
          <button class="checkout">Gå til betaling</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cartItems: []
      }
    },
    computed: {
      totalPrice() {
        return this.cartItems.reduce(
          (sum, item) => sum + item.quantity * item.price,
          0
        )
      }
    },
    methods: {
      loadCart() {
        this.cartItems = JSON.parse(localStorage.getItem('cart')) || []
      },
      saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cartItems))
        window.dispatchEvent(new Event('storage'))
      },
      increaseQuantity(id) {
        const item = this.cartItems.find(p => p.id === id)
        if (item) {
          item.quantity++
          this.saveCart()
        }
      },
      decreaseQuantity(id) {
        const item = this.cartItems.find(p => p.id === id)
        if (item && item.quantity > 1) {
          item.quantity--
        } else {
          this.cartItems = this.cartItems.filter(p => p.id !== id)
        }
        this.saveCart()
      },
      removeFromCart(id) {
        this.cartItems = this.cartItems.filter(p => p.id !== id)
        this.saveCart()
      }
    },
    mounted() {
      this.loadCart()
      window.addEventListener('storage', this.loadCart)
    },
    beforeUnmount() {
      window.removeEventListener('storage', this.loadCart)
    }
  }
  </script>
  
  <style scoped>
  .cart-container {
    padding: 2rem;
    background-color: #f4f4f4;
    min-height: 100vh;
  }
  
  h1 {
    margin-bottom: 1.5rem;
    color: #1a4d29;
  }
  
  .empty-cart {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
    font-size: 1.2rem;
  }
  
  .cart-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    flex-wrap: wrap;
  }
  
  .item-info {
    flex: 1;
    min-width: 220px;
  }
  
  .item-actions {
    text-align: right;
    min-width: 120px;
  }
  
  .quantity {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  
  .quantity button {
    width: 30px;
    height: 30px;
    background-color: #e0b000;
    border: none;
    color: white;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .quantity button:hover {
    background-color: #cc9e00;
  }
  
  .remove {
    margin-top: 0.5rem;
    background-color: #b32d00;
    color: white;
    border: none;
    padding: 0.4rem 0.7rem;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .remove:hover {
    background-color: #991f00;
  }
  
  .summary {
    margin-top: 2rem;
    text-align: right;
    background-color: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  }
  
  .checkout {
    margin-top: 1rem;
    background-color: #1a4d29;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
  }
  
  .checkout:hover {
    background-color: #145522;
  }
  </style>  