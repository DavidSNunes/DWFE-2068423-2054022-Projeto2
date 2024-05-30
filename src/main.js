import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { auth } from './firebase';
import store from './store';

const app = createApp(App);

auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('setUserEmail', user.email);
  }
});

app.use(store).use(router).mount('#app');
