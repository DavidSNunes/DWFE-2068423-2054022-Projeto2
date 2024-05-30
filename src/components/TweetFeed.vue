<template>
  <div class="tweet-feed">
    <Tweet 
      v-for="tweet in tweets" 
      :key="tweet.id" 
      :userPic="tweet.userPic" 
      :username="tweet.username" 
      :handle="tweet.handle" 
      :content="tweet.content" 
    />
  </div>
</template>

<script>
import Tweet from './Tweet.vue';

export default {
  name: 'TweetFeed',
  components: {
    Tweet,
  },
  data() {
    return {
      tweets: [
        { id: 1, userPic: '@/assets/user_pic.png', username: 'User1', handle: 'user1', content: 'This is the first tweet' },
        { id: 2, userPic: '@/assets/user_pic.png', username: 'User2', handle: 'user2', content: 'This is the second tweet' },
        // Adicione mais tweets conforme necessário
      ],
    };
  },
};
</script>

<style scoped>
.tweet-feed {
  margin: 0 auto;
  padding: 20px;
  max-width: 600px;
  background-color: #15202b;
}
</style>
