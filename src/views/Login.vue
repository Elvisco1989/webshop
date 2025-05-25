<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      handleLogin() {
        alert(`Login med: ${this.email} og ${this.password}`)
        // Her skal Firebase login tilføjes senere
      }
    }
  }
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  </style>  