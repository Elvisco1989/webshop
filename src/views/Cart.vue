<template>
  <div class="cart-container" v-if="loaded">
    <h1>Din Kurv</h1>

    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>🛒 Din kurv er tom.</p>
    </div>

    <div v-else>
      <ul class="cart-list">
        <li v-for="(item, index) in cartItems" :key="item.id" class="cart-item">
          <div class="item-info">
            <h3>{{ item.name }}</h3>
            <p>{{ item.imagePath }}</p>
            <p>{{ item.price }} kr. pr. stk.</p>
            
            <div class="quantity">
              <button @click="decreaseQuantity(index)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(index)">+</button>
            </div>
          </div>
          <div class="item-actions">
            <p><strong>{{ item.price * item.quantity }} kr.</strong></p>
            <button class="remove" @click="removeFromCart(item)">Fjern</button>
          </div>
        </li>
      </ul>

      <div class="summary">
        <p><strong>Samlet pris: {{ totalPrice }} kr.</strong></p>
        <button @click="checkout">Gennemfør betaling</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: [],
      loaded: false
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
    async fetchBackendCart() {
      const customerId = localStorage.getItem('customerId')
      if (!customerId) {
        this.loadCart()
        this.loaded = true
        return
      }

      try {
        const response = await fetch(`https://localhost:7155/api/Basket/${customerId}`)

        if (!response.ok) throw new Error('Kunne ikke hente kurven fra serveren.')

        const backendCart = await response.json()

        this.cartItems = backendCart.map(item => ({
          id: item.productId,
          name: item.product.name,
          price: item.unitPrice,
          quantity: item.quantity,
          stock: item.product.stock ?? 99
        }))

        this.saveCart()
      } catch (error) {
        console.error(error)
        alert('Kunne ikke hente din kurv fra serveren.')
        this.loadCart()
      } finally {
        this.loaded = true
      }
    },
    async updateBackendBasket(item) {
      const customerId = localStorage.getItem('customerId')
      if (!customerId) {
        alert('Du skal være logget ind for at ændre kurven.')
        this.$router.push('/login')
        return
      }

      try {
        const response = await fetch(`https://localhost:7155/api/Basket/${customerId}/update`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: item.id,
            quantity: item.quantity
          })
        })

        if (!response.ok) {
          throw new Error('Kunne ikke opdatere kurven.')
        }
      } catch (error) {
        console.error(error)
        alert('Noget gik galt ved opdatering af kurven.')
      }
    },
    async increaseQuantity(index) {
      const item = { ...this.cartItems[index] }
      if (item.quantity < item.stock) {
        item.quantity++
        this.cartItems.splice(index, 1, item)
        this.saveCart()
        await this.updateBackendBasket(item)
      } else {
        alert('Du har nået maksimum lagerbeholdning.')
      }
    },
    async decreaseQuantity(index) {
      const item = { ...this.cartItems[index] }
      if (item.quantity > 1) {
        item.quantity--
        this.cartItems.splice(index, 1, item)
        this.saveCart()
        await this.updateBackendBasket(item)
      } else {
        await this.removeFromCart(item)
      }
    },
    async removeFromCart(item) {
      this.cartItems = this.cartItems.filter(p => p.id !== item.id)
      this.saveCart()

      const customerId = localStorage.getItem('customerId')
      if (!customerId) {
        alert('Du skal være logget ind for at ændre kurven.')
        this.$router.push('/login')
        return
      }

      try {
        const response = await fetch(`https://localhost:7155/api/Basket/${customerId}/remove`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: item.id })
        })

        if (!response.ok) {
          throw new Error('Kunne ikke fjerne varen fra kurven.')
        }
      } catch (error) {
        console.error(error)
        alert('Noget gik galt ved fjernelse af varen.')
      }
    },
    async checkout() {
      const customerId = localStorage.getItem('customerId')
      if (!customerId) {
        alert('Du skal være logget ind for at gennemføre ordren.')
        this.$router.push('/login')
        return
      }

      try {
        const response = await fetch(`https://localhost:7155/api/Orders/${customerId}/checkout`, {
          method: 'POST'
        })

        if (!response.ok) {
          throw new Error('Checkout fejlede')
        }

        const orderData = await response.json()
        localStorage.setItem('latestOrder', JSON.stringify(orderData))

        localStorage.removeItem('cart')
        this.cartItems = []

        this.$router.push('/checkout')
      } catch (error) {
        console.error(error)
        alert('Noget gik galt under checkout.')
      }
    }
  },
  mounted() {
    this.fetchBackendCart()
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
