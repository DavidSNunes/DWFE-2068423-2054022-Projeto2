<template>
  <div class="profile-container">
    <div class="profile-info">
      <div class="user-picture">
        <img :src="userPicture" alt="User Picture" />
      </div>
      <div class="user-details">
        <h2 v-if="!isEditing">{{ userDisplayName }}</h2>
        <input v-else v-model="newDisplayName" @keyup.enter="saveDisplayName" />
        <p>{{ userEmail }}</p>
        <p>Ingressou em {{ userJoinDate }}</p>
        <p>{{ userFollowers }} Seguidores</p>
        <p>{{ userFollowing }} Seguindo</p>
        <button v-if="showFollowButton" @click="followUser(route.params.userId)">{{ followButtonText }}</button>
        <button v-if="isCurrentUserProfile && !isEditing" class="edit-profile-button" @click="editDisplayName">Editar Nome</button>
        <button v-if="isCurrentUserProfile && isEditing" class="save-profile-button" @click="saveDisplayName">Salvar</button>
      </div>
    </div>
    <div class="tabs">
      <button @click="showPosts">Posts</button>
      <button @click="showMedia">Mídia</button>
      <button @click="showLikes">Curtidas</button>
    </div>
    <div class="content">
      <div v-if="currentTab === 'posts'">
        <div v-for="tweet in tweets" :key="tweet.id" class="tweet">
          <p>{{ tweet.content }}</p>
          <small>{{ tweet.createdAt ? tweet.createdAt.toDate().toLocaleString() : '' }}</small>
        </div>
      </div>
      <p v-if="currentTab === 'media'">Mídia do utilizador</p>
      <p v-if="currentTab === 'likes'">Curtidas do utilizador</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs, orderBy, setDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import defaultProfilePic from '@/assets/profilepic.png';

const auth = getAuth();
const router = useRouter();
const route = useRoute();

const userPicture = ref(defaultProfilePic);
const userDisplayName = ref('');
const newDisplayName = ref('');
const userJoinDate = ref('junho de 2016');
const userFollowers = ref(0);
const userFollowing = ref(0);
const currentTab = ref('posts');
const tweets = ref([]);
const isEditing = ref(false);
const currentUserId = ref(null);
const userEmail = ref('');
const followButtonText = ref('Follow');

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUserId.value = user.uid;
    userEmail.value = user.email;
  } else {
    currentUserId.value = null;
  }
});

watch(() => route.params.userId, async (newVal) => {
  if (newVal) {
    await fetchUserProfile();
    if (currentTab.value === 'posts') {
      await fetchUserTweets();
    }
  }
});

const isCurrentUserProfile = computed(() => route.params.userId === currentUserId.value);
const showFollowButton = computed(() => !isCurrentUserProfile.value && !!auth.currentUser);

const fetchUserProfile = async () => {
  if (route.params.userId) {
    const userDoc = doc(db, 'users', route.params.userId);
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      userDisplayName.value = userData.displayName || userEmail.value;
      userFollowers.value = Array.isArray(userData.followers) ? userData.followers.length : 0;
      userFollowing.value = Array.isArray(userData.following) ? userData.following.length : 0;
      followButtonText.value = Array.isArray(userData.followers) && userData.followers.includes(currentUserId.value) ? 'Unfollow' : 'Follow';
    } else {
      userDisplayName.value = route.params.userId;
    }
  }
};

const fetchUserTweets = async () => {
  if (route.params.userId) {
    const tweetsQuery = query(
      collection(db, 'tweets'),
      where('uid', '==', route.params.userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(tweetsQuery);
    tweets.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      content: doc.data().content,
      createdAt: doc.data().createdAt
    }));
  }
};

const followUser = async (userId) => {
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const followerDocRef = doc(collection(db, 'followers', userId, 'followers'), currentUser.uid);
      const followingDocRef = doc(collection(db, 'following', currentUser.uid, 'following'), userId);

      await setDoc(followerDocRef, {
        userId: currentUser.uid,
        followedAt: serverTimestamp()
      });

      await setDoc(followingDocRef, {
        userId: userId,
        followedAt: serverTimestamp()
      });

      followButtonText.value = 'Unfollow';
      userFollowers.value += 1;
    }
  } catch (error) {
    console.error('Error following user: ', error);
  }
};

const editDisplayName = () => {
  isEditing.value = true;
  newDisplayName.value = userDisplayName.value;
};

const saveDisplayName = async () => {
  try {
    const userDoc = doc(db, 'users', currentUserId.value);
    await updateDoc(userDoc, { displayName: newDisplayName.value });
    userDisplayName.value = newDisplayName.value;
    isEditing.value = false;
  } catch (error) {
    console.error('Error updating display name: ', error);
  }
};

onMounted(async () => {
  await fetchUserProfile();
  await fetchUserTweets();
});

const showPosts = async () => {
  currentTab.value = 'posts';
  await fetchUserTweets();
};

const showMedia = () => {
  currentTab.value = 'media';
};

const showLikes = () => {
  currentTab.value = 'likes';
};
</script>

<style scoped>
.profile-container {
  flex: 1;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #15202b;
  color: white;
}

.profile-info {
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #38444d;
}

.user-picture img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  border: 3px solid #1da1f2;
}

.user-details {
  margin-left: 20px;
}

.user-details h2 {
  margin: 0;
  font-size: 1.5rem;
}

.user-details input {
  margin: 0;
  font-size: 1.5rem;
  padding: 5px;
  color: black;
}

.user-details p {
  margin: 5px 0;
}

.user-details button {
  margin-top: 10px;
  padding: 10px;
  font-size: 1rem;
  color: #1da1f2;
  background: none;
  border: 2px solid #1da1f2;
  border-radius: 20px;
  cursor: pointer;
}

.user-details button:hover {
  background-color: #1da1f2;
  color: white;
}

.edit-profile-button, .save-profile-button {
  margin-top: 10px;
  padding: 10px;
  font-size: 1rem;
  color: #1da1f2;
  background: none;
  border: 2px solid #1da1f2;
  border-radius: 20px;
  cursor: pointer;
}

.edit-profile-button:hover, .save-profile-button:hover {
  background-color: #1da1f2;
  color: white;
}

.tabs {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  border-bottom: 1px solid #38444d;
}

.tabs button {
  padding: 10px;
  font-size: 1rem;
  color: #1da1f2;
  background: none;
  border: none;
  cursor: pointer;
}

.tabs button:hover {
  text-decoration: underline;
}

.content {
  padding: 20px 0;
}

.tweet {
  background-color: #1a91da;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>
