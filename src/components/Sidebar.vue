<template>
  <aside class="sidebar" :class="{ 'sidebar-hidden': isHidden }">
    <div class="sidebar-content">
      <router-link to="/" class="sidebar-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M20 20V12H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2z"></path><polyline points="22 12 12 2 2 12"></polyline></svg>
        Home
      </router-link>
      <router-link to="/explore" class="sidebar-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        Explore
      </router-link>
      <router-link to="/notifications" class="sidebar-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 8h18s-3-1-3-8"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
        Notifications
      </router-link>
      <router-link to="/profile" class="sidebar-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="feather feather-user"><path d="M20.24 20.24A9 9 0 1 0 3.76 3.76 9 9 0 0 0 20.24 20.24z"></path><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"></path><path d="M18 19.74C18 17.99 14.69 17 12 17s-6 .99-6 2.74V20h12v-.26z"></path></svg>
        Profile
      </router-link>
      <div v-if="!isLoggedIn" class="auth-buttons">
        <button class="auth-button" @click="goToRegister">Register</button>
        <button class="auth-button" @click="goToSignIn">Sign In</button>
      </div>
      <div v-else>
        <button class="auth-button" @click="handleSignOut">Sign Out</button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const router = useRouter();
const isLoggedIn = ref(false);
const user = ref(null);
const auth = getAuth();

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      isLoggedIn.value = true;
      user.value = currentUser;
    } else {
      isLoggedIn.value = false;
      user.value = null;
    }
  });
});

const goToRegister = () => {
  router.push('/register');
};

const goToSignIn = () => {
  router.push('/signin');
};

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push('/');
  });
};
</script>

<style scoped>
.sidebar {
  background-color: #15202b;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 280px;
  color: white;
  border-right: 1px solid #38444d;
}

.sidebar-hidden {
  transform: translateX(-100%);
}

.sidebar-content {
  display: flex;
  flex-direction: column;
}

.sidebar-item {
  color: white;
  text-decoration: none;
  font-size: 18px;
  margin: 10px 0;
  padding: 10px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  transition: background-color 0.2s;
}

.sidebar-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.sidebar-item svg {
  margin-right: 10px;
}

.auth-buttons {
  margin-top: 20px;
}

.auth-button {
  background-color: #1da1f2;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  margin-bottom: 10px;
  text-align: center;
}

.auth-button:hover {
  background-color: #0d8af0;
}
</style>
