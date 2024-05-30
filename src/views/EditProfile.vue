<template>
  <div class="edit-profile">
    <input v-model="displayName" placeholder="Display Name" />
    <input v-model="bio" placeholder="Bio" />
    <button @click="saveProfile">Save Profile</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';

const auth = getAuth();
const user = auth.currentUser;
const displayName = ref('');
const bio = ref('');
const router = useRouter();

const fetchProfile = async () => {
  if (user) {
    const userDoc = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
      displayName.value = docSnap.data().displayName || '';
      bio.value = docSnap.data().bio || '';
    }
  }
};

onMounted(() => {
  fetchProfile();
});

const saveProfile = async () => {
  if (user) {
    try {
      await setDoc(doc(db, 'users', user.uid), {
        displayName: displayName.value,
        bio: bio.value
      }, { merge: true });
      alert("Profile updated successfully.");
      router.push(`/profile/${user.uid}`); // Redirect to the profile page after saving
    } catch (error) {
      console.error("Error saving profile: ", error);
    }
  }
};
</script>

<style scoped>
.edit-profile {
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

input {
  display: block;
  margin-bottom: 0.5rem;
  width: 300px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
}

button {
  margin-top: 0.5rem;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  background-color: #1da1f2;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #0d8af0;
}
</style>
