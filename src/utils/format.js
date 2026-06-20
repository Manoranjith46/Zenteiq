export function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

export function priorityWeight(priority) {
  const weights = {
    High: 3,
    Medium: 2,
    Low: 1
  }
  return weights[priority] || 0
}

export function getStatusClass(status) {
  if (status === 'Excellent') return 'status-success'
  if (status === 'On Track') return 'status-info'
  if (status === 'Needs Help') return 'status-warning'
  return 'status-danger'
}
