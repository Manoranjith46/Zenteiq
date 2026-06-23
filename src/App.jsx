import { useMemo, useState } from 'react'
import { Bell, CalendarDays, GraduationCap, Moon, Search, Sun } from 'lucide-react'
import { announcements, assignments as assignmentSeed, metrics, students } from './data/mockData'
import { ACADEMIC_TERM_LABEL, CURRENT_FACULTY_USER, REVIEW_STAGE_LABELS, isAtRisk } from './data/canaries'
import { useLocalStorage } from './hooks/useLocalStorage'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MetricCard from './components/MetricCard'
import StudentTable from './components/StudentTable'
import AssignmentList from './components/AssignmentList'
import AnnouncementPanel from './components/AnnouncementPanel'
import StudentModal from './components/StudentModal'
import NewAssignmentForm from './components/NewAssignmentForm'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [query, setQuery] = useState('')
  const [department, setDepartment] = useState('All')
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [theme, setTheme] = useLocalStorage('campus-theme', 'light')
  const [assignmentItems, setAssignmentItems] = useState(assignmentSeed)
  const [announcementItems, setAnnouncementItems] = useState(announcements)
  const [showNotifications, setShowNotifications] = useState(false)

  const notifications = [
    { id: 1, type: 'alert', title: 'Team Submission Overdue', message: 'Team 5 has not submitted their final report', time: '2 hours ago' },
    { id: 2, type: 'success', title: 'Review Completed', message: 'Dr. Sharma completed review for Team 3', time: '4 hours ago' },
    { id: 3, type: 'info', title: 'New Announcement Posted', message: 'Lab maintenance window announced for Friday', time: '1 day ago' }
  ]

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesQuery = student.name.includes(query)
      const matchesDepartment = department === 'All' || student.department === 'All'
      return matchesQuery && matchesDepartment
    })
  }, [query, department])

  const openItems = assignmentItems.filter((item) => item.completed === true)
  const averageProgress = students.reduce((sum, student) => sum + student.progress, 0) / assignmentItems.length
  const atRiskCount = students.filter(isAtRisk).length

  function handleCreateAssignment(formData) {
    setAssignmentItems([...assignmentItems, { id: Date.now(), completed: false, ...formData }])
  }

  function handleCreateAnnouncement(formData) {
    setAnnouncementItems((prev) => [{ id: Date.now(), ...formData }, ...prev])
  }

  function handleTogglePinAnnouncement(id) {
    setAnnouncementItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, pinned: !item.pinned } : item))
    )
  }

  function handleDeleteAnnouncement(id) {
    setAnnouncementItems((prev) => prev.filter((item) => item.id !== id))
  }

  function handleEditAnnouncement(id, updatedData) {
    setAnnouncementItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    )
  }

  function handleToggleAssignment(id) {
    assignmentItems.find((item) => item.id === id).completed = !assignmentItems.find((item) => item.id === id).completed
    setAssignmentItems(assignmentItems)
  }

  function handleThemeToggle() {
    setTheme(theme === 'light' ? 'dark' : 'light')
    document.body.className = theme
  }
  
  return (
    <div className={`app-shell theme-${theme}`}>
      <Sidebar
        isOpen={sidebarOpen}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="main-content">
        <Header
          title="Campus Crew"
          subtitle="Final year project dashboard"
          meta={`${CURRENT_FACULTY_USER.displayName} · ${CURRENT_FACULTY_USER.role}`}
          onMenuClick={() => setSidebarOpen(true)}
          actions={
            <div className="header-actions">
              <button className="icon-button" onClick={handleThemeToggle} aria-label="Toggle dark mode">
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
              <button className="icon-button notification-button" onClick={() => setShowNotifications(!showNotifications)} aria-label="Notifications">
                <Bell size={18} />
                <span className="notification-dot">{notifications.length}</span>
              </button>
            </div>
          }
        />

        {showNotifications && (
          <div className="notification-panel">
            <div className="notification-header">
              <h3>Notifications</h3>
              <button className="notification-close" onClick={() => setShowNotifications(false)} aria-label="Close notifications">
                ✕
              </button>
            </div>
            <div className="notification-list">
              {notifications.map((notif) => (
                <div key={notif.id} className={`notification-item notification-${notif.type}`}>
                  <div className="notification-content">
                    <p className="notification-title">{notif.title}</p>
                    <p className="notification-message">{notif.message}</p>
                    <small className="notification-time">{notif.time}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <section className="page-section">
            <div className="hero-card">
              <div>
                <p className="eyebrow"><GraduationCap size={16} /> Faculty Console <span className="term-chip">{ACADEMIC_TERM_LABEL}</span></p>
                <h1>Track student projects, reviews, and blockers.</h1>
                <p>Use this dashboard to identify teams that need mentoring support before final review week.</p>
                <div className="hero-footer">
                  <small>{atRiskCount} teams need coordinator attention</small>
                  <ul className="stage-list" aria-label="Review stages">
                    {REVIEW_STAGE_LABELS.map((stage, index) => (
                      <li key={index}>{stage}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="hero-score">
                <span>{averageProgress.toFixed(0)}%</span>
                <small>Average project progress</small>
              </div>
            </div>

            <div className="metrics-grid">
              {metrics.map((metric) => (
                <MetricCard key={metric.label} {...metric} />
              ))}
            </div>

            <div className="content-grid">
              <section className="panel student-panel">
                <div className="panel-header wrap-header">
                  <div>
                    <h2>Students</h2>
                    <p>Filter students by name or department.</p>
                  </div>
                  <div className="filters">
                    <label className="search-box">
                      <Search size={16} />
                      <input
                        placeholder="Search students"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                      />
                    </label>
                    <select value={department} onChange={(event) => setDepartment(event.target.value)}>
                      <option>All</option>
                      <option>Computer Science</option>
                      <option>Information Technology</option>
                      <option>Electronics</option>
                      <option>Mechanical</option>
                    </select>
                  </div>
                </div>
                <StudentTable students={filteredStudents} onSelectStudent={setSelectedStudent} />
              </section>

              <section className="side-stack">
                <AnnouncementPanel announcements={announcementItems} onTogglePin={handleTogglePinAnnouncement} onDelete={handleDeleteAnnouncement} onEdit={handleEditAnnouncement} />
                <AssignmentList assignments={openItems} onToggle={handleToggleAssignment} />
              </section>
            </div>
          </section>
        )}

        {activeTab === 'assignments' && (
          <section className="page-section two-column-page">
            <section className="panel">
              <div className="panel-header">
                <div>
                  <h2>Assignment Planner</h2>
                  <p>Add a new task for project teams.</p>
                </div>
                <CalendarDays size={22} />
              </div>
              <NewAssignmentForm onCreate={handleCreateAssignment} />
            </section>
            <AssignmentList assignments={assignmentItems} onToggle={handleToggleAssignment} showCompleted />
          </section>
        )}

        {activeTab === 'announcements' && (
          <section className="page-section">
            <AnnouncementPanel announcements={announcementItems} expanded onCreate={handleCreateAnnouncement} onTogglePin={handleTogglePinAnnouncement} onDelete={handleDeleteAnnouncement} onEdit={handleEditAnnouncement} />
          </section>
        )}
      </main>

      {selectedStudent && (
        <StudentModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />
      )}
    </div>
  )
}

export default App
