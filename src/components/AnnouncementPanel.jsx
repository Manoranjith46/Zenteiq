import { Pin } from 'lucide-react'
import { formatDate } from '../utils/format'

function AnnouncementPanel({ announcements, expanded = false }) {
  const visibleAnnouncements = expanded ? announcements : announcements.slice(0, 2)

  return (
    <section className="panel announcement-panel">
      <div className="panel-header">
        <div>
          <h2>Announcements</h2>
          <p>Latest updates for project teams</p>
        </div>
        <Pin size={22} />
      </div>

      <div className="announcement-list">
        {visibleAnnouncements.map((announcement) => (
          <article className="announcement-card" key={announcement.id}>
            <div>
              <h3>{announcement.title}</h3>
              <p>{announcement.body}</p>
              <small>{formatDate(announcement.date)}</small>
            </div>
            {announcement.pinned && <span className="pin-badge">Pinned</span>}
          </article>
        ))}
      </div>
    </section>
  )
}

export default AnnouncementPanel
