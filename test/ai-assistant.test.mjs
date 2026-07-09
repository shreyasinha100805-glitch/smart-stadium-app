import test from "node:test";
import assert from "node:assert/strict";
import { generateAssistantReply } from "../src/lib/aiAssistant.mjs";

test("generates a helpful reply for parking questions", () => {
  const reply = generateAssistantReply("Where is parking?");

  assert.match(reply, /parking/i);
  assert.match(reply, /lot/i);
});

test("returns a fallback response for unknown questions", () => {
  const reply = generateAssistantReply("What is the meaning of life?");

  assert.match(reply, /help/i);
  assert.match(reply, /parking|food|transportation/i);
});
