<template>
  <div>
    <h1>Products</h1>

    <!-- Create new product -->
    <form @submit.prevent="createProduct">
      <input v-model="newProduct.name" placeholder="Product name" required />
      <input v-model.number="newProduct.price" type="number" placeholder="Price" required />
      <input v-model.number="newProduct.stock" type="number" placeholder="Stock" required />
      <button type="submit">Add Product</button>
    </form>

    <!-- List and edit products -->
    <ul>
      <li v-for="product in products" :key="product.id">
        <input v-model="product.name" />
        <input v-model.number="product.price" type="number" />
        <input v-model.number="product.stock" type="number" />
        <button @click="updateProduct(product)">Save</button>
        <button @click="deleteProduct(product.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      newProduct: {
        name: '',
        price: 0,
        stock: 0
      }
    }
  },
  methods: {
    async fetchProducts() {
      try {
        const res = await fetch('https://localhost:7155/api/products')
        this.products = await res.json()
      } catch (error) {
        alert('Failed to load products')
      }
    },
    async createProduct() {
      try {
        const res = await fetch('https://localhost:7155/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.newProduct)
        })
        if (!res.ok) throw new Error('Failed to create product')

        const createdProduct = await res.json()
        this.products.push(createdProduct)
        this.newProduct = { name: '', price: 0, stock: 0 }
      } catch (error) {
        alert(error.message)
      }
    },
    async updateProduct(product) {
      try {
        const res = await fetch(`https://localhost:7155/api/products/${product.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product)
        })
        if (!res.ok) throw new Error('Failed to update product')
        alert('Product updated')
      } catch (error) {
        alert(error.message)
      }
    },
    async deleteProduct(id) {
      if (!confirm('Are you sure you want to delete this product?')) return
      try {
        const res = await fetch(`https://localhost:7155/api/products/${id}`, {
          method: 'DELETE'
        })
        if (!res.ok) throw new Error('Failed to delete product')
        this.products = this.products.filter(p => p.id !== id)
      } catch (error) {
        alert(error.message)
      }
    }
  },
  mounted() {
    this.fetchProducts()
  }
}
</script>
