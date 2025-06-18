<template>
  <div class="unauthorized">
    <h1>Access Denied</h1>
    <p>You do not have permission to view this page.</p>
  </div>
</template>

<script>
export default {
  name: 'Unauthorized'
}
</script>

<style scoped>
.unauthorized {
  text-align: center;
  padding: 2rem;
  color: #c00;
}
</style>
