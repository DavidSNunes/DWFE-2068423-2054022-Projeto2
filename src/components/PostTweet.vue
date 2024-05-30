<template>
  <div class="post-tweet">
    <textarea v-model="newTweet" placeholder="What's happening?" maxlength="280"></textarea>
    <button @click="postTweet">Tweet</button>
  </div>
</template>

<script>
export default {
  name: 'PostTweet',
  data() {
    return {
      newTweet: '',
    };
  },
  methods: {
    postTweet() {
      console.log('Posting tweet:', this.newTweet);
      this.newTweet = ''; // Clear the text area after posting
    },
  },
};
</script>

<style scoped>
.post-tweet {
  border-bottom: 1px solid #38444d;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: #15202b;
  color: white;
}

.post-tweet textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #38444d;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: #192734;
  color: white;
  resize: none;
}

.post-tweet button {
  align-self: flex-end;
  background-color: #1da1f2;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
}

.post-tweet button:hover {
  background-color: #0d8af0;
}
</style>
