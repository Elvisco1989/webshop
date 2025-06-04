<template>
  <div v-if="order">
    <h2>Ordrebekræftelse</h2>
    <p><strong>Ordre ID:</strong> {{ order.orderId }}</p>
    <p><strong>Kunde:</strong> {{ order.customerName }}</p>
    <p><strong>Email:</strong> {{ order.customerEmail }}</p>
    <p><strong>Adresse:</strong> {{ order.customerAddress }}</p>
    <p><strong>Segment:</strong> {{ order.customerSegment }}</p>
    <p><strong>Næste leveringsdato:</strong> {{ formatDate(order.nextDeliveryDate) }}</p>

    <h3>Produkter</h3>
    <ul>
      <li v-for="(item, index) in order.products" :key="index">
        {{ item.productName }} – {{ item.quantity }} stk. – {{ item.price.toFixed(2) }} kr. hver = {{ item.total.toFixed(2) }} kr.
      </li>
    </ul>

    <p><strong>Total:</strong> {{ (order.orderTotal / 100).toFixed(2) }} kr.</p>
    <p><em>{{ order.message }}</em></p>
  </div>

  <div v-else>
    <p>Gennemfører betaling...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: null
    }
  },
  async mounted() {
    const customerId = localStorage.getItem('customerId');
    if (!customerId) {
      alert('Du skal være logget ind for at gennemføre betalingen.');
      this.$router.push('/login');
      return;
    }

    try {
      const response = await fetch(`https://localhost:7155/api/Orders/${customerId}/checkout`, {
        method: 'POST',
        headers: { 'Accept': '*/*' }
      });

      if (!response.ok) throw new Error('Checkout fejlede');
      const data = await response.json();
      this.order = data;
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      alert('Noget gik galt under checkout.');
      console.error(err);
      this.$router.push('/');
    }
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('da-DK');
    }
  }
}
</script>
