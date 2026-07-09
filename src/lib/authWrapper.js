import { auth } from "./firebase.js";
import { onAuthStateChanged as firebaseOnAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";

const syncAuthState = (user) => {
  if (!auth || typeof auth.setCurrentUser !== "function") return;
  if (user) auth.setCurrentUser(user);
  else auth.clearCurrentUser?.();
};

export const onAuthStateChanged = (authInstance, callback) => {
  if (authInstance && typeof authInstance.onAuthStateChanged === "function") {
    return authInstance.onAuthStateChanged(callback);
  }

  return firebaseOnAuthStateChanged(authInstance, callback);
};

export const signOut = async (authInstance) => {
  if (authInstance && typeof authInstance.signOut === "function") {
    return authInstance.signOut();
  }

  return firebaseSignOut(authInstance);
};

// Store dev users in sessionStorage for demo purposes
const getDevUsers = () => {
  if (typeof window === "undefined") return {};
  const stored = sessionStorage.getItem("devUsers");
  return stored ? JSON.parse(stored) : {};
};

const setDevUsers = (users) => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem("devUsers", JSON.stringify(users));
};

// Check if we're using real Firebase or mock
const isRealFirebase = auth && auth.app;

export const createUserWithEmailAndPassword = async (email, password) => {
  if (isRealFirebase) {
    const { createUserWithEmailAndPassword: fbCreate } = await import("firebase/auth");
    return fbCreate(auth, email, password);
  }

  // Mock implementation
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getDevUsers();
      if (users[email]) {
        reject(new Error("Auth: Email already in use."));
        return;
      }
      users[email] = { password, uid: "dev_" + Date.now() };
      setDevUsers(users);
      const mockUser = { uid: users[email].uid, email };
      syncAuthState(mockUser);
      resolve({ user: mockUser });
    }, 500);
  });
};

export const signInWithEmailAndPassword = async (email, password) => {
  if (isRealFirebase) {
    const { signInWithEmailAndPassword: fbSignIn } = await import("firebase/auth");
    return fbSignIn(auth, email, password);
  }

  // Mock implementation
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getDevUsers();
      if (!users[email]) {
        syncAuthState(null);
        reject(new Error("Auth: There is no user record corresponding to this identifier."));
        return;
      }
      if (users[email].password !== password) {
        syncAuthState(null);
        reject(new Error("Auth: The password is invalid or the user does not have a password."));
        return;
      }
      const mockUser = { uid: users[email].uid, email };
      syncAuthState(mockUser);
      resolve({ user: mockUser });
    }, 500);
  });
};
