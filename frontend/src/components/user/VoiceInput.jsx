import { useState, useRef, useEffect } from "react";

export default function VoiceInput({ onTranscript, disabled = false }) {
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState(null);
  const recognitionRef = useRef(null);
  const onTranscriptRef = useRef(onTranscript);

  useEffect(() => {
    onTranscriptRef.current = onTranscript;
  }, [onTranscript]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setStatus("unsupported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ko-KR";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const last = event.results[event.results.length - 1];
      if (last.isFinal) {
        const transcript = last[0].transcript;
        onTranscriptRef.current(transcript);
        setStatus("idle");
      }
    };

    recognition.onerror = (event) => {
      if (
        event.error === "not-allowed" ||
        event.error === "permission-denied"
      ) {
        setErrorMessage("마이크 사용 권한이 필요합니다");
      } else if (event.error === "no-speech") {
        setErrorMessage("음성이 감지되지 않았습니다. 다시 시도해주세요.");
      } else {
        setErrorMessage("음성을 인식할 수 없습니다. 다시 시도해주세요.");
      }
      setStatus("idle");
    };

    recognition.onend = () => {
      setStatus("idle");
    };

    recognitionRef.current = recognition;
  }, []);

  useEffect(() => {
    if (!errorMessage) return;
    const timer = setTimeout(() => setErrorMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  function handleClick() {
    setErrorMessage(null);

    if (status === "unsupported") {
      setErrorMessage(
        "이 브라우저에서는 음성 입력이 지원되지 않습니다"
      );
      return;
    }

    if (status === "recording") {
      recognitionRef.current?.stop();
      setStatus("idle");
      return;
    }

    try {
      recognitionRef.current?.start();
      setStatus("recording");
    } catch (err) {
      setErrorMessage("음성 인식을 시작할 수 없습니다. 다시 시도해주세요.");
    }
  }

  const isRecording = status === "recording";
  const isUnsupported = status === "unsupported";

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isRecording
            ? "text-red-500 bg-red-50 animate-pulse"
            : isUnsupported
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        aria-label={isRecording ? "음성 입력 중지" : "음성 입력"}
        aria-pressed={isRecording}
        title={isRecording ? "듣고 있습니다..." : "음성 입력"}
        data-testid="voice-input-button"
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
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4M12 15a3 3 0 003-3V5a3 3 0 00-6 0v7a3 3 0 003 3z"
          />
        </svg>
      </button>

      {isRecording && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 text-xs text-red-600 bg-red-50 rounded border border-red-200">
          듣고 있습니다...
        </span>
      )}

      {errorMessage && (
        <span className="absolute -top-8 right-0 whitespace-nowrap px-2 py-1 text-xs text-yellow-800 bg-yellow-50 rounded border border-yellow-200">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
