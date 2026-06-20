# Campus Crew - React UI Bug Fix Assignment

Campus Crew is a deliberately buggy frontend dashboard for managing final-year student project reviews. Your job is to turn this starter code into a polished, responsive, and reliable React UI.

This project has no backend. All data is stored in local mock files and component state.

## Suggested duration

Target completion time: **under 30 hours**.

## Tech stack

- React
- Vite
- CSS
- lucide-react icons
- Browser localStorage

## Your mission

Fix the UI so that the app behaves like a real faculty dashboard.

You should inspect the app carefully, use the browser console, test different screen sizes, and review component state/data flow.

## Important assignment boundaries

This is a bug-fix assignment, not a full rewrite. Make focused changes that are necessary to fix broken behavior.

Do not add authentication, backend APIs, databases, global state libraries, UI frameworks, or routing libraries. Do not replace the mock data layer. Do not rewrite approved copy, labels, data formats, CSS class names, or demo-only constants just because they look unusual.

Your `FIXES.md` should explain why each changed file needed to change. Unrelated cleanup or unexplained refactors may reduce your score.

## Expected features after fixing

### Dashboard

- App loads without crashing.
- Sidebar navigation switches between Dashboard, Assignments, and Announcements.
- Student search should work even with different casing or extra spaces.
- Department filter should correctly filter students.
- Student progress bars should reflect project progress.
- Open Assignments should show incomplete assignments only.
- Average project progress should be calculated correctly.
- Clicking a student should open the details modal.

### Assignment Planner

- Users can add an assignment using the form.
- Form fields should not erase each other while typing.
- Required field validation should be correct.
- Form should reset after a successful create.
- Assignment completion toggle should update the UI immediately.
- Assignment sorting should be predictable by due date and/or priority.

### Theme and persistence

- Theme toggle should switch between light and dark mode correctly.
- Selected theme should persist after page refresh.

### Responsive UI

- Mobile sidebar should open and close.
- Layout should be usable on mobile, tablet, and desktop.
- Tables/cards should not create unusable overflow.

### Quality expectations

- Avoid direct state mutation.
- Use stable React keys.
- Remove unused imports and obvious console noise.
- Improve basic accessibility where needed: labels, keyboard behavior, visible focus states, modal close behavior.
- Keep the visual style clean and consistent.

## Submission requirements

Submit a zip or GitHub repository containing:

1. Fixed source code.
2. A short `FIXES.md` explaining what you fixed.
3. Screenshots or a short screen recording showing the fixed dashboard, assignment planner, and mobile view.

## Optional bonus tasks

- Add a simple status summary chart without adding a chart library.
- Add keyboard support for closing the student modal with Escape.
- Add small unit tests for filtering and assignment sorting helpers.
- Improve empty states for every tab.
