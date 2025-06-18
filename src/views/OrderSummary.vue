<!-- src/views/OrderSummary.vue -->
<template>
  <div class="summary-container">
    <h2>📊 Order Summary</h2>

    <div v-if="loading">Loading summary...</div>
    <div v-if="error" class="error">Error: {{ error }}</div>

    <div v-if="summary && !loading && !error" class="summary-cards">
      <div class="card">
        <h3>Total Orders</h3>
        <p>{{ summary.totalOrders }}</p>
      </div>

      <div class="card">
        <h3>Revenue This Week</h3>
        <p>${{ summary.revenueThisWeek.toFixed(2) }}</p>
      </div>

      <div class="card">
        <h3>Revenue This Month</h3>
        <p>${{ summary.revenueThisMonth.toFixed(2) }}</p>
      </div>

      <div class="card">
        <h3>Revenue This Year</h3>
        <p>${{ summary.revenueThisYear.toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderSummary',
  data() {
    return {
      summary: null,
      loading: true,
      error: null
    }
  },
  created() {
    // === Toggle backend URL here ===
    // For LOCAL testing, uncomment the line below:
     const url = 'https://localhost:7155/api/Orders/summary'

    // For AZURE deployment/testing, uncomment the line below:
    // const url = 'https://hoved-opgave-datamatiker.azurewebsites.net/api/Orders/summary'

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch summary');
        return res.json();
      })
      .then(data => {
        this.summary = data;
        this.loading = false;
      })
      .catch(err => {
        this.error = err.message;
        this.loading = false;
      });
  }
}
</script>

<style scoped>
.summary-container {
  padding: 2rem;
  max-width: 900px;
  margin: auto;
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.card {
  background: #f9f9f9;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  text-align: center;
}

.card h3 {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.error {
  color: red;
}
</style>
