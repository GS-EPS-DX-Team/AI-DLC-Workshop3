import { useState, useRef } from "react";
import VoiceInput from "./VoiceInput";

export default function ChatInput({ onSend, disabled, onNewConversation }) {
  const [inputText, setInputText] = useState("");
  const [inputType, setInputType] = useState("text");
  const textareaRef = useRef(null);

  function handleSubmit() {
    const trimmed = inputText.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed, inputType);
    setInputText("");
    setInputType("text");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  function handleInputChange(e) {
    setInputText(e.target.value);
    setInputType("text");
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  }

  function handleVoiceTranscript(transcript) {
    setInputText((prev) => (prev ? prev + " " + transcript : transcript));
    setInputType("voice");
    textareaRef.current?.focus();
  }

  const isEmptyInput = !inputText.trim();

  return (
    <div className="shrink-0 border-t border-gray-200 bg-white px-4 py-3">
      <div className="mx-auto max-w-3xl flex items-end gap-2">
        {/* New conversation button */}
        <button
          type="button"
          onClick={onNewConversation}
          className="shrink-0 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="새 대화"
          title="새 대화"
          data-testid="new-conversation-button"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>

        {/* Text input area */}
        <div className="flex-1 flex items-end min-w-0 border border-gray-300 rounded-xl bg-gray-50 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-colors">
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="요구사항을 입력해주세요..."
            disabled={disabled}
            rows={1}
            className="flex-1 min-w-0 px-4 py-2.5 text-sm text-gray-900 bg-transparent border-none outline-none resize-none placeholder:text-gray-400 disabled:opacity-50"
            aria-label="요구사항 입력"
            data-testid="chat-input-textarea"
          />

          {/* Voice input button */}
          <VoiceInput
            onTranscript={handleVoiceTranscript}
            disabled={disabled}
          />
        </div>

        {/* Send button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={disabled || isEmptyInput}
          className="shrink-0 p-2.5 text-white bg-blue-500 rounded-xl hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="전송"
          data-testid="send-button"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
