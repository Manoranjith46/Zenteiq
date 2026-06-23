# Component-by-Component Campus Crew Debug Plan

## Summary
Fix the app in small component passes, verifying after each pass that the current component works, stays inside README constraints, and does not introduce new build failures. No external packages, mock-data rewrites, router/global-state additions, UI-kit changes, or broad cosmetic refactors.

## Debug Order
1. **App Shell and Routing**
   - Fix `App.jsx` first because the app currently cannot build due to `activeTab = 'dashboard'`.
   - Correct tab rendering with `activeTab === 'dashboard'`.
   - Remove unused imports from `App.jsx`.
   - Fix sidebar state handoff only enough to support component testing.
   - Run `npm.cmd run build`.

2. **Sidebar Navigation**
   - Fix `Sidebar.jsx` so each button calls `onChangeTab(item.id)`.
   - Close the sidebar after selecting a tab on mobile.
   - Preserve existing nav labels, icons, and class names.
   - Verify Dashboard, Assignments, and Announcements all render.
   - Run `npm.cmd run build`.

3. **Dashboard Student Filtering**
   - Fix `App.jsx` filtering logic:
     - Search uses lowercase/trimmed comparison.
     - Department filter compares selected department to `student.department`.
     - `All` returns all departments.
   - Fix average progress calculation to use students and guard empty arrays.
   - Fix open assignments to show incomplete assignments.
   - Run `npm.cmd run build`.

4. **Student Table**
   - Fix `StudentTable.jsx`:
     - Use `student.id` as key.
     - Progress bar width uses `student.progress`.
     - Attendance displays as a percentage.
     - Rows are keyboard-accessible with `tabIndex`, `role="button"`, and Enter/Space selection.
     - Preserve existing zero-state copy.
   - Verify filtering, zero state, progress bars, and modal opening.
   - Run `npm.cmd run build`.

5. **Student Modal**
   - Fix `StudentModal.jsx`:
     - Add Escape key close support with `useEffect` cleanup.
     - Keep `role="dialog"`, `aria-modal`, and title linkage.
     - Preserve modal copy and layout classes.
   - Verify close button and Escape key behavior.
   - Run `npm.cmd run build`.

6. **Assignment Form**
   - Fix `NewAssignmentForm.jsx`:
     - Preserve fields using `setForm(prev => ({ ...prev, [field]: value }))`.
     - Required validation fails if any required field is missing.
     - Successful create resets form to initial values.
     - Add `id`/`htmlFor` label connections.
   - Verify typing does not erase fields, validation works, and create resets.
   - Run `npm.cmd run build`.

7. **Assignment List**
   - Fix `AssignmentList.jsx`:
     - Sort by due date, then priority weight for predictable ordering.
     - Use `assignment.id` as key.
     - Add aria labels to completion buttons.
     - Add empty state for no assignments.
   - Fix `App.jsx` assignment toggle with immutable `map`.
   - Verify complete/incomplete toggles update immediately.
   - Run `npm.cmd run build`.

8. **Theme Persistence**
   - Fix `useLocalStorage.js` so it writes the current value, not `initialValue`.
   - Remove direct `document.body.className` mutation from theme toggle.
   - Verify light/dark mode toggles and persists after refresh.
   - Run `npm.cmd run build`.

9. **Responsive CSS**
   - Fix `styles.css`:
     - Mobile `.sidebar.open` should translate to `0`.
     - Keep `.table-wrap` class and add robust horizontal scrolling with touch behavior.
     - Add visible focus states for buttons, inputs, selects, and clickable table rows.
     - Improve mobile layout only where needed to prevent unusable overflow.
   - Preserve existing class names and visual direction.
   - Run `npm.cmd run build`.

10. **Lint and Documentation**
   - Add ESLint 9 flat config compatibility only if needed so the existing `npm run lint` script works.
   - Run `npm.cmd run lint`.
   - Fill `logs.md` with raw technical audit entries.
   - Fill `FIXES.md` with the human-readable submission report.
   - Leave personal fields blank unless user provides name, registration number, and exact time spent.

## README Constraint Checks
- No new external packages.
- No Redux, Zustand, Context API, routing libraries, backend APIs, databases, Tailwind, Bootstrap, or UI kits.
- No mock-data cleanup or copy rewrites unless directly needed for broken behavior.
- No direct state mutation.
- Preserve existing CSS class names.
- Use focused fixes only; avoid unrelated aesthetic refactors.

## Test Plan
- After each component pass: run `npm.cmd run build`.
- Final checks:
  - `npm.cmd run build`
  - `npm.cmd run lint`
  - Manual desktop/tablet/mobile verification.
  - Browser console check.
  - Refresh/persistence check for theme.
- Manual scenarios:
  - Navigation switches all tabs.
  - Search handles casing and extra spaces.
  - Department filter works.
  - Empty student state appears.
  - Student modal opens and closes with button/Escape.
  - Assignment form validates, creates, resets.
  - Assignment toggle updates immediately.
  - Open assignments show incomplete tasks only.
  - Mobile sidebar opens/closes.
  - Tables remain usable on narrow screens.

## Assumptions
- Debugging proceeds in the exact order above.
- Implementation will stop and re-check if a component introduces a build failure.
- Optional bonus chart/unit tests are not included unless requested later, because the README’s required bug fixes come first.
