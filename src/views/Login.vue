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
import { useRouter } from 'vue-router'

export default {
  data() {
    return {
      email: '',
      password: '',
      message: '',
      isError: false
    }
  },
  setup() {
    const router = useRouter()
    return { router }
  },
  methods: {
    async loginUser() {
      this.message = ''
      this.isError = false
      try {
        const res = await fetch('https://localhost:7155/api/LoginUser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            rememberMe: true
          })
        })

        if (res.ok) {
          const data = await res.json()
          if (data.customerId) {
            localStorage.setItem('customerId', data.customerId)   // Save customerId here
          }
          if (data.token) {
            localStorage.setItem('token', data.token)             // Save token here
          }
          localStorage.setItem('isLoggedIn', 'true')              // Optional flag
          this.router.push('/')                                    // Redirect to home or products page
        } else {
          const err = await res.json()
          this.message = 'Login failed: ' + (err.message || res.statusText)
          this.isError = true
        }
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
