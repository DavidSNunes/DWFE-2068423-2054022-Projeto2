<template>
  <div class="notifications-container">
    <h1>Notifications</h1>
    <p>Here you can see your notifications.</p>
  </div>
</template>

<script>
export default {
  name: 'Notifications'
}
</script>

<style scoped>
.notifications-container {
  flex: 1;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #15202b;
  color: white;
}

h1 {
  border-bottom: 1px solid #38444d;
  padding-bottom: 10px;
}

p {
  margin-top: 20px;
}
</style>
