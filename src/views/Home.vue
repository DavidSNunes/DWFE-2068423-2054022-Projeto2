<template>
  <div class="home-container">
    <div class="tweet-box">
      <textarea v-model="newTweet" placeholder="What's happening?"></textarea>
      <button @click="postTweet">Tweet</button>
    </div>
    <div v-for="tweet in tweets" :key="tweet.id" class="tweet">
      <p>{{ tweet.content }}</p>
      <small>{{ tweet.createdAt ? tweet.createdAt.toDate().toLocaleString() : '' }}</small>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { collection, query, getDocs, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import { getAuth } from 'firebase/auth';

const tweets = ref([]);
const newTweet = ref('');
const auth = getAuth();

const fetchTweets = async () => {
  const tweetsQuery = query(collection(db, 'tweets'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(tweetsQuery);
  tweets.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

const postTweet = async () => {
  if (newTweet.value.trim() !== '') {
    const user = auth.currentUser;
    if (user) {
      await addDoc(collection(db, 'tweets'), {
        uid: user.uid,
        content: newTweet.value,
        createdAt: serverTimestamp()
      });
      newTweet.value = '';
      await fetchTweets();
    } else {
      alert('You must be signed in to post a tweet.');
    }
  } else {
    alert('Tweet cannot be empty.');
  }
};

onMounted(async () => {
  await fetchTweets();
});
</script>

<style scoped>
.home-container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #15202b;
  color: white;
}

.tweet-box {
  margin-bottom: 20px;
}

.tweet-box textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  border: 1px solid #1da1f2;
  background-color: #253341;
  color: white;
  resize: none;
}

.tweet-box button {
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background-color: #1da1f2;
  color: white;
  cursor: pointer;
}

.tweet {
  background-color: #1a91da;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>
