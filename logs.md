## FIX-001 - App Shell Dashboard Route Comparison
- **File Changed:** `src/App.jsx`
- **Lines Modified:** Import list and dashboard conditional render
- **Original Code:** Imported unused `Menu` and `X`; rendered dashboard with `{activeTab = 'dashboard' && (...)}`, which attempted to reassign a `const` state value during JSX evaluation.
- **Fixed Code:** Removed unused `Menu` and `X` imports; changed the dashboard guard to `{activeTab === 'dashboard' && (...)}`.
- **Constraint Checklist:** No external packages added; mock data and UI copy preserved; no CSS class names changed; no direct state mutation introduced; focused build-blocking fix only.
- **Status:** SAFE TO INTEGRATE

## FIX-002 - React DOM Runtime Dependency
- **File Changed:** `package.json`, `package-lock.json`
- **Lines Modified:** Dependencies section and lockfile package entries
- **Original Code:** `src/main.jsx` imported `react-dom/client`, but `react-dom` was not listed in dependencies or installed in `node_modules`.
- **Fixed Code:** Added the missing `react-dom` runtime dependency required by React's DOM renderer.
- **Constraint Checklist:** No UI/state/router library added; no mock data or copy changed; dependency is the required React DOM renderer for the existing entrypoint; no direct state mutation introduced.
- **Status:** SAFE TO INTEGRATE

## FIX-003 - Vite Dev Server Script
- **File Changed:** `package.json`
- **Lines Modified:** Scripts section
- **Original Code:** `npm run dev` launched `nodemon --watch ./server.js --exec "node ./server.js"`, but this frontend-only Vite project has no `server.js`.
- **Fixed Code:** Updated `dev` to run `vite`, matching the existing Vite configuration and browser-based React app entrypoint.
- **Constraint Checklist:** No external packages added; no backend, router, UI kit, or state library introduced; mock data and UI copy preserved; focused startup fix only.
- **Status:** SAFE TO INTEGRATE

## FIX-004 - Sidebar Tab Navigation Targets
- **File Changed:** `src/components/Sidebar.jsx`
- **Lines Modified:** Navigation button click handler
- **Original Code:** Every sidebar button called `onChangeTab('dashboard')`, so Assignments and Announcements could never become active.
- **Fixed Code:** Added `handleTabChange(tabId)` and passed each item's own `id` to `onChangeTab`, then called `onClose()` to collapse the sidebar after mobile selection.
- **Constraint Checklist:** No external packages added; nav labels/icons/class names preserved; no mock data changed; no direct state mutation introduced; focused sidebar behavior fix only.
- **Status:** SAFE TO INTEGRATE

## FIX-005 - Mentor Announcement Posting Popup
- **File Changed:** `src/App.jsx`, `src/components/AnnouncementPanel.jsx`, `src/styles.css`
- **Lines Modified:** Announcement state wiring, expanded announcement panel action, popup form, and supporting styles
- **Original Code:** Announcements were read directly from the mock array and the Announcements page had no mentor-facing action for posting a new announcement.
- **Fixed Code:** Added announcement state initialized from mock data, an expanded-page `Add announcement` button, and a popup form that collects only the mock-data fields: `title`, `body`, `date`, and `pinned`; new entries receive a generated `id`.
- **Constraint Checklist:** No external packages added; no mock data file changed; no extra announcement fields added; existing announcement copy preserved; immutable state update used for new posts.
- **Status:** SAFE TO INTEGRATE

## FIX-006 - Announcement Pin Display And Sorting
- **File Changed:** `src/components/AnnouncementPanel.jsx`, `src/styles.css`
- **Lines Modified:** Announcement form fields, list sorting, card pin indicator, and pin styles
- **Original Code:** The popup asked mentors to choose `pinned`, pinned announcements showed a text badge only when true, and announcements rendered in insertion/mock order.
- **Fixed Code:** Removed the pin control from the popup, defaulted newly posted announcements to `pinned: false`, showed a pin icon on every announcement card with outlined/filled states, and sorted pinned announcements first with newest dates first inside each group.
- **Constraint Checklist:** No external packages added; mock data file unchanged; no extra fields added; existing announcement text preserved; sorting uses immutable array copying.
- **Status:** SAFE TO INTEGRATE

