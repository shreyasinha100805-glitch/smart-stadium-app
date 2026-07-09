import test from "node:test";
import assert from "node:assert/strict";
import { createMockAuth } from "../src/lib/mockAuth.js";
import { onAuthStateChanged } from "../src/lib/authWrapper.js";

test("mock auth tracks the signed-in user and notifies listeners", () => {
  const auth = createMockAuth();
  let observedUser = null;

  auth.onAuthStateChanged((user) => {
    observedUser = user;
  });

  auth.setCurrentUser({ uid: "dev_123", email: "fan@example.com" });

  assert.deepEqual(observedUser, { uid: "dev_123", email: "fan@example.com" });
  assert.equal(auth.currentUser?.email, "fan@example.com");
});

test("auth wrapper can listen to mock auth state changes", () => {
  const auth = createMockAuth();
  let observedUser = null;

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    observedUser = user;
  });

  auth.setCurrentUser({ uid: "dev_456", email: "fan2@example.com" });

  assert.deepEqual(observedUser, { uid: "dev_456", email: "fan2@example.com" });
  unsubscribe();
});
