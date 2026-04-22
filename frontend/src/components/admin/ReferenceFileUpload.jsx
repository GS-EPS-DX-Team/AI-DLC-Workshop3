import { useState, useRef, useEffect } from "react";

export default function ReferenceFileUpload({
  onFileLoaded,
  currentFileName,
  onAnalyze,
  isAnalyzing,
  hasStories,
}) {
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(null), 5000);
    return () => clearTimeout(timer);
  }, [error]);

  function handleFileChange(e) {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type (BR-008 V-005)
    const validExtensions = [".txt", ".md", ".json"];
    const fileExtension = "." + file.name.split(".").pop().toLowerCase();
    if (!validExtensions.includes(fileExtension)) {
      setError("지원하지 않는 파일 형식입니다. .txt, .md, .json 파일만 업로드할 수 있습니다.");
      // Reset input
      e.target.value = "";
      return;
    }

    // Read file as text
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      // Validate non-empty content (BR-008 V-006)
      if (!content || !content.trim()) {
        setError("파일이 비어 있습니다.");
        return;
      }
      onFileLoaded({ name: file.name, content });
    };
    reader.onerror = () => {
      setError("파일을 읽을 수 없습니다. 다시 시도해주세요.");
    };
    reader.readAsText(file);

    // Reset input so re-uploading the same file triggers change event
    e.target.value = "";
  }

  function handleUploadClick() {
    setError(null);
    fileInputRef.current?.click();
  }

  const canAnalyze = currentFileName && hasStories && !isAnalyzing;

  return (
    <div className="flex flex-col gap-2" data-testid="reference-file-upload">
      <div className="flex items-center gap-2 flex-wrap">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.md,.json"
          onChange={handleFileChange}
          className="hidden"
          aria-label="참조 파일 업로드"
          data-testid="reference-file-input"
        />

        {/* Upload / Change button */}
        <button
          type="button"
          onClick={handleUploadClick}
          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          data-testid="reference-file-button"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          {currentFileName ? "파일 변경" : "참조 파일 업로드"}
        </button>

        {/* Current file name */}
        {currentFileName && (
          <span className="text-sm text-gray-500 truncate max-w-[200px]" title={currentFileName}>
            {currentFileName}
          </span>
        )}

        {/* Analysis button */}
        {currentFileName && (
          <button
            type="button"
            onClick={onAnalyze}
            disabled={!canAnalyze}
            className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            data-testid="analyze-button"
          >
            {isAnalyzing ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                분석 중...
              </>
            ) : (
              "분석 시작"
            )}
          </button>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-xs text-red-600" role="alert" data-testid="reference-file-error">
          {error}
        </p>
      )}
    </div>
  );
}
