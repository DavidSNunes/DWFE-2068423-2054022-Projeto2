import { createStore } from 'vuex';

export default createStore({
  state: {
    userEmail: '',
    userDisplayName: ''
  },
  mutations: {
    setUserEmail(state, email) {
      state.userEmail = email;
    },
    setUserDisplayName(state, displayName) {
      state.userDisplayName = displayName;
    }
  }
});
