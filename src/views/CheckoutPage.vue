<template>
  <div class="checkout-page">
    <h1>Ordrebekræftelse</h1>
    <p>Tak for din bestilling!</p>

    <div v-if="order">
      <h2>Ordre ID: {{ order.orderId }}</h2>
      <p>Navn: {{ order.customerName }}</p>
      <p>Adresse: {{ order.customerAddress }}</p>
      <p>Email: {{ order.customerEmail }}</p>
      <p>Segment: {{ order.customerSegment }}</p>
      <p>Næste levering: {{ order.nextDeliveryDate }}</p>

      <h3>Produkter:</h3>
      <ul>
        <li v-for="item in order.products" :key="item.productName">
          {{ item.quantity }} x {{ item.productName }} – {{ item.total.toFixed(2) }} kr
        </li>
      </ul>

      <h3>Total: {{ order.orderTotal.toFixed(2) }} kr</h3>

      <!-- Pay Now button -->
      <button @click="goToPayment">Betal nu</button>
    </div>
    <div v-else>
      <p>Indlæser ordreinformation...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutPage',
  data() {
    return {
      order: null
    }
  },
  mounted() {
    const orderData = localStorage.getItem('latestOrder')
    if (orderData) {
      this.order = JSON.parse(orderData)
    }
  },
  methods: {
    goToPayment() {
      if (this.order && this.order.orderId) {
        this.$router.push({ name: 'Payment', params: { orderId: this.order.orderId } });
      } else {
        alert('Ordre ID ikke fundet.');
      }
    }
  }
}
</script>

<style scoped>
.checkout-page {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
button {
  margin-top: 1rem;
  padding: 10px 20px;
  border-radius: 6px;
  background-color: #6772e5;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #5469d4;
}
</style>
