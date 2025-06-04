<template>
  <div>
    <h1>Delete Customer</h1>
    <p>Are you sure you want to delete customer: {{ customerId }}?</p>
    <button @click="deleteCustomer">Delete</button>
  </div>
</template>

<script>
export default {
  props: ['customerId'],
  methods: {
    async deleteCustomer() {
      try {
        const response = await fetch(`https://localhost:7155/api/Customers/${this.customerId}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Delete failed');
        alert('Customer deleted!');
        this.$router.push('/customers'); // Navigate back after deletion
      } catch (error) {
        alert(error.message);
      }
    }
  }
}
</script>

<style scoped>
/* Your CSS */
</style>
