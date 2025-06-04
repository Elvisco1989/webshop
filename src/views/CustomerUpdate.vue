<template>
  <div>
    <h1>Update Customer</h1>
    <form @submit.prevent="updateCustomer">
      <label for="name">Name:</label>
      <input id="name" v-model="customer.name" type="text" required />

      <label for="email">Email:</label>
      <input id="email" v-model="customer.email" type="email" required />

      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customer: {
        name: '',
        email: ''
      }
    }
  },
  methods: {
    async updateCustomer() {
      try {
        // Replace with your API URL and logic
        const response = await fetch(`https://localhost:7155/api/Customers/${this.customer.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.customer)
        });
        if (!response.ok) throw new Error('Update failed');
        alert('Customer updated!');
        this.$router.push('/customers');
      } catch (error) {
        alert(error.message);
      }
    }
  },
  mounted() {
    // Fetch customer data logic here if needed
  }
}
</script>

<style scoped>
/* Your styles here */
</style>
