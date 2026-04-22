import { useState } from "react";
import WelcomeMessage from "../components/user/WelcomeMessage";
import MessageList from "../components/user/MessageList";
import ChatInput from "../components/user/ChatInput";
import ConfirmDialog from "../components/common/ConfirmDialog";
import { useConversation } from "../hooks/useConversation";
import { useAIService } from "../hooks/useAIService";
import { useRequirements } from "../hooks/useRequirements";
import { useThemes } from "../hooks/useThemes";
import { useUserStories } from "../hooks/useUserStories";

export default function UserPage() {
  const {
    currentConversation,
    startNewConversation,
    addMessage,
    getCurrentMessages,
    updateExtractedItemStatus,
  } = useConversation();
  const { isLoading, error, extractRequirements, clearError } = useAIService();
  const { addRequirement, updateStatus } = useRequirements();
  const { addTheme } = useThemes();
  const { addUserStory } = useUserStories();

  const [showConfirmNewConversation, setShowConfirmNewConversation] =
    useState(false);

  const messages = getCurrentMessages();
  const hasMessages = messages.length > 0;

  function handleApproveItem(messageId, item, itemIndex) {
    // 1. Update requirement status to "verified"
    if (item.requirement_id) {
      updateStatus(item.requirement_id, "verified");
    }

    // 2. Save theme (dedup by name)
    const theme = addTheme(item.theme, item.theme_description || "");

    // 3. Save user story
    addUserStory({
      requirement_id: item.requirement_id,
      theme_id: theme.id,
      story: item.story,
      purpose: item.purpose,
      acceptance_criteria: item.acceptance_criteria,
    });

    // 4. Update conversation extracted item status to "verified"
    updateExtractedItemStatus(messageId, itemIndex, "verified");
  }

  function handleRejectItem(messageId, item, itemIndex) {
    // Only update conversation extracted item status to "rejected"
    // Do NOT save to requirements/themes/user_stories entities
    updateExtractedItemStatus(messageId, itemIndex, "rejected");
  }

  async function handleSend(text, inputType, fileInfo) {
    const requirement = addRequirement(text, inputType);

    const displayContent = fileInfo
      ? `📎 ${fileInfo.name}\n\n${text.length > 300 ? text.slice(0, 300) + "..." : text}`
      : text;
    addMessage("user", displayContent, []);

    const result = await extractRequirements(text);

    if (!result) {
      addMessage(
        "system",
        "AI 처리 중 오류가 발생했습니다. 다시 시도해주세요.",
        []
      );
      return;
    }

    if (result.items.length === 0) {
      updateStatus(requirement.id, "processed");
      addMessage(
        "assistant",
        "입력하신 내용에서 구체적인 요구사항을 추출하지 못했습니다. 조금 더 구체적으로 설명해주시면 다시 분석해 드리겠습니다.",
        []
      );
      return;
    }

    updateStatus(requirement.id, "processed");

    const extractedItems = result.items.map((item) => ({
      requirement_id: requirement.id,
      summary: item.summary,
      theme: item.theme.name,
      theme_description: item.theme.description,
      story: item.story,
      purpose: item.purpose,
      acceptance_criteria: item.acceptance_criteria,
      user_story_id: null,
      verification_status: "pending",
    }));

    addMessage(
      "assistant",
      "입력하신 내용에서 다음 요구사항을 추출했습니다:",
      extractedItems
    );
  }

  function handleNewConversation() {
    setShowConfirmNewConversation(true);
  }

  function handleConfirmNewConversation() {
    startNewConversation();
    setShowConfirmNewConversation(false);
    clearError();
  }

  function handleCancelNewConversation() {
    setShowConfirmNewConversation(false);
  }

  function handleRetry() {
    clearError();
    const lastUserMessage = [...messages]
      .reverse()
      .find((m) => m.role === "user");
    if (lastUserMessage) {
      retryExtraction(lastUserMessage.content);
    }
  }

  async function retryExtraction(text) {
    const result = await extractRequirements(text);

    if (!result) {
      addMessage(
        "system",
        "AI 처리 중 오류가 발생했습니다. 다시 시도해주세요.",
        []
      );
      return;
    }

    if (result.items.length === 0) {
      addMessage(
        "assistant",
        "입력하신 내용에서 구체적인 요구사항을 추출하지 못했습니다. 조금 더 구체적으로 설명해주시면 다시 분석해 드리겠습니다.",
        []
      );
      return;
    }

    const extractedItems = result.items.map((item) => ({
      requirement_id: null,
      summary: item.summary,
      theme: item.theme.name,
      theme_description: item.theme.description,
      story: item.story,
      purpose: item.purpose,
      acceptance_criteria: item.acceptance_criteria,
      user_story_id: null,
      verification_status: "pending",
    }));

    addMessage(
      "assistant",
      "입력하신 내용에서 다음 요구사항을 추출했습니다:",
      extractedItems
    );
  }

  return (
    <div className="flex flex-col h-full" data-testid="user-page">
      {/* Error banner (persistent, below header) */}
      {error && (
        <div className="shrink-0 px-4 py-2 bg-red-50 border-b border-red-200 text-center">
          <span className="text-sm text-red-700">{error}</span>
          <button
            type="button"
            onClick={handleRetry}
            className="ml-3 text-sm font-medium text-red-600 underline hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            data-testid="retry-button"
          >
            다시 시도
          </button>
        </div>
      )}

      {/* Conversation area */}
      {hasMessages ? (
        <MessageList
          messages={messages}
          isLoading={isLoading}
          onApprove={handleApproveItem}
          onReject={handleRejectItem}
        />
      ) : (
        <div className="flex-1 overflow-hidden">
          <WelcomeMessage />
        </div>
      )}

      {/* Input bar */}
      <ChatInput
        onSend={handleSend}
        disabled={isLoading}
        onNewConversation={handleNewConversation}
      />

      {/* New conversation confirmation dialog */}
      <ConfirmDialog
        isOpen={showConfirmNewConversation}
        title="새 대화"
        message="새 대화를 시작하시겠습니까? 현재 대화는 저장됩니다."
        onConfirm={handleConfirmNewConversation}
        onCancel={handleCancelNewConversation}
      />
    </div>
  );
}
