// Status mappings
export const getStatusColor = (status) => {
  const colors = {
    'todo': 'bg-blue-100 text-blue-700',
    'in-progress': 'bg-yellow-100 text-yellow-700',
    'completed': 'bg-green-100 text-green-700',
    'pending': 'bg-yellow-100 text-yellow-700',
    'approved': 'bg-green-100 text-green-700',
    'rejected': 'bg-red-100 text-red-700'
  }
  return colors[status] || 'bg-gray-100 text-gray-700'
}

export const getStatusLabel = (status) => {
  const labels = {
    'todo': 'รอดำเนินการ',
    'in-progress': 'กำลังดำเนินการ',
    'completed': 'เสร็จสิ้น',
    'pending': 'รออนุมัติ',
    'approved': 'อนุมัติแล้ว',
    'rejected': 'ปฏิเสธ'
  }
  return labels[status] || status
}

// Priority mappings
export const getPriorityColor = (priority) => {
  const colors = {
    'low': 'border-blue-500 text-blue-600',
    'medium': 'border-yellow-500 text-yellow-600',
    'high': 'border-red-500 text-red-600'
  }
  return colors[priority] || 'border-gray-500 text-gray-600'
}

export const getPriorityLabel = (priority) => {
  const labels = {
    'low': 'ต่ำ',
    'medium': 'ปานกลาง',
    'high': 'สูง'
  }
  return labels[priority] || priority
}

// Role mappings
export const getRoleBadgeColor = (role) => {
  const colors = {
    'admin': 'bg-purple-100 text-purple-700',
    'manager': 'bg-green-100 text-green-700',
    'employee': 'bg-blue-100 text-blue-700'
  }
  return colors[role] || 'bg-gray-100 text-gray-700'
}

export const getRoleLabel = (role) => {
  const labels = {
    'admin': 'ผู้ดูแลระบบ',
    'manager': 'ผู้จัดการ',
    'employee': 'พนักงาน'
  }
  return labels[role] || role
}

// Type mappings for approvals
export const getTypeLabel = (type) => {
  const labels = {
    'leave': 'ลางาน',
    'purchase': 'จัดซื้อ',
    'budget': 'งบประมาณ',
    'other': 'อื่นๆ'
  }
  return labels[type] || type
}

// Date formatting
export const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Check if deadline is overdue
export const isOverdue = (deadline) => {
  if (!deadline) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const deadlineDate = new Date(deadline)
  return deadlineDate < today
}