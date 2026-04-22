import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useUserStories } from "../hooks/useUserStories";
import { useThemes } from "../hooks/useThemes";
import { useRequirements } from "../hooks/useRequirements";
import { useAIService } from "../hooks/useAIService";
import ThemeFilter from "../components/admin/ThemeFilter";
import StoryList from "../components/admin/StoryList";
import StoryDetailModal from "../components/admin/StoryDetailModal";
import ReferenceFileUpload from "../components/admin/ReferenceFileUpload";
import EmptyState from "../components/common/EmptyState";

export default function AdminPage() {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedDetailStoryId, setSelectedDetailStoryId] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState(null);

  const { userStories, bulkUpdateSystemSupport } = useUserStories();
  const { themes } = useThemes();
  const { getRequirementById } = useRequirements();
  const { analyzeSystemSupport } = useAIService();
  const { referenceFile, setReferenceFile } = useContext(AppContext);
  const navigate = useNavigate();

  // Filter stories by selected theme
  const filteredStories = selectedTheme
    ? userStories.filter((s) => s.theme_id === selectedTheme)
    : userStories;

  // Sort stories newest-first (created_at descending)
  const sortedStories = [...filteredStories].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  // Build theme name lookup map for StoryRow props
  const themeMap = new Map(themes.map((t) => [t.id, t.name]));

  // Get the selected story and its requirement for the detail modal
  const selectedStory = selectedDetailStoryId
    ? userStories.find((s) => s.id === selectedDetailStoryId)
    : null;
  const selectedRequirement = selectedStory
    ? getRequirementById(selectedStory.requirement_id)
    : null;
  const selectedThemeName = selectedStory
    ? themeMap.get(selectedStory.theme_id) || ""
    : "";

  // Reference file name
  const currentFileName = referenceFile ? referenceFile.name : null;

  // Whether any verified stories exist
  const hasStories = userStories.length > 0;

  // Auto-clear analysis error
  useEffect(() => {
    if (!analysisError) return;
    const timer = setTimeout(() => setAnalysisError(null), 5000);
    return () => clearTimeout(timer);
  }, [analysisError]);

  function handleThemeChange(themeId) {
    setSelectedTheme(themeId);
  }

  function handleStoryClick(storyId) {
    setSelectedDetailStoryId(storyId);
    setShowDetailModal(true);
  }

  function handleCloseDetailModal() {
    setShowDetailModal(false);
    setSelectedDetailStoryId(null);
  }

  function handleFileLoaded(file) {
    setReferenceFile({
      name: file.name,
      content: file.content,
      uploaded_at: new Date().toISOString(),
    });
    setAnalysisError(null);
  }

  async function handleAnalyze() {
    if (!referenceFile || !hasStories) return;

    setIsAnalyzing(true);
    setAnalysisError(null);

    const result = await analyzeSystemSupport(userStories, referenceFile.content);

    if (!result) {
      setAnalysisError("시스템 지원 분석 중 오류가 발생했습니다. 다시 시도해주세요.");
      setIsAnalyzing(false);
      return;
    }

    // Map AI results to bulkUpdateSystemSupport format
    const updates = result.results.map((r) => ({
      id: r.user_story_id,
      system_support: r.system_support,
    }));

    // Only update stories that have matching IDs in our data
    const validUpdates = updates.filter((u) =>
      userStories.some((s) => s.id === u.id)
    );

    if (validUpdates.length > 0) {
      bulkUpdateSystemSupport(validUpdates);
    }

    setIsAnalyzing(false);
  }

  function handleNavigateToUser() {
    navigate("/user");
  }

  return (
    <div className="flex flex-col h-full overflow-hidden" data-testid="admin-page">
      {/* Toolbar area */}
      <div className="shrink-0 px-4 py-3 bg-white border-b border-gray-200 space-y-3">
        <div className="mx-auto max-w-5xl">
          {/* Row 1: Filter + Reference File */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Theme Filter */}
            <div className="flex-1 min-w-0">
              <ThemeFilter
                themes={themes}
                selectedTheme={selectedTheme}
                onThemeChange={handleThemeChange}
              />
            </div>

            {/* Reference File Upload */}
            <div className="shrink-0">
              <ReferenceFileUpload
                onFileLoaded={handleFileLoaded}
                currentFileName={currentFileName}
                onAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
                hasStories={hasStories}
              />
            </div>
          </div>

          {/* Analysis error */}
          {analysisError && (
            <div
              className="px-3 py-2 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200"
              role="alert"
              data-testid="analysis-error"
            >
              {analysisError}
            </div>
          )}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl">
          {hasStories ? (
            <StoryList
              stories={sortedStories}
              onStoryClick={handleStoryClick}
              themeMap={themeMap}
            />
          ) : (
            <EmptyState
              message="등록된 유저스토리가 없습니다"
              submessage="사용자 페이지에서 요구사항을 입력하고 승인하면 여기에 표시됩니다"
              actionLabel="사용자 페이지로 이동"
              onAction={handleNavigateToUser}
            />
          )}
        </div>
      </div>

      {/* Story Detail Modal */}
      <StoryDetailModal
        story={selectedStory}
        requirement={selectedRequirement}
        themeName={selectedThemeName}
        isOpen={showDetailModal}
        onClose={handleCloseDetailModal}
      />
    </div>
  );
}