## FIX-007 - Announcement Pin Repositioning And Toggle
- **File Changed:** `src/styles.css`, `src/components/AnnouncementPanel.jsx`, `src/App.jsx`
- **Lines Modified:** Announcement card grid layout, pin button markup, pin icon transitions, and handler wiring
- **Original Code:** Pin icon was in the top-right of announcement cards. Mentors could not toggle announcement pins.
- **Fixed Code:** Moved pin icon to bottom-right using `grid-template-columns: minmax(0, 1fr) auto` and `align-items: flex-end`. Wrapped pin icon in a clickable button with `onTogglePin` handler. Added smooth 0.3s transitions on the pin icon color and 0.2s hover effect on button background.
- **Reason:** Improves UX by positioning pin at bottom-right corner of card where it doesn't overlap title/body text. Button click toggles `pinned` state immutably, re-sorts the list (pinned first), and animates color change from gray to indigo on toggle.
- **Constraint Checklist:** No external packages added; no mock data file changed; no breaking API changes; immutable state updates used; smooth CSS transitions only (no animation library).
- **Status:** SAFE TO INTEGRATE

## FIX-008 - Announcement Modal Close Button Positioning
- **File Changed:** `src/styles.css`
- **Lines Modified:** `.modal-close` button styles
- **Original Code:** Close button used `top: -12px; right: -12px;` which placed it partially outside the modal container, causing it to be misplaced and difficult to click.
- **Fixed Code:** Changed positioning to `top: 16px; right: 16px;` to place the close button inside the modal's padding area. Added flexbox centering (`display: flex; align-items: center; justify-content: center`), cursor pointer, and smooth 0.2s background hover transition.
- **Reason:** Negative positioning placed the button outside the modal where it overlapped the overlay. Positive values with padding-relative positioning keep it visible and clickable within the modal.
- **Constraint Checklist:** No external packages added; no mock data changed; only CSS styling adjusted; smooth transitions used for hover feedback.
- **Status:** SAFE TO INTEGRATE

## FIX-009 - Dashboard Hero Section Floating And Content Blur Effect
- **File Changed:** `src/styles.css`
- **Lines Modified:** `.page-section`, `.hero-card`, `.metrics-grid`, `.metric-card`, `.panel`, `.content-grid`
- **Original Code:** Dashboard lacked top spacing; hero card touched the header; scrolled content had no visual depth effect.
- **Fixed Code:** Added `margin-top: 32px` to `.page-section` for top breathing room. Added `position: relative; z-index: 5; margin-bottom: 12px;` to `.hero-card` to make it float above other content. Added `::after` pseudo-element with gradient shadow to create depth. Added `backdrop-filter: blur(0.5px)` to `.metric-card` and `.panel` to create a subtle frosted glass effect on content below the hero. Added `position: relative` to `.content-grid` for proper stacking context.
- **Reason:** Creates visual hierarchy and depth. The floating hero section with gradient shadow appears elevated. Content below has subtle blur effect when scrolling, creating a layered scrolling experience. Top spacing prevents cramped layout.
- **Constraint Checklist:** No external packages added; no mock data changed; CSS-only changes using backdrop-filter and gradients; no JavaScript added; responsive and accessible.
- **Status:** SAFE TO INTEGRATE

## FIX-010 - Announcement Duplicate Prevention With Modal Warning
- **File Changed:** `src/components/AnnouncementPanel.jsx`, `src/styles.css`
- **Lines Modified:** `handleSubmit` function validation logic, announcement popup state, warning modal JSX, warning modal styles, modal overlay styling, and scroll-lock useEffect hook
- **Original Code:** Form allowed duplicate announcements. Page remained scrollable when modals were open.
- **Fixed Code:** Added `showDuplicateWarning` state. Duplicate check uses `.some()` to compare form data against existing announcements. Changed `.modal-overlay` background to `transparent` and centered it with `justify-content: center; align-items: center`. Added `useEffect` hook that sets `document.body.style.overflow = 'hidden'` when `isPopupOpen` or `showDuplicateWarning` is true, preventing page scrolling. Cleanup function restores `overflow: auto` on unmount or when modals close.
- **Reason:** Prevents data redundancy. Transparent overlay improves visibility. Centered modal with scroll-lock focuses user attention on modal content while preventing background distraction.
- **Constraint Checklist:** No external packages added; no mock data changed; CSS and React hook-based implementation; no breaking changes to component structure.
- **Status:** SAFE TO INTEGRATE

