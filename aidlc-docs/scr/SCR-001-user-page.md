# SCR-001: User Page (사용자 페이지)

> Version: v1.0
> Date: 2026-04-22
> Route: `/user`
> Related Stories: US-001, US-002, US-003, US-004, US-005, US-006, US-007, US-008, US-009, US-010, US-011, US-012

---

## 1. Page Overview

ChatGPT-style conversational interface where field staff input requirements via text or voice. The AI extracts structured requirements, classifies themes, and generates user story drafts. The field staff verifies each extracted item by approving or rejecting it.

**Target Users**: Field staff (현업 담당자)
**Primary Actions**: Input requirement (text/voice), review AI extraction, approve/reject items, start new conversation

---

## 2. Layout Structure

```
+---------------------------------------------------------------+
|  Header (shared -- see Layout)                                 |
|  [말해 뭐해]                        [사용자]  [관리자]           |
+---------------------------------------------------------------+
|                                                                 |
|  +-----------------------------------------------------------+ |
|  |                   Conversation Area                        | |
|  |                   (scrollable)                             | |
|  |                                                            | |
|  |  [WelcomeMessage -- shown when no messages]                | |
|  |                                                            | |
|  |  [AI Message Bubble]         [User Message Bubble]         | |
|  |  (left-aligned, gray)        (right-aligned, blue)         | |
|  |                                                            | |
|  |  [AI Response with extracted items]                        | |
|  |  +-----------------------------------------------------+  | |
|  |  | Extracted Item 1                                     |  | |
|  |  | Theme: [theme badge]                                 |  | |
|  |  | Story: "~로서 ~하고 싶다..."                           |  | |
|  |  | [승인] [거부]                                          |  | |
|  |  +-----------------------------------------------------+  | |
|  |                                                            | |
|  +-----------------------------------------------------------+ |
|                                                                 |
|  +-----------------------------------------------------------+ |
|  | [새 대화]  [text input field...           ] [mic] [전송]   | |
|  +-----------------------------------------------------------+ |
+---------------------------------------------------------------+
```

---

## 3. Component Specifications

### 3.1 WelcomeMessage

**Visibility**: Shown only when the current conversation has zero messages.

**Content**:
- Centered in the conversation area vertically and horizontally
- Title: "말해 뭐해" (large, bold)
- Subtitle: "요구사항을 자유롭게 입력해주세요"
- Helper text: "텍스트를 입력하거나 마이크 버튼을 눌러 음성으로 입력할 수 있습니다"

**Behavior**:
- Disappears as soon as the first message is sent

### 3.2 MessageList (Conversation Area)

**Layout**:
- Full height between Header and ChatInput (flex-grow, overflow-y: auto)
- Messages displayed in chronological order (oldest at top, newest at bottom)
- Auto-scrolls to the bottom when a new message is added
- Padding: horizontal 16px, vertical 8px per message

**Behavior**:
- Scrollable when messages overflow the visible area
- On page load, scrolls to the most recent message
- While AI is processing, shows LoadingIndicator at the bottom

### 3.3 MessageBubble

**User Message** (field staff input):
- Alignment: right-aligned
- Background: blue-tinted (e.g., Tailwind `bg-blue-500 text-white` or similar)
- Border radius: rounded (rounded-2xl)
- Max width: 75% of conversation area
- Content: plain text of the user's input
- Font size: 14-16px

**AI Message** (assistant response):
- Alignment: left-aligned
- Background: gray-tinted (e.g., Tailwind `bg-gray-100 text-gray-900`)
- Border radius: rounded (rounded-2xl)
- Max width: 85% of conversation area
- Content types:
  - Plain text introduction (e.g., "입력하신 내용에서 다음 요구사항을 추출했습니다:")
  - Extracted item cards (one card per extracted requirement)
  - Error messages (when AI fails)

**System Message** (error/info):
- Alignment: center
- Background: yellow-tinted or red-tinted depending on type
- Full width, smaller font
- Used for errors and retry prompts

### 3.4 Extracted Item Card (within AI MessageBubble)

Each extracted item is displayed as a card within the AI response bubble.

**Card Layout**:
```
+---------------------------------------------------+
| [Theme Badge: 테마명]                              |
|                                                     |
| 요약: 요구사항 요약 텍스트                            |
|                                                     |
| 유저스토리:                                          |
| "~로서, ~하고 싶다. 왜냐하면 ~이기 때문이다."          |
|                                                     |
| 목적: 목적 설명 텍스트                               |
|                                                     |
| 인수 조건:                                          |
| - AC 1                                              |
| - AC 2                                              |
| - AC 3                                              |
|                                                     |
| [승인 (v)]  [거부 (x)]           상태: 대기 중       |
+---------------------------------------------------+
```

**States**:

| State | Visual | Controls |
|-------|--------|----------|
| Pending (대기 중) | Default card appearance, gray status text | [승인] [거부] buttons visible and enabled |
| Verified (승인됨) | Green border or green checkmark overlay, status text "승인됨" in green | Buttons replaced with "승인됨" label |
| Rejected (거부됨) | Red strikethrough or dimmed appearance, status text "거부됨" in red | Buttons replaced with "거부됨" label |

### 3.5 VerificationControls

**Approve Button (승인)**:
- Text: "승인" with checkmark icon
- Color: green variant (e.g., `bg-green-500 text-white` on hover, outlined default)
- Click action: immediately changes requirement status to "verified", saves to localStorage

