<template>
  <div>
    <h2>Top Customers</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" style="color: red;">Error: {{ error }}</div>
    <div v-else>
      <div v-for="customer in customers" :key="customer.name" class="customer-bar">
        <div class="info">
          <strong>{{ customer.name }}</strong> — {{ customer.address }} — {{ customer.totalRevenue }} DKK
        </div>
        <div class="bar-container">
          <div
            class="bar"
            :style="{ width: (customer.totalRevenue / maxRevenue * 100) + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopCustomers',
  data() {
    return {
      customers: [],
      maxRevenue: 0,
      loading: true,
      error: null
    };
  },
  created() {
    // ✅ LOCAL-only endpoint
    const apiUrl = 'https://localhost:7155/api/Orders/customers/top';

    fetch(apiUrl, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch top customers');
        return response.json();
      })
      .then(data => {
        this.customers = data;
        this.maxRevenue = Math.max(...data.map(c => c.totalRevenue)) || 1;
      })
      .catch(err => {
        this.error = err.message;
      })
      .finally(() => {
        this.loading = false;
      });
  }
};
</script>

<style scoped>
.customer-bar {
  margin-bottom: 20px;
}

.info {
  margin-bottom: 4px;
}

.bar-container {
  background-color: #e0e0e0;
  border-radius: 5px;
  height: 20px;
  overflow: hidden;
}

.bar {
  height: 100%;
  background-color: #42b983;
  transition: width 0.3s ease-in-out;
}
</style>
