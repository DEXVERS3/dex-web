let conversations = {};

export function saveMessage(sessionId, message) {
  if (!conversations[sessionId]) {
    conversations[sessionId] = [];
  }
  conversations[sessionId].push(message);
}

export function getConversation(sessionId) {
  return conversations[sessionId] || [];
}

export function getAllConversations() {
  return conversations;
}
