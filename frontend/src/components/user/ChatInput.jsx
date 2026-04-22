import { useState, useRef } from "react";
import VoiceInput from "./VoiceInput";
import FileInput from "./FileInput";

export default function ChatInput({ onSend, disabled, onNewConversation }) {
  const [inputText, setInputText] = useState("");
  const [inputType, setInputType] = useState("text");
  const [pendingFile, setPendingFile] = useState(null);
  const textareaRef = useRef(null);

  function handleSubmit() {
    const trimmed = inputText.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed, inputType, pendingFile);
    setInputText("");
    setInputType("text");
    setPendingFile(null);
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

  function handleFileLoaded(fileName, content) {
    setPendingFile({ name: fileName, content });
    setInputText(content);
    setInputType("file");
    textareaRef.current?.focus();
  }

  function handleRemoveFile() {
    setPendingFile(null);
    setInputText("");
    setInputType("text");
    textareaRef.current?.focus();
  }

  const isEmptyInput = !inputText.trim();

  return (
    <div className="shrink-0 border-t border-gray-200 bg-white px-4 py-3">
      {/* Pending file indicator */}
      {pendingFile && (
        <div className="mx-auto max-w-3xl mb-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="truncate max-w-[200px]">{pendingFile.name}</span>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="shrink-0 p-0.5 text-blue-500 hover:text-blue-700 rounded focus:outline-none"
              aria-label="파일 제거"
              data-testid="remove-file-button"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

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
        <div className="relative flex-1 flex items-end min-w-0 border border-gray-300 rounded-xl bg-gray-50 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-colors">
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

          {/* File upload button */}
          <FileInput
            onFileLoaded={handleFileLoaded}
            disabled={disabled}
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
