export const PRODUCT_EDITION = 'college-demo'

export const ACADEMIC_TERM_LABEL = 'AY 25-26 / Sem VII'

export const CURRENT_FACULTY_USER = {
  displayName: 'Dr. Meera Iyer',
  role: 'Faculty Coordinator',
  campusCode: 'ZQ-MENTOR-07'
}

export const REVIEW_STAGE_LABELS = ['Planning', 'Development', 'Review']

export const RISK_LIMITS = {
  progress: 60,
  attendance: 75
}

export function isAtRisk(student) {
  return student.progress < RISK_LIMITS.progress || student.attendance < RISK_LIMITS.attendance
}

export const LEGACY_ERP_STATUS_COPY = 'No matching students yet.'

export const DEMO_SYNC_DELAY_MS = 450