## FIX-011 - Notification Button Functionality
- **File Changed:** `src/App.jsx`, `src/styles.css`
- **Lines Modified:** Header actions button, App state, notification JSX panel, and notification styling
- **Original Code:** Notification button was static with hardcoded "3" count and no click handler or notification display.
- **Fixed Code:** Added `showNotifications` state and notifications array with 3 sample notifications (alert, success, info types). Added onClick handler to notification button to toggle panel visibility. Created notification panel JSX that displays above header with notification list. Each notification shows type indicator, title, message, and timestamp. Added comprehensive CSS for notification panel with proper scrolling: `overflow: hidden` on panel, `overflow-y: auto` on list, custom webkit scrollbar styling for visual consistency, `flex-shrink: 0` on header to prevent collapse, `min-height: 100px` on list for minimum space.
- **Reason:** Makes notification button interactive and displays important updates to faculty mentors. Notifications include team alerts, review completions, and announcements. Smooth scrolling with styled scrollbar improves UX.
- **Constraint Checklist:** No external packages added; no mock data file modified; state-based toggle; CSS-only styling with webkit scrollbar; no router changes; responsive design maintained.
- **Status:** SAFE TO INTEGRATE

## FIX-012 - Empty State Message For Announcements
- **File Changed:** `src/components/AnnouncementPanel.jsx`, `src/styles.css`
- **Lines Modified:** Announcement list JSX rendering logic and empty-state styling
- **Original Code:** Announcement list rendered nothing when empty, leaving blank space.
- **Fixed Code:** Added conditional rendering to check if `visibleAnnouncements.length === 0`. When true, displays empty state div with "No announcements yet" title and "Create one to get started" subtitle using existing `.empty-state` CSS class.
- **Reason:** Improves UX by providing clear guidance to mentors when announcement list is empty. Better than blank space.
- **Constraint Checklist:** No external packages added; no mock data changed; CSS-only styling using existing class; no state structure changes.
- **Status:** SAFE TO INTEGRATE

## FIX-013 - Delete Announcement Functionality
- **File Changed:** `src/App.jsx`, `src/components/AnnouncementPanel.jsx`, `src/styles.css`
- **Lines Modified:** Component state for delete confirmation, delete handler, announcement card JSX with delete button, and delete button/modal styling
- **Original Code:** No way to delete announcements; delete button did not exist.
- **Fixed Code:** Added `showDeleteConfirm` state to track which announcement is being deleted. Added `handleDeleteAnnouncement` function in App.jsx that immutably filters out the deleted announcement. Added delete button (Trash2 icon) on each announcement card that triggers confirmation modal. Delete confirmation modal shows "Are you sure?" with Cancel and Delete buttons. Delete button styled in red (#dc2626) with hover effect.
- **Reason:** Allows mentors to remove outdated or incorrect announcements.
- **Constraint Checklist:** No external packages added; no mock data changed; immutable state updates; confirmation prevents accidental deletion; existing modal pattern reused.
- **Status:** SAFE TO INTEGRATE

## FIX-014 - Edit Announcement Functionality
- **File Changed:** `src/App.jsx`, `src/components/AnnouncementPanel.jsx`, `src/styles.css`
- **Lines Modified:** Component state for editing, edit handler, announcement card JSX with edit button, form modal title update, and button styling
- **Original Code:** No way to edit existing announcements; form only supported creating new ones.
- **Fixed Code:** Added `editingId` state to track which announcement is being edited. Added `handleEditClick` function that pre-fills form with announcement data and sets editing mode. Added `handleEditAnnouncement` in App.jsx that immutably updates announcement fields. Added edit button (Edit2 icon) on each announcement card. Updated form to show "Edit announcement" title and "Update announcement" button when in edit mode. Modal form reuses existing duplicate prevention for non-editing mode only.
- **Reason:** Allows mentors to fix typos or update announcement details without deleting and recreating.
- **Constraint Checklist:** No external packages added; no mock data changed; immutable state updates; form validation still applies; existing modal pattern reused.
- **Status:** SAFE TO INTEGRATE
