<template>
    <button @click="likeTweet">Like</button>
  </template>
  
  <script setup>
  import { getAuth } from 'firebase/auth';
  import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
  import { db } from '@/firebase';
  
  const auth = getAuth();
  const user = auth.currentUser;
  
  const likeTweet = async (tweetId) => {
    if (user) {
      const tweetDoc = doc(db, 'tweets', tweetId);
      try {
        await updateDoc(tweetDoc, {
          likes: arrayUnion(user.uid)
        });
        alert("Tweet liked successfully.");
      } catch (error) {
        console.error("Error liking tweet: ", error);
      }
    } else {
      alert("You must be logged in to like a tweet.");
    }
  };
  </script>
  
  <style scoped>
  button {
    margin-top: 0.5rem;
  }
  </style>
  