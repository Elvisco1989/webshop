<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="registerUser">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <input v-model="confirmPassword" type="password" placeholder="Confirm Password" required />
      <button type="submit">Register</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      message: ''
    }
  },
  methods: {
    async registerUser() {
      if (this.password !== this.confirmPassword) {
        this.message = "Passwords don't match"
        return
      }
      try {
        const res = await fetch('https://localhost:7155/api/RegisterUser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: 0,
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword
          })
        })
        if (res.ok) {
          this.message = 'Registration successful! Please log in.'
          this.email = ''
          this.password = ''
          this.confirmPassword = ''
        } else {
          const err = await res.json()
          this.message = 'Registration failed: ' + (err.message || res.statusText)
        }
      } catch (e) {
        this.message = 'Error: ' + e.message
      }
    }
  }
}
</script>
