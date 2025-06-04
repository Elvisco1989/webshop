<template>
  <div>
    <h2>Customers List</h2>
    <button @click="fetchCustomers">Refresh</button>
    <div v-if="loading">Loading customers...</div>
    <div v-if="error" style="color:red">{{ error }}</div>
    <ul v-if="customers.length > 0">
      <li v-for="customer in customers" :key="customer.id">
        <strong>{{ customer.name }}</strong> — {{ customer.email }} — {{ customer.phoneNumber }}
        <br />
        Address: {{ customer.address }}
        <br />
        Segment: {{ customer.segment }}
        <br />
        Delivery Dates:
        <ul>
          <li v-for="date in customer.deliveryDates" :key="date">{{ date }}</li>
        </ul>
      </li>
    </ul>
    <div v-else-if="!loading">No customers found.</div>
  </div>
</template>

<script>
export default {
  name: "CustomersList",
  data() {
    return {
      customers: [],
      loading: false,
      error: null,
    };
  },
  mounted() {
    this.fetchCustomers();
  },
  methods: {
    async fetchCustomers() {
      this.loading = true;
      this.error = null;
      try {
        const res = await fetch("https://localhost:7155/api/Customers", {
          headers: {
            accept: "text/plain",
          },
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to fetch customers");
        }
        // Assuming backend returns JSON, but you said accept text/plain.
        // If response is JSON, parse it:
        const data = await res.json();
        this.customers = data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  padding-left: 0;
}

li {
  margin-bottom: 1em;
  border-bottom: 1px solid #ccc;
  padding-bottom: 1em;
}
</style>
