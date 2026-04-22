import { useRef, useState, useEffect } from "react";

const VALID_EXTENSIONS = [".txt", ".md", ".json"];
const MAX_FILE_SIZE = 512 * 1024; // 512KB

export default function FileInput({ onFileLoaded, disabled }) {
  const fileInputRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(null), 5000);
    return () => clearTimeout(timer);
  }, [error]);

  function handleClick() {
    if (disabled) return;
    setError(null);
    fileInputRef.current?.click();
  }

  function handleFileChange(e) {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = "." + file.name.split(".").pop().toLowerCase();
    if (!VALID_EXTENSIONS.includes(ext)) {
      setError(".txt, .md, .json 파일만 지원합니다.");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("파일 크기가 512KB를 초과합니다.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (!content || !content.trim()) {
        setError("파일이 비어 있습니다.");
        return;
      }
      onFileLoaded(file.name, content.trim());
    };
    reader.onerror = () => {
      setError("파일을 읽을 수 없습니다.");
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.md,.json"
        onChange={handleFileChange}
        className="hidden"
        aria-label="파일 업로드"
        data-testid="file-upload-input"
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className="shrink-0 p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="파일 업로드"
        title="파일 업로드 (.txt, .md, .json)"
        data-testid="file-upload-button"
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
            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
          />
        </svg>
      </button>
      {error && (
        <div className="absolute bottom-full left-0 mb-1 px-3 py-1.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg whitespace-nowrap" role="alert">
          {error}
        </div>
      )}
    </>
  );
}