**Reject Button (거부)**:
- Text: "거부" with X icon
- Color: red variant (e.g., `bg-red-500 text-white` on hover, outlined default)
- Click action: opens ConfirmDialog first, then removes item on confirmation

**Post-action**:
- After approve: button area changes to "승인됨" static label with green checkmark
- After reject: button area changes to "거부됨" static label with red X, card dims

### 3.6 ChatInput (Input Bar)

**Layout**:
- Fixed to bottom of the page (sticky bottom)
- Full width with horizontal padding
- Background: white with top border or subtle shadow
- Height: auto-expanding textarea (min 1 line, max 4 lines)

**Components (left to right)**:
1. **"새 대화" button**: Left side. Icon or text. Starts a fresh conversation.
2. **Text input**: Centered. Multi-line textarea with placeholder "요구사항을 입력해주세요..."
3. **Microphone button**: Right of text input. Triggers VoiceInput.
4. **Send button (전송)**: Far right. Arrow-up icon or "전송" text.

**Behavior**:
- Send on Enter key press (Shift+Enter for new line)
- Send button disabled when input is empty
- Send button disabled when AI is processing (isLoading)
- After sending, input field clears
- Input text is preserved if AI call fails (not cleared until success)

### 3.7 VoiceInput (Microphone Button)

**Default State**:
- Microphone icon button
- Tooltip: "음성 입력"

**Recording State**:
- Microphone icon changes to red/pulsing indicator
- Text next to button or overlay: "듣고 있습니다..."
- Click again to stop recording

**Transcription Complete**:
- Transcribed text appears in the ChatInput text field
- User can edit before sending

**Unsupported Browser**:
- Microphone button shows disabled state
- Click shows toast or inline message: "이 브라우저에서는 음성 입력이 지원되지 않습니다"

### 3.8 LoadingIndicator (AI Processing)

**Appearance**:
- Displayed as a left-aligned AI-style bubble
- Three animated bouncing dots (typing indicator)
- Optional text: "요구사항을 분석하고 있습니다..."

**Timing**:
- Appears when AI request is sent
- Disappears when AI response is received (success or error)

### 3.9 "새 대화" Button

**Location**: Left side of the ChatInput bar or as a subtle button in the conversation area header

**Behavior**:
- Click: opens ConfirmDialog "새 대화를 시작하시겠습니까? 현재 대화는 저장됩니다."
- Confirm: current conversation is saved (already in localStorage), a new empty conversation starts, WelcomeMessage is shown again
- Cancel: no action

---

## 4. Interaction Flows

### 4.1 Text Input Happy Path

1. Field staff types requirement text in ChatInput
2. Presses Enter or clicks 전송
3. User message bubble appears (right-aligned, blue)
4. LoadingIndicator appears (left-aligned, animated dots)
5. AI processes and returns extracted items
6. LoadingIndicator disappears
7. AI response bubble appears with extracted item cards
8. Each card shows summary, theme, user story, purpose, AC, and approve/reject buttons
9. Field staff clicks "승인" on correct items
10. Approved items are saved to localStorage (requirement, theme, user story records)
11. Card shows "승인됨" status

### 4.2 Voice Input Happy Path

1. Field staff clicks microphone button
2. Recording indicator appears ("듣고 있습니다...")
3. Field staff speaks the requirement
4. Transcription appears in the text input field
5. Field staff reviews and optionally edits the text
6. Field staff presses Enter or clicks 전송
7. (Continues from Text Input step 3 onward)

### 4.3 Rejection Flow

1. AI response shows extracted item cards
2. Field staff clicks "거부" on an incorrect item
3. ConfirmDialog appears: "이 항목을 거부하시겠습니까?"
4. Field staff clicks "확인"
5. Item is marked as rejected (dimmed, "거부됨" label)
6. No data is saved to localStorage for rejected items

### 4.4 Error Flow

1. Field staff sends a message
2. AI API call fails
3. LoadingIndicator disappears
4. Error message appears as a system message in the conversation
5. "다시 시도" (retry) button is displayed below the error
6. Original input text is preserved in ChatInput
7. Field staff clicks retry to re-send the same request

### 4.5 New Conversation Flow

1. Field staff clicks "새 대화"
2. ConfirmDialog: "새 대화를 시작하시겠습니까? 현재 대화는 저장됩니다."
3. Confirm: conversation area clears, WelcomeMessage appears, new conversation ID created
4. Cancel: nothing happens

---

## 5. Responsive Behavior

### Desktop (width >= 768px)
- Conversation area: centered, max-width 768px
- Message bubbles: max-width 75% (user) / 85% (AI)
- ChatInput bar: centered, max-width 768px, comfortable padding

### Mobile (width < 768px)
- Conversation area: full width, 16px horizontal padding
- Message bubbles: max-width 85% (user) / 95% (AI)
- ChatInput bar: full width, minimal padding
- Microphone button remains accessible
- On-screen keyboard: conversation area shrinks, auto-scrolls to latest message
- "새 대화" button may collapse to icon-only

---

## 6. Accessibility

- ChatInput textarea: `aria-label="요구사항 입력"`
- Send button: `aria-label="전송"`
- Microphone button: `aria-label="음성 입력"`, `aria-pressed` when recording
- Approve button: `aria-label="승인"`
- Reject button: `aria-label="거부"`
- Conversation area: `role="log"`, `aria-live="polite"` for new messages
- Focus management: after sending a message, focus remains on the input field
- Keyboard navigation: Tab moves through input, send, mic buttons; Enter sends message
