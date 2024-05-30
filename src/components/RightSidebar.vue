<template>
  <aside class="right-sidebar" :class="{ 'right-sidebar-hidden': isHidden }">
    <div class="search-box">
      <input type="text" placeholder="Search" />
    </div>
    <div class="trends">
      <h2>Trends for you</h2>
      <p>#TrendingTopic1</p>
      <p>#TrendingTopic2</p>
    </div>
    <div class="who-to-follow">
      <h2>Who to follow</h2>
      <p>Profile 1</p>
      <p>Profile 2</p>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'RightSidebar',
  data() {
    return {
      isHidden: false,
    };
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.isHidden = window.innerWidth <= 768;
    },
  },
};
</script>

<style scoped>
.right-sidebar {
  background-color: #15202b;
  padding: 20px;
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 280px;
  color: white;
  border-left: 1px solid #38444d;
}

.right-sidebar-hidden {
  transform: translateX(100%);
}

.search-box input {
  padding: 10px;
  width: 100%;
  border-radius: 20px;
  border: none;
  margin-bottom: 20px;
}

.trends, .who-to-follow {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #38444d;
  border-radius: 10px;
}

.trends h2, .who-to-follow h2 {
  margin-bottom: 10px;
}
</style>
