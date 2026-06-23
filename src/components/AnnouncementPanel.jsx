import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Pin, Plus, X, Trash2, Edit2 } from 'lucide-react'
import { formatDate } from '../utils/format'

const initialAnnouncementForm = {
  title: '',
  body: '',
  date: ''
}

function AnnouncementPanel({ announcements, expanded = false, onCreate, onTogglePin, onDelete, onEdit }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [form, setForm] = useState(initialAnnouncementForm)
  const [error, setError] = useState('')
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)

  useEffect(() => {
    if (isPopupOpen || showDuplicateWarning) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isPopupOpen, showDuplicateWarning])

  const sortedAnnouncements = [...announcements].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
    return new Date(b.date) - new Date(a.date)
  })
  const visibleAnnouncements = expanded ? sortedAnnouncements : sortedAnnouncements.slice(0, 2)

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function closePopup() {
    setIsPopupOpen(false)
    setError('')
    setForm(initialAnnouncementForm)
    setEditingId(null)
  }

  function handleEditClick(announcement) {
    setForm({
      title: announcement.title,
      body: announcement.body,
      date: announcement.date
    })
    setEditingId(announcement.id)
    setIsPopupOpen(true)
  }

  function handleDeleteClick(id) {
    if (onDelete) {
      onDelete(id)
      setShowDeleteConfirm(null)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!form.title || !form.body || !form.date) {
      setError('Please fill every required field.')
      return
    }

    if (editingId) {
      if (onEdit) {
        onEdit(editingId, { ...form, pinned: announcements.find(a => a.id === editingId).pinned })
        closePopup()
      }
      return
    }

    const isDuplicate = announcements.some(
      (announcement) =>
        announcement.title === form.title &&
        announcement.body === form.body &&
        announcement.date === form.date
    )

    if (isDuplicate) {
      setShowDuplicateWarning(true)
      return
    }

    onCreate({ ...form, pinned: false })
    closePopup()
  }

  return (
    <section className="panel announcement-panel">
      <div className="panel-header">
        <div>
          <h2>Announcements</h2>
          <p>Latest updates for project teams</p>
        </div>
        {expanded && onCreate ? (
          <button className="primary-button inline-action" type="button" onClick={() => setIsPopupOpen(true)}>
            <Plus size={16} />
            Add announcement
          </button>
        ) : (
          <Pin size={22} />
        )}
      </div>

      <div className="announcement-list">
        {visibleAnnouncements.length === 0 ? (
          <div className="empty-state">
            <p>No announcements yet</p>
            <small>Create one to get started</small>
          </div>
        ) : (
          visibleAnnouncements.map((announcement) => (
            <article className="announcement-card" key={announcement.id}>
              <div>
                <h3>{announcement.title}</h3>
                <p>{announcement.body}</p>
                <small>{formatDate(announcement.date)}</small>
              </div>
              <div className="announcement-actions">
                {onEdit && (
                  <button
                    type="button"
                    onClick={() => handleEditClick(announcement)}
                    className="action-button"
                    aria-label="Edit announcement"
                  >
                    <Edit2 size={16} />
                  </button>
                )}
                {onDelete && (
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(announcement.id)}
                    className="action-button delete-button"
                    aria-label="Delete announcement"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onTogglePin(announcement.id)}
                  className="pin-button"
                  aria-label={announcement.pinned ? 'Unpin announcement' : 'Pin announcement'}
                >
                  <Pin
                    className={`pin-icon ${announcement.pinned ? 'pin-icon--filled' : ''}`}
                    size={20}
                    fill={announcement.pinned ? 'currentColor' : 'none'}
                  />
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      {isPopupOpen && createPortal(
        <div className="modal-overlay">
          <div className="announcement-modal" role="dialog" aria-modal="true" aria-labelledby="announcement-modal-title">
            <button className="modal-close" type="button" onClick={closePopup} aria-label="Close announcement form">
              <X size={20} />
            </button>
            <h2 id="announcement-modal-title">{editingId ? 'Edit announcement' : 'Add announcement'}</h2>
            <form className="announcement-form" onSubmit={handleSubmit}>
              <label htmlFor="announcement-title">
                Title
                <input
                  id="announcement-title"
                  value={form.title}
                  onChange={(event) => updateField('title', event.target.value)}
                  placeholder="Final project review schedule released"
                />
              </label>
              <label htmlFor="announcement-body">
                Body
                <textarea
                  id="announcement-body"
                  value={form.body}
                  onChange={(event) => updateField('body', event.target.value)}
                  placeholder="All teams must book their review slot before Friday evening."
                />
              </label>
              <label htmlFor="announcement-date">
                Date
                <input
                  id="announcement-date"
                  type="date"
                  value={form.date}
                  onChange={(event) => updateField('date', event.target.value)}
                />
              </label>
              <button className="primary-button" type="submit">{editingId ? 'Update announcement' : 'Post announcement'}</button>
            </form>
          </div>
        </div>
      , document.body)}

      {showDeleteConfirm && createPortal(
        <div className="modal-overlay">
          <div className="warning-modal" role="dialog" aria-modal="true" aria-labelledby="delete-modal-title">
            <h2 id="delete-modal-title">Delete Announcement</h2>
            <p>Are you sure you want to delete this announcement? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="secondary-button" type="button" onClick={() => setShowDeleteConfirm(null)}>
                Cancel
              </button>
              <button className="delete-confirm-button" type="button" onClick={() => handleDeleteClick(showDeleteConfirm)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      , document.body)}

      {showDuplicateWarning && createPortal(
        <div className="modal-overlay">
          <div className="warning-modal" role="dialog" aria-modal="true" aria-labelledby="warning-modal-title">
            <h2 id="warning-modal-title">Duplicate Announcement</h2>
            <p>An announcement with the same title, body, and date already exists. Please modify your announcement or cancel.</p>
            <button className="primary-button" type="button" onClick={() => setShowDuplicateWarning(false)}>
              OK
            </button>
          </div>
        </div>
      , document.body)}
    </section>
  )
}

export default AnnouncementPanel
