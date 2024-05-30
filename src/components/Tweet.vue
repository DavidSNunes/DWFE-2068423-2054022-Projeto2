<template>
  <div class="tweet">
    <div class="tweet-header">
      <img :src="userPic" alt="User Picture" class="user-pic" />
      <div>
        <span class="username">{{ username }}</span>
        <span class="handle">@{{ handle }}</span>
      </div>
    </div>
    <p class="tweet-content">{{ content }}</p>
    <div class="tweet-actions">
      <button @click="likeTweet">Like</button>
      <button @click="retweetTweet">Retweet</button>
      <button @click="replyTweet">Reply</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tweet',
  props: {
    userPic: String,
    username: String,
    handle: String,
    content: String,
  },
  methods: {
    likeTweet() {
      console.log('Liked tweet');
    },
    retweetTweet() {
      console.log('Retweeted tweet');
    },
    replyTweet() {
      console.log('Replied to tweet');
    },
  },
};
</script>

<style scoped>
.tweet {
  border-bottom: 1px solid #e1e8ed;
  padding: 10px;
  background-color: #15202b;
  color: white;
}

.tweet-header {
  display: flex;
  align-items: center;
}

.user-pic {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.username {
  font-weight: bold;
}

.handle {
  color: #657786;
  margin-left: 5px;
}

.tweet-content {
  margin: 10px 0;
}

.tweet-actions button {
  background: none;
  border: none;
  color: #1da1f2;
  cursor: pointer;
  margin-right: 10px;
}
</style>
