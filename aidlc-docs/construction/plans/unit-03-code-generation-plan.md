# Code Generation Plan: UNIT-03 (Verification Flow)

> Date: 2026-04-22
> Unit: UNIT-03 -- Verification Flow (S)
> Stories: US-009, US-010, US-011

---

## 1. New Component: VerificationControls

- [x] Create `frontend/src/components/user/VerificationControls.jsx`
  - Props: item, onApprove, onReject
  - Pending state: show "승인" (green) and "거부" (red) buttons
  - Verified state: show green "승인됨" badge with checkmark
  - Rejected state: show gray "거부됨" badge
  - Reject button triggers ConfirmDialog before calling onReject
  - data-testid attributes on all interactive elements
- Summary: Created VerificationControls with three visual states (pending/verified/rejected). Pending shows approve/reject buttons, verified shows green badge with checkmark SVG, rejected shows gray badge. Reject uses ConfirmDialog before callback. All interactive elements have data-testid attributes.

## 2. Enhance MessageBubble.jsx

- [x] Import VerificationControls into MessageBubble.jsx
- [x] Replace verification-slot placeholder with actual VerificationControls component
  - Pass item, onApprove, onReject props from parent
  - MessageBubble now accepts onApprove(messageId, item, index) and onReject(messageId, item, index) callback props
- Summary: Imported VerificationControls into MessageBubble. Updated ExtractedItemCard to accept onApprove/onReject props. Replaced placeholder comment with actual VerificationControls rendering. Callbacks pass messageId, item, and index from MessageBubble up to parent.

## 3. Enhance UserPage.jsx -- Verification Handlers

- [x] Add verification handler logic to UserPage.jsx
  - Import useThemes and useUserStories hooks
  - Add handleApproveItem(messageId, item, index): updates requirement status to "verified", saves theme (dedup), saves user story, updates conversation extracted item status
  - Add handleRejectItem(messageId, item, index): updates conversation extracted item status to "rejected" only
  - Pass handlers down to MessageList and MessageBubble
- Summary: Added useThemes and useUserStories imports. handleApproveItem: updates requirement status to verified, saves theme with dedup, saves user story with all fields, updates conversation item status. handleRejectItem: only updates conversation item status to rejected. Both handlers passed to MessageList as onApprove/onReject props.

## 4. Enhance MessageList.jsx -- Pass Handlers

- [x] Update MessageList.jsx to accept and pass onApprove/onReject callbacks to MessageBubble
- Summary: Updated MessageList to accept onApprove and onReject props and forward them to each MessageBubble component.

## 5. Verify Existing Hooks

- [x] Verify useRequirements.js updateStatus handles processed->verified (no changes needed)
- [x] Verify useThemes.js addTheme dedup works correctly (no changes needed)
- [x] Verify useUserStories.js addUserStory accepts full fields (no changes needed)
- [x] Verify useConversation.js updateExtractedItemStatus works correctly (no changes needed)
- [x] Verify AppProvider.jsx exposes all needed state/setters (no changes needed)
- Summary: All 5 existing hooks/providers verified. useRequirements.updateStatus supports any status transition with updated_at. useThemes.addTheme deduplicates by exact name match and returns existing record. useUserStories.addUserStory accepts all required fields and sets defaults for status/system_support/timestamps. useConversation.updateExtractedItemStatus correctly updates by messageId + itemIndex. AppProvider already exposes all needed state and setter functions. No code changes required.

## 6. Build Verification

- [x] Run `npm run build` to verify zero errors
- Summary: Build succeeded. vite v6.4.2, 54 modules transformed, 0 errors, 2.81s. Output: dist/index.html (0.40 KB), index.css (16.23 KB), index.js (191.46 KB).
