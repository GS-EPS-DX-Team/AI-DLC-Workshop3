import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { generateId } from "../utils/idGenerator";
import { nowISO } from "../utils/dateFormatter";

export function useConversation() {
  const { conversations, setConversations } = useContext(AppContext);

  const [currentConversationId, setCurrentConversationId] = useState(() => {
    if (conversations.length === 0) return null;
    return conversations[conversations.length - 1].id;
  });

  const currentConversation =
    conversations.find((c) => c.id === currentConversationId) || null;

  function startNewConversation() {
    const convId = generateId("conv_");
    const newConversation = {
      id: convId,
      messages: [],
      created_at: nowISO(),
    };
    setConversations((prev) => [...prev, newConversation]);
    setCurrentConversationId(convId);
    return convId;
  }

  function addMessage(role, content, extractedItems = []) {
    const message = {
      id: generateId("msg_"),
      role,
      content,
      extracted_items: extractedItems,
      created_at: nowISO(),
    };

    if (!currentConversationId) {
      const convId = generateId("conv_");
      const newConversation = {
        id: convId,
        messages: [message],
        created_at: nowISO(),
      };
      setConversations((prev) => [...prev, newConversation]);
      setCurrentConversationId(convId);
    } else {
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === currentConversationId
            ? { ...conv, messages: [...conv.messages, message] }
            : conv
        )
      );
    }

    return message;
  }

  function updateExtractedItemStatus(messageId, itemIndex, newStatus) {
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id !== currentConversationId) return conv;
        return {
          ...conv,
          messages: conv.messages.map((msg) => {
            if (msg.id !== messageId) return msg;
            const updatedItems = msg.extracted_items.map((item, idx) =>
              idx === itemIndex
                ? { ...item, verification_status: newStatus }
                : item
            );
            return { ...msg, extracted_items: updatedItems };
          }),
        };
      })
    );
  }

  function getCurrentMessages() {
    return currentConversation ? currentConversation.messages : [];
  }

  return {
    conversations,
    currentConversation,
    currentConversationId,
    startNewConversation,
    addMessage,
    updateExtractedItemStatus,
    getCurrentMessages,
    setCurrentConversationId,
  };
}
