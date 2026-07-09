export const createMockAuth = () => {
  let currentUser = null;
  const listeners = new Set();

  const auth = {
    get currentUser() {
      return currentUser;
    },
    setCurrentUser(user) {
      currentUser = user;
      listeners.forEach((listener) => listener(user));
    },
    clearCurrentUser() {
      currentUser = null;
      listeners.forEach((listener) => listener(null));
    },
    onAuthStateChanged(listener) {
      listeners.add(listener);
      listener(currentUser);
      return () => listeners.delete(listener);
    },
    signOut() {
      currentUser = null;
      listeners.forEach((listener) => listener(null));
      return Promise.resolve();
    },
  };

  return auth;
};
