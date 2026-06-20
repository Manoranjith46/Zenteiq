import { CheckCircle2, Circle, Flag } from 'lucide-react'
import { formatDate, priorityWeight } from '../utils/format'

function AssignmentList({ assignments, onToggle, showCompleted = false }) {
  const sortedAssignments = [...assignments].sort((a, b) => a.dueDate > b.dueDate)

  return (
    <section className="panel assignment-panel">
      <div className="panel-header">
        <div>
          <h2>{showCompleted ? 'All Assignments' : 'Open Assignments'}</h2>
          <p>{assignments.length} tasks in this list</p>
        </div>
        <Flag size={22} />
      </div>

      <div className="assignment-list">
        {sortedAssignments.map((assignment) => (
          <article className={`assignment-card priority-${assignment.priority.toLowerCase()}`} key={assignment.title}>
            <button className="complete-button" onClick={() => onToggle(assignment.id)}>
              {assignment.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
            </button>
            <div>
              <h3>{assignment.title}</h3>
              <p>{assignment.course} - {assignment.owner || 'Unassigned'}</p>
              <span>Due {formatDate(assignment.dueDate)}</span>
            </div>
            <strong>{priorityWeight(assignment.priority)}</strong>
          </article>
        ))}
      </div>
    </section>
  )
}

export default AssignmentList
