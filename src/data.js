export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  CUSTOMER: 'customer',
  MANUFACTURER: 'manufacturer',
  MAINTENANCE_PROVIDER: 'maintenance_provider'
}

export const USERS = [
  { id: 1, name: 'Super Admin', role: ROLES.SUPER_ADMIN },
  { id: 2, name: 'Alice Builder', role: ROLES.CUSTOMER },
  { id: 3, name: 'LiftCo Manufacturing', role: ROLES.MANUFACTURER },
  { id: 4, name: 'ServicePro Maint', role: ROLES.MAINTENANCE_PROVIDER }
]

export const PROJECT_TYPES = {
  NEW: 'new_installation',
  RETROFIT: 'retrofit',
  SERVICE: 'service'
}

export const STAGE_DEFS = [
  { id: 1, key: 'onboarding', name: 'Customer / Builder Onboarding & Need Discovery' },
  { id: 2, key: 'requirements', name: 'Smart Requirement Form + Measurement Capture' },
  { id: 3, key: 'feasibility', name: 'Verified Survey & Feasibility Report' },
  { id: 4, key: 'broadcast', name: 'Lead Broadcast to Verified Manufacturer Pool' },
  { id: 5, key: 'ranking', name: 'AI Ranking & Top 3 Quote Presentation' },
  { id: 6, key: 'contract', name: 'Customer Selection & Tri-Party Contract' },
  { id: 7, key: 'gad', name: 'Final Technical Freeze (GAD Approval)' },
  { id: 8, key: 'production', name: 'Production & Pre-Installation Readiness' },
  { id: 9, key: 'install', name: 'Delivery, Installation & Commissioning' },
  { id: 10, key: 'handover', name: 'Handover + Digital Logbook + Lifetime Support' }
]

const STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  ON_HOLD: 'on_hold'
}

export const MOCK_PROJECTS = [
  {
    id: 101,
    name: 'Sunshine Apartments Lift',
    type: PROJECT_TYPES.NEW,
    customerId: 2,
    manufacturerId: 3,
    maintenanceId: 4,
    address: 'Sunshine Apartments, Main Street, Chennai',
    meta: {
      buildingType: 'Residential',
      capacity: '6 persons'
    },
    stages: [
      { id: 1, status: STATUS.COMPLETED, expected: '2025-11-01', actual: '2025-11-01', owner: 'Lift4M', notes: ['Requirements captured via wizard.'] },
      { id: 2, status: STATUS.COMPLETED, expected: '2025-11-04', actual: '2025-11-03', owner: 'Customer', notes: ['Architect drawings uploaded.'] },
      { id: 3, status: STATUS.IN_PROGRESS, expected: '2025-11-07', actual: null, owner: 'Lift4M Surveyor', notes: ['Survey scheduled for tomorrow.'] },
      { id: 4, status: STATUS.NOT_STARTED, expected: '2025-11-10', actual: null, owner: 'Lift4M', notes: [] },
      { id: 5, status: STATUS.NOT_STARTED, expected: '2025-11-12', actual: null, owner: 'Lift4M AI Engine', notes: [] },
      { id: 6, status: STATUS.NOT_STARTED, expected: '2025-11-15', actual: null, owner: 'Customer', notes: [] },
      { id: 7, status: STATUS.NOT_STARTED, expected: '2025-11-20', actual: null, owner: 'Manufacturer', notes: [] },
      { id: 8, status: STATUS.NOT_STARTED, expected: '2025-12-10', actual: null, owner: 'Manufacturer', notes: [] },
      { id: 9, status: STATUS.NOT_STARTED, expected: '2026-01-15', actual: null, owner: 'Manufacturer', notes: [] },
      { id: 10, status: STATUS.NOT_STARTED, expected: '2026-01-20', actual: null, owner: 'Lift4M / Maint', notes: [] }
    ]
  },
  {
    id: 102,
    name: 'Mall Escalator Service',
    type: PROJECT_TYPES.SERVICE,
    customerId: 2,
    manufacturerId: null,
    maintenanceId: 4,
    address: 'City Mall, Chennai',
    meta: {
      equipment: 'Escalator #3',
      contractType: 'AMC'
    },
    stages: [
      { id: 1, status: STATUS.COMPLETED, expected: '2025-11-01', actual: '2025-11-01', owner: 'Customer', notes: ['Breakdown ticket created.'] },
      { id: 2, status: STATUS.COMPLETED, expected: '2025-11-01', actual: '2025-11-01', owner: 'Customer', notes: ['Photos & video uploaded.'] },
      { id: 3, status: STATUS.IN_PROGRESS, expected: '2025-11-02', actual: null, owner: 'Maintenance', notes: ['Technician on the way.'] },
      { id: 8, status: STATUS.NOT_STARTED, expected: '2025-11-02', actual: null, owner: 'Maintenance', notes: [] },
      { id: 9, status: STATUS.NOT_STARTED, expected: '2025-11-03', actual: null, owner: 'Maintenance', notes: [] },
      { id: 10, status: STATUS.NOT_STARTED, expected: '2025-11-04', actual: null, owner: 'Lift4M', notes: [] }
    ]
  }
]

export function getProjectsForUser(user) {
  if (!user) return []
  if (user.role === ROLES.SUPER_ADMIN) return MOCK_PROJECTS
  if (user.role === ROLES.CUSTOMER) {
    return MOCK_PROJECTS.filter(p => p.customerId === user.id)
  }
  if (user.role === ROLES.MANUFACTURER) {
    return MOCK_PROJECTS.filter(p => p.manufacturerId === user.id)
  }
  if (user.role === ROLES.MAINTENANCE_PROVIDER) {
    return MOCK_PROJECTS.filter(p => p.maintenanceId === user.id)
  }
  return []
}

export function getStageDefinition(stageId) {
  return STAGE_DEFS.find(s => s.id === stageId)
}

export const STATUS_LABELS = {
  not_started: 'Not started',
  in_progress: 'In progress',
  completed: 'Completed',
  on_hold: 'On hold'
}

export const STATUS_COLORS = {
  not_started: 'bg-slate-400',
  in_progress: 'bg-blue-500',
  completed: 'bg-emerald-500',
  on_hold: 'bg-amber-500'
}
