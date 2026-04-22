# Code Generation Plan: UNIT-02 (User Input & AI)

## Project Structure
- [x] Create `frontend/src/components/user/` directory
- [x] Verify structure

## Hooks (5 new files)
- [x] Generate `frontend/src/hooks/useConversation.js` -- conversation lifecycle, message persistence via AppContext
- [x] Generate `frontend/src/hooks/useAIService.js` -- OpenAI-compatible API calls, extraction prompts, loading/error state
- [x] Generate `frontend/src/hooks/useRequirements.js` -- requirements CRUD via AppContext
- [x] Generate `frontend/src/hooks/useThemes.js` -- themes read/write with deduplication via AppContext
- [x] Generate `frontend/src/hooks/useUserStories.js` -- user stories CRUD via AppContext
- [x] Summary: All 5 hooks implemented per functional design -- useConversation (conversation/message CRUD), useAIService (OpenAI API with system prompt, loading/error, 30s timeout), useRequirements (req CRUD with status flow), useThemes (dedup by name), useUserStories (CRUD with bulk update)

## Components (5 new files)
- [x] Generate `frontend/src/components/user/WelcomeMessage.jsx` -- empty conversation state
- [x] Generate `frontend/src/components/user/MessageBubble.jsx` -- user/AI message bubbles with extracted item cards
- [x] Generate `frontend/src/components/user/MessageList.jsx` -- scrollable message container with auto-scroll
- [x] Generate `frontend/src/components/user/VoiceInput.jsx` -- Web Speech API microphone button
- [x] Generate `frontend/src/components/user/ChatInput.jsx` -- multi-line textarea, send button, voice integration
- [x] Summary: All 5 components implemented per functional design -- WelcomeMessage (centered title/subtitle/helper), MessageBubble (user blue right, assistant gray left with ExtractedItemCard, system yellow center), MessageList (scrollable with auto-scroll and loading), VoiceInput (Web Speech API with ko-KR, ref-based callback for stale closure prevention), ChatInput (auto-resize textarea, Enter/Shift+Enter, voice integration, new conversation button)

## Page (1 replace)
- [x] Replace `frontend/src/pages/UserPage.jsx` stub with full implementation -- orchestration of all hooks and components
- [x] Summary: UserPage fully implemented -- orchestrates useConversation, useAIService, useRequirements. Full flow: input -> addRequirement(submitted) -> addMessage(user) -> extractRequirements -> addMessage(assistant with extracted items) -> updateStatus(processed). Includes error banner with retry, new conversation with ConfirmDialog, WelcomeMessage for empty state.

## Build Verification
- [x] Run `npm run build` to verify zero errors
- [x] Summary: Production build succeeded -- 51 modules transformed, 0 errors, 0 warnings. Output: dist/index.html (0.40 kB), dist/assets/index.css (15.42 kB), dist/assets/index.js (188.07 kB). Built in 2.99s.
