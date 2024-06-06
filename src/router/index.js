import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Explore from '@/views/Explore.vue';
import Profile from '@/views/Profile.vue';
import SignIn from '@/views/SignIn.vue';
import Register from '@/views/Register.vue';
import Notifications from '@/views/Notifications.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/explore', name: 'Explore', component: Explore },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/signin', name: 'SignIn', component: SignIn },
  { path: '/register', name: 'Register', component: Register },
  { path: '/notifications', name: 'Notifications', component: Notifications }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
