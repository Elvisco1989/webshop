<template>
  <div>
    <h1>Customers</h1>

    <!-- Create new customer -->
    <form @submit.prevent="createCustomer">
      <input v-model="newCustomer.name" placeholder="Customer name" required />
      <input v-model="newCustomer.email" type="email" placeholder="Email" required />
      <input v-model="newCustomer.address" placeholder="Address" required />
      <input v-model="newCustomer.segment" placeholder="Segment" required />
      <button type="submit">Add Customer</button>
    </form>

    <!-- List and edit customers -->
    <ul>
      <li v-for="customer in customers" :key="customer.id">
        <input v-model="customer.name" />
        <input v-model="customer.email" type="email" />
        <input v-model="customer.address" />
        <input v-model="customer.segment" />
        <button @click="updateCustomer(customer)">Save</button>
        <button @click="deleteCustomer(customer.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customers: [],
      newCustomer: {
        name: '',
        email: '',
        address: '',
        segment: ''
      }
    }
  },
  methods: {
    async fetchCustomers() {
      try {
        const res = await fetch('https://localhost:7155/api/customers')
        this.customers = await res.json()
      } catch (error) {
        alert('Failed to load customers')
      }
    },
    async createCustomer() {
      try {
        if (!this.newCustomer.segment.trim()) {
          alert('Segment is required')
          return
        }
        const res = await fetch('https://localhost:7155/api/customers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.newCustomer)
        })
        if (!res.ok) throw new Error('Failed to create customer')

        const createdCustomer = await res.json()
        this.customers.push(createdCustomer)
        this.newCustomer = { name: '', email: '', address: '', segment: '' }
      } catch (error) {
        alert(error.message)
      }
    },
    async updateCustomer(customer) {
      try {
        if (!customer.segment.trim()) {
          alert('Segment is required')
          return
        }
        const res = await fetch(`https://localhost:7155/api/customers/${customer.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(customer)
        })
        if (!res.ok) throw new Error('Failed to update customer')
        alert('Customer updated')
      } catch (error) {
        alert(error.message)
      }
    },
    async deleteCustomer(id) {
      if (!confirm('Are you sure you want to delete this customer?')) return
      try {
        const res = await fetch(`https://localhost:7155/api/customers/${id}`, {
          method: 'DELETE'
        })
        if (!res.ok) throw new Error('Failed to delete customer')
        this.customers = this.customers.filter(c => c.id !== id)
      } catch (error) {
        alert(error.message)
      }
    }
  },
  mounted() {
    this.fetchCustomers()
  }
}
</script>
