<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p v-if="message" :class="{ error: isError }">{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      message: '',
      isError: false
    }
  },
  methods: {
    async loginUser() {
      this.message = ''
      this.isError = false

      try {
        const response = await fetch('https://localhost:7155/api/LoginUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            rememberMe: true
          })
        })

        if (!response.ok) {
          const error = await response.json()
          this.message = 'Login failed: ' + (error.message || response.statusText)
          this.isError = true
          return
        }

        const data = await response.json()
        console.log('Login success:', data)

        localStorage.setItem('customerId', data.customerId || '')
        localStorage.setItem('token', data.token || '')
        localStorage.setItem('role', JSON.stringify(data.roles || []))
        localStorage.setItem('isLoggedIn', 'true')

        this.$router.push('/')
      } catch (e) {
        this.message = 'Error: ' + e.message
        this.isError = true
      }
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
  margin-top: 1rem;
}
</style>
