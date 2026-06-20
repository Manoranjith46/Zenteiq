export const students = [
  {
    id: 1,
    name: 'Aarav Mehta',
    department: 'Computer Science',
    departmentCode: 'CSE',
    departmentLabel: 'Computer Science',
    year: 'Final Year',
    avatar: 'AM',
    progress: 72,
    attendance: 86,
    status: 'On Track',
    mentor: 'Dr. Rao',
    project: 'AI Attendance Analyzer'
  },
  {
    id: 2,
    name: 'Nisha Iyer',
    department: 'Information Technology',
    departmentCode: 'IT',
    departmentLabel: 'Information Technology',
    year: 'Final Year',
    avatar: 'NI',
    progress: 91,
    attendance: 94,
    status: 'Excellent',
    mentor: 'Prof. Shah',
    project: 'Smart Hostel Helpdesk'
  },
  {
    id: 3,
    name: 'Kabir Singh',
    department: 'Electronics',
    departmentCode: 'ECE',
    departmentLabel: 'Electronics and Communication',
    year: 'Third Year',
    avatar: 'KS',
    progress: 38,
    attendance: 62,
    status: 'Needs Help',
    mentor: 'Dr. Rao',
    project: 'IoT Energy Meter'
  },
  {
    id: 4,
    name: 'Meera Kulkarni',
    department: 'Computer Science',
    departmentCode: 'CSE',
    departmentLabel: 'Computer Science',
    year: 'Final Year',
    avatar: 'MK',
    progress: 55,
    attendance: 78,
    status: 'At Risk',
    mentor: 'Prof. Thomas',
    project: 'Library Queue Tracker'
  },
  {
    id: 5,
    name: 'Rohan Das',
    department: 'Mechanical',
    departmentCode: 'ME',
    departmentLabel: 'Mechanical Engineering',
    year: 'Final Year',
    avatar: 'RD',
    progress: 64,
    attendance: 72,
    status: 'On Track',
    mentor: 'Prof. Thomas',
    project: 'Workshop Inventory'
  },
  {
    id: 6,
    name: 'Tara Bansal',
    department: 'Information Technology',
    departmentCode: 'IT',
    departmentLabel: 'Information Technology',
    year: 'Second Year',
    avatar: 'TB',
    progress: 44,
    attendance: 88,
    status: 'Needs Help',
    mentor: 'Prof. Shah',
    project: 'Campus Lost and Found'
  }
]

export const assignments = [
  {
    id: 'a1',
    title: 'Sprint 1 Demo',
    course: 'Project Lab',
    dueDate: '2026-07-03',
    priority: 'High',
    completed: false,
    owner: 'Aarav Mehta'
  },
  {
    id: 'a2',
    title: 'UI Bug Bash Report',
    course: 'Human Computer Interaction',
    dueDate: '2026-06-25',
    priority: 'Medium',
    completed: true,
    owner: 'Nisha Iyer'
  },
  {
    id: 'a3',
    title: 'DB Schema Review',
    course: 'Database Systems',
    dueDate: '2026-06-29',
    priority: 'Low',
    completed: false,
    owner: 'Meera Kulkarni'
  },
  {
    id: 'a4',
    title: 'Deployment Checklist',
    course: 'Cloud Computing',
    dueDate: '2026-07-01',
    priority: 'High',
    completed: false,
    owner: 'Rohan Das'
  }
]

export const announcements = [
  {
    id: 101,
    title: 'Final project review schedule released',
    body: 'All teams must book their review slot before Friday evening.',
    date: '2026-06-19',
    pinned: true
  },
  {
    id: 102,
    title: 'Placement readiness mock interviews',
    body: 'Mock interviews start next week. Students should update their resumes.',
    date: '2026-06-18',
    pinned: false
  },
  {
    id: 103,
    title: 'Lab maintenance window',
    body: 'The innovation lab will be closed for maintenance on Sunday.',
    date: '2026-06-17',
    pinned: false
  }
]

export const metrics = [
  { label: 'Active Students', value: 128, trend: '+12%' },
  { label: 'Pending Reviews', value: 24, trend: '-3%' },
  { label: 'Open Bugs', value: 41, trend: '+8%' },
  { label: 'Avg Attendance', value: '82%', trend: '+5%', muted: true }
]
