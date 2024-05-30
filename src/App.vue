<template>
  <div id="app">
    <Sidebar />
    <div class="main-content">
      <router-view />
      <RightSidebar />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
import RightSidebar from './components/RightSidebar.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
    RightSidebar,
  },
};
</script>

<style>
/* CSS Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  overflow: hidden;
}

#app {
  display: flex;
  height: 100vh;
  width: 100%;
}

.main-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  background-color: #15202b;
  color: white;
  overflow-y: auto;
  border-left: 1px solid #38444d;
  border-right: 1px solid #38444d;
  margin-left: 280px; /* Ensure it starts after the left sidebar */
  margin-right: 280px; /* Ensure it ends before the right sidebar */
}

@media (max-width: 768px) {
  #app {
    flex-direction: column;
  }

  .main-content {
    flex-direction: column;
    padding: 10px;
  }

  .main-content > * {
    margin-bottom: 20px;
  }
}
</style>
