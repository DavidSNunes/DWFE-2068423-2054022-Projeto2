import { getAuth } from 'firebase/auth';

export const requireAuth = (to, from, next) => {
  const auth = getAuth();
  auth.onAuthStateChanged(user => {
    if (user) {
      next();
    } else {
      next('/signin'); // Redirect to login if not authenticated
    }
  });
};
