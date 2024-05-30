<template>
    <nav class="navbar">
        <router-link to="/"class="logo-link"> 
            <img :src="LogoImage" alt="logosite" class="logo" />
        </router-link>
        <h1>*Twitter Clone*</h1>
    </nav>
</template>
  
<script>
import LogoImage from "/src/assets/logoprojeto2.png";

export default {
    name: 'Navbar',
    data() {
        return {
            LogoImage
        };
    }
}
</script>
  
<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #e47e7e;
  padding: 1rem;
  color: rgb(155, 2, 2);
}

.logo {
  height: 80px; 
}

@media (max-width: 768px) {
  .navbar h1 {
    font-size: 1.2rem;
  }
  .logo {
    height: 70px;
  }
}



</style>
  