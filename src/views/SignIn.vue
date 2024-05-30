<template>
  <div class="auth-page">
    <h1>Sign In</h1>
    <form @submit.prevent="signIn">
      <input type="email" v-model="email" placeholder="Email" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit">Sign In</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { mapMutations } from 'vuex';

export default {
  name: 'SignIn',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    ...mapMutations(['setUserEmail', 'setAuthentication']),
    signIn() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          console.log("Signed in:", userCredential.user);
          this.setUserEmail(this.email);
          this.setAuthentication(true);
          this.$router.push({ name: 'Home' });
        })
        .catch((error) => {
          console.error("Error signing in:", error);
          this.errorMessage = error.message;
        });
    }
  }
};
</script>

<style>
.auth-page {
  padding: 20px;
  color: #fff;
}

.auth-page input {
  display: block;
  margin: 10px 0;
  padding: 10px;
  width: 100%;
}

.auth-page button {
  padding: 10px;
  width: 100%;
  cursor: pointer;
  background-color: #1c1c1c;
  color: #fff;
  border: 1px solid #fff;
}

.auth-page button:hover {
  background-color: #333;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
