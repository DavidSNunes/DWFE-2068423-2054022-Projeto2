<template>
  <div class="explore-container">
    <input v-model="searchQuery" @keyup.enter="searchUsers" placeholder="Search for users..." />
    <div v-if="users.length">
      <div v-for="user in users" :key="user.id" class="user-card" @click="goToUserProfile(user.id)">
        <img :src="user.picture || defaultProfilePic" alt="User Picture" />
        <div class="user-details">
          <h3>{{ user.displayName }}</h3>
          <p>{{ user.email }}</p>
        </div>
      </div>
    </div>
    <p v-else>No users found</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import defaultProfilePic from '@/assets/profilepic.png';

const searchQuery = ref('');
const users = ref([]);
const router = useRouter();

const searchUsers = async () => {
  if (searchQuery.value.trim()) {
    const q = query(collection(db, 'users'), where('displayName', '>=', searchQuery.value), where('displayName', '<=', searchQuery.value + '\uf8ff'));
    const querySnapshot = await getDocs(q);
    users.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } else {
    users.value = [];
  }
};

const goToUserProfile = (userId) => {
  router.push(`/profile/${userId}`);
};
</script>

<style scoped>
.explore-container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #15202b;
  color: white;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 20px;
  border: 1px solid #1da1f2;
  background-color: #253341;
  color: white;
}

.user-card {
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #1a91da;
  cursor: pointer;
}

.user-card img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-details h3 {
  margin: 0;
  font-size: 1.2rem;
}

.user-details p {
  margin: 5px 0 0;
  font-size: 0.9rem;
}
</style>
