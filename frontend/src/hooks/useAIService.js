import { useState } from "react";

const API_URL = import.meta.env.VITE_AI_API_URL || "https://api.openai.com/v1";
const API_KEY = import.meta.env.VITE_AI_API_KEY || "";
const AI_MODEL = import.meta.env.VITE_AI_MODEL || "gpt-4o-mini";
const REQUEST_TIMEOUT_MS = 30000;

async function callChatCompletions(messages, temperature = 0.3) {
  if (!API_KEY) {
    throw new Error(
      "AI API 키가 설정되지 않았습니다. 환경 변수를 확인해주세요."
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages,
        temperature,
        response_format: { type: "json_object" },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(
        `AI 서비스 오류가 발생했습니다. (상태 코드: ${response.status})`
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("AI 응답을 처리할 수 없습니다. 다시 시도해주세요.");
    }

    return JSON.parse(content);
  } catch (err) {
    clearTimeout(timeoutId);

    if (err.name === "AbortError") {
      throw new Error("AI 응답 시간이 초과되었습니다. 다시 시도해주세요.");
    }
    if (err instanceof TypeError && err.message.includes("fetch")) {
      throw new Error(
        "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요."
      );
    }
    if (
      err.message.startsWith("AI ") ||
      err.message.startsWith("네트워크")
    ) {
      throw err;
    }
    throw new Error("AI 응답을 처리할 수 없습니다. 다시 시도해주세요.");
  }
}

export function useAIService() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function extractRequirements(text) {
    setIsLoading(true);
    setError(null);

    try {
      const systemPrompt = `당신은 요구사항 분석 전문가입니다. 사용자가 입력한 자유 형식의 텍스트에서 구체적인 요구사항을 추출하고, 각 요구사항에 대해 주제 테마를 분류하며, 유저스토리 형식으로 변환해주세요.\n\n반드시 다음 JSON 형식으로 응답하세요:\n{"items": [{"summary": "요구사항 요약", "theme": {"name": "테마명", "description": "테마 설명"}, "story": "~로서, ~하고 싶다. 왜냐하면 ~이기 때문이다.", "purpose": "목적 설명", "acceptance_criteria": ["AC1", "AC2", "AC3"]}]}\n\n규칙:\n1. 입력 텍스트에서 서로 다른 요구사항이 여러 개 포함되어 있으면 각각 별도의 항목으로 추출하세요.\n2. 각 요구사항에는 반드시 summary, theme(name과 description 포함), story, purpose, acceptance_criteria(최소 1개)가 있어야 합니다.\n3. 유저스토리는 "~로서, ~하고 싶다. 왜냐하면 ~이기 때문이다." 형식으로 작성하세요.\n4. 테마는 요구사항의 주제를 기반으로 분류하세요.\n5. 입력이 너무 모호하여 요구사항을 추출할 수 없는 경우, items를 빈 배열로 반환하세요.`;

      const messages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: text },
      ];

      const result = await callChatCompletions(messages, 0.3);

      if (!result || !Array.isArray(result.items)) {
        throw new Error("AI 응답을 처리할 수 없습니다. 다시 시도해주세요.");
      }

      const validItems = result.items.filter(
        (item) =>
          item.summary &&
          item.theme &&
          item.theme.name &&
          item.story &&
          item.purpose &&
          Array.isArray(item.acceptance_criteria) &&
          item.acceptance_criteria.length > 0
      );

      if (validItems.length < result.items.length) {
        console.warn(
          `AI 응답에서 필수 필드가 누락된 항목 ${result.items.length - validItems.length}건을 제외했습니다.`
        );
      }

      return { items: validItems };
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  async function analyzeSystemSupport(stories, referenceContent) {
    setIsLoading(true);
    setError(null);

    try {
      const systemPrompt = `당신은 시스템 분석 전문가입니다. 아래 참조 문서는 기존 시스템의 기능 목록입니다. 각 유저스토리를 참조 문서와 비교하여, 기존 시스템에서 이미 지원하는 기능인지(supported) 새로 개발이 필요한 기능인지(needs_development) 판단해주세요.\n\n반드시 다음 JSON 형식으로 응답하세요:\n{"results": [{"user_story_id": "ID", "system_support": "supported 또는 needs_development", "reason": "판단 근거"}]}\n\n규칙:\n1. 각 유저스토리에 대해 반드시 user_story_id, system_support, reason을 포함해야 합니다.\n2. system_support는 반드시 "supported" 또는 "needs_development" 중 하나여야 합니다.\n3. reason은 판단 근거를 한국어로 간결하게 설명해주세요.\n4. 참조 문서에 명시적으로 해당 기능이 언급되어 있으면 "supported", 없으면 "needs_development"로 판단하세요.`;

      // Build stories text for the user message
      const storiesText = stories
        .map(
          (s) =>
            `- ID: ${s.id}\n  유저스토리: ${s.story}\n  목적: ${s.purpose}`
        )
        .join("\n\n");

      const userContent = `## 참조 문서\n${referenceContent}\n\n## 분석 대상 유저스토리\n${storiesText}`;

      const messages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ];

      const result = await callChatCompletions(messages, 0.2);

      // Validate response structure
      if (!result || !Array.isArray(result.results)) {
        throw new Error("AI 응답을 처리할 수 없습니다. 다시 시도해주세요.");
      }

      // Validate each result item
      const validResults = result.results.filter(
        (item) =>
          item.user_story_id &&
          (item.system_support === "supported" ||
            item.system_support === "needs_development") &&
          item.reason
      );

      if (validResults.length < result.results.length) {
        console.warn(
          `AI 응답에서 유효하지 않은 분석 결과 ${result.results.length - validResults.length}건을 제외했습니다.`
        );
      }

      return { results: validResults };
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  function clearError() {
    setError(null);
  }

  return {
    isLoading,
    error,
    extractRequirements,
    analyzeSystemSupport,
    clearError,
  };
}
