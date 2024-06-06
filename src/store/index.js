import { createStore } from 'vuex';

export default createStore({
  state: {
    userEmail: '',
    userDisplayName: '',
    isAuthenticated: false, // Add this line to keep track of authentication state
  },
  mutations: {
    setUserEmail(state, email) {
      state.userEmail = email;
    },
    setUserDisplayName(state, displayName) {
      state.userDisplayName = displayName;
    },
    setAuthentication(state, status) { // Add this mutation
      state.isAuthenticated = status;
    }
  }
});
