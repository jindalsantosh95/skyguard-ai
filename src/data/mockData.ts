// Mock data for Aviation Regulatory Compliance Platform

export interface RegulatoryUpdate {
  id: string;
  adNumber: string;
  source: 'FAA' | 'EASA';
  title: string;
  aircraftType: string;
  complianceDeadline: string;
  mandatoryAction: string;
  status: 'new' | 'parsing' | 'analyzing' | 'implementing' | 'testing' | 'pending_approval' | 'deployed' | 'audited';
  priority: 'critical' | 'high' | 'medium' | 'low';
  publishedDate: string;
  affectedAircraft: number;
}

export interface Aircraft {
  id: string;
  registration: string;
  type: string;
  serialNumber: string;
  lastMaintenance: string;
  nextDue: string;
  status: 'operational' | 'maintenance' | 'grounded' | 'inspection';
  flightHours: number;
  cycles: number;
}

export interface WorkOrder {
  id: string;
  adNumber: string;
  aircraftId: string;
  registration: string;
  description: string;
  estimatedDowntime: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'critical' | 'high' | 'medium' | 'low';
  assignedTeam: string;
  scheduledDate: string;
  parts: string[];
}

export interface Approval {
  id: string;
  workOrderId: string;
  adNumber: string;
  role: 'Safety Engineer' | 'Maintenance Planner' | 'Compliance Manager';
  status: 'pending' | 'approved' | 'rejected';
  approver?: string;
  timestamp?: string;
  comments?: string;
}

export interface AuditPackage {
  id: string;
  adNumber: string;
  source: 'FAA' | 'EASA';
  createdAt: string;
  status: 'compiling' | 'ready' | 'exported';
  documents: string[];
  signoffs: number;
  totalSignoffs: number;
}

export interface AgentStatus {
  name: string;
  status: 'active' | 'idle' | 'processing' | 'error';
  lastActivity: string;
  processedItems: number;
  icon: string;
}

// Mock Regulatory Updates
export const mockRegulatoryUpdates: RegulatoryUpdate[] = [
  {
    id: '1',
    adNumber: 'FAA-AD-2025-001',
    source: 'FAA',
    title: 'Nose Landing Gear Torque Check Requirements',
    aircraftType: 'A320',
    complianceDeadline: '2025-06-15',
    mandatoryAction: 'Perform torque check of NLG attachment bolts within 500 flight cycles',
    status: 'pending_approval',
    priority: 'critical',
    publishedDate: '2025-01-15',
    affectedAircraft: 8
  },
  {
    id: '2',
    adNumber: 'EASA-AD-2025-0042',
    source: 'EASA',
    title: 'Wing Fuel Tank Inspection Protocol',
    aircraftType: 'B737',
    complianceDeadline: '2025-07-01',
    mandatoryAction: 'Ultrasonic inspection of wing fuel tank skin panels',
    status: 'analyzing',
    priority: 'high',
    publishedDate: '2025-01-18',
    affectedAircraft: 5
  },
  {
    id: '3',
    adNumber: 'FAA-AD-2025-003',
    source: 'FAA',
    title: 'Engine Compressor Blade Modification',
    aircraftType: 'A320neo',
    complianceDeadline: '2025-08-30',
    mandatoryAction: 'Replace compressor blades per SB-CFM-72-0089',
    status: 'implementing',
    priority: 'high',
    publishedDate: '2025-01-20',
    affectedAircraft: 3
  },
  {
    id: '4',
    adNumber: 'EASA-AD-2025-0056',
    source: 'EASA',
    title: 'Hydraulic System Pressure Relief Valve',
    aircraftType: 'B787',
    complianceDeadline: '2025-05-15',
    mandatoryAction: 'Replace hydraulic pressure relief valves',
    status: 'deployed',
    priority: 'medium',
    publishedDate: '2025-01-10',
    affectedAircraft: 2
  },
  {
    id: '5',
    adNumber: 'FAA-AD-2025-007',
    source: 'FAA',
    title: 'Cockpit Display Software Update',
    aircraftType: 'A350',
    complianceDeadline: '2025-09-01',
    mandatoryAction: 'Install software update SU-A350-PFD-2.4.1',
    status: 'new',
    priority: 'medium',
    publishedDate: '2025-01-22',
    affectedAircraft: 4
  },
  {
    id: '6',
    adNumber: 'EASA-AD-2025-0078',
    source: 'EASA',
    title: 'APU Fire Detection System Enhancement',
    aircraftType: 'A320',
    complianceDeadline: '2025-04-30',
    mandatoryAction: 'Install enhanced APU fire detection sensors',
    status: 'audited',
    priority: 'critical',
    publishedDate: '2024-12-15',
    affectedAircraft: 8
  }
];

// Mock Fleet Data
export const mockFleet: Aircraft[] = [
  {
    id: 'AC001',
    registration: 'N12345',
    type: 'A320',
    serialNumber: 'MSN-4521',
    lastMaintenance: '2025-01-10',
    nextDue: '2025-02-15',
    status: 'operational',
    flightHours: 45230,
    cycles: 28450
  },
  {
    id: 'AC002',
    registration: 'N23456',
    type: 'A320',
    serialNumber: 'MSN-4892',
    lastMaintenance: '2025-01-05',
    nextDue: '2025-02-10',
    status: 'operational',
    flightHours: 38920,
    cycles: 24120
  },
  {
    id: 'AC003',
    registration: 'N34567',
    type: 'B737',
    serialNumber: 'LN-8923',
    lastMaintenance: '2024-12-20',
    nextDue: '2025-01-25',
    status: 'maintenance',
    flightHours: 52100,
    cycles: 31200
  },
  {
    id: 'AC004',
    registration: 'N45678',
    type: 'A320neo',
    serialNumber: 'MSN-9234',
    lastMaintenance: '2025-01-15',
    nextDue: '2025-02-20',
    status: 'operational',
    flightHours: 12450,
    cycles: 8200
  },
  {
    id: 'AC005',
    registration: 'N56789',
    type: 'B787',
    serialNumber: 'LN-1045',
    lastMaintenance: '2025-01-08',
    nextDue: '2025-02-12',
    status: 'inspection',
    flightHours: 28900,
    cycles: 4520
  },
  {
    id: 'AC006',
    registration: 'N67890',
    type: 'A350',
    serialNumber: 'MSN-0892',
    lastMaintenance: '2025-01-12',
    nextDue: '2025-02-18',
    status: 'operational',
    flightHours: 18200,
    cycles: 3100
  },
  {
    id: 'AC007',
    registration: 'N78901',
    type: 'B737',
    serialNumber: 'LN-9102',
    lastMaintenance: '2024-12-28',
    nextDue: '2025-02-01',
    status: 'operational',
    flightHours: 61200,
    cycles: 42100
  },
  {
    id: 'AC008',
    registration: 'N89012',
    type: 'A320',
    serialNumber: 'MSN-5123',
    lastMaintenance: '2025-01-18',
    nextDue: '2025-02-22',
    status: 'operational',
    flightHours: 33400,
    cycles: 21800
  }
];

// Mock Work Orders
export const mockWorkOrders: WorkOrder[] = [
  {
    id: 'WO-2025-001',
    adNumber: 'FAA-AD-2025-001',
    aircraftId: 'AC001',
    registration: 'N12345',
    description: 'NLG torque check per AD requirements',
    estimatedDowntime: '4 hours',
    status: 'pending',
    priority: 'critical',
    assignedTeam: 'Team Alpha',
    scheduledDate: '2025-01-28',
    parts: ['Torque wrench calibrated', 'Locking wire']
  },
  {
    id: 'WO-2025-002',
    adNumber: 'FAA-AD-2025-001',
    aircraftId: 'AC002',
    registration: 'N23456',
    description: 'NLG torque check per AD requirements',
    estimatedDowntime: '4 hours',
    status: 'in_progress',
    priority: 'critical',
    assignedTeam: 'Team Beta',
    scheduledDate: '2025-01-26',
    parts: ['Torque wrench calibrated', 'Locking wire']
  },
  {
    id: 'WO-2025-003',
    adNumber: 'EASA-AD-2025-0042',
    aircraftId: 'AC003',
    registration: 'N34567',
    description: 'Wing fuel tank ultrasonic inspection',
    estimatedDowntime: '8 hours',
    status: 'pending',
    priority: 'high',
    assignedTeam: 'Team Alpha',
    scheduledDate: '2025-02-05',
    parts: ['Ultrasonic probe', 'Coupling gel', 'Calibration block']
  },
  {
    id: 'WO-2025-004',
    adNumber: 'FAA-AD-2025-003',
    aircraftId: 'AC004',
    registration: 'N45678',
    description: 'Engine compressor blade replacement',
    estimatedDowntime: '48 hours',
    status: 'pending',
    priority: 'high',
    assignedTeam: 'Team Engine',
    scheduledDate: '2025-02-15',
    parts: ['Compressor blades (set)', 'Blade seals', 'Retaining hardware']
  },
  {
    id: 'WO-2025-005',
    adNumber: 'EASA-AD-2025-0056',
    aircraftId: 'AC005',
    registration: 'N56789',
    description: 'Hydraulic PRV replacement',
    estimatedDowntime: '6 hours',
    status: 'completed',
    priority: 'medium',
    assignedTeam: 'Team Hydraulics',
    scheduledDate: '2025-01-20',
    parts: ['Pressure relief valve (x3)', 'O-ring seals', 'Hydraulic fluid']
  }
];

// Mock Approvals
export const mockApprovals: Approval[] = [
  {
    id: 'APR-001',
    workOrderId: 'WO-2025-001',
    adNumber: 'FAA-AD-2025-001',
    role: 'Safety Engineer',
    status: 'approved',
    approver: 'John Smith',
    timestamp: '2025-01-24T10:30:00Z',
    comments: 'Verified compliance with AD requirements'
  },
  {
    id: 'APR-002',
    workOrderId: 'WO-2025-001',
    adNumber: 'FAA-AD-2025-001',
    role: 'Maintenance Planner',
    status: 'approved',
    approver: 'Sarah Johnson',
    timestamp: '2025-01-24T14:15:00Z',
    comments: 'Resources allocated, schedule confirmed'
  },
  {
    id: 'APR-003',
    workOrderId: 'WO-2025-001',
    adNumber: 'FAA-AD-2025-001',
    role: 'Compliance Manager',
    status: 'pending'
  },
  {
    id: 'APR-004',
    workOrderId: 'WO-2025-002',
    adNumber: 'FAA-AD-2025-001',
    role: 'Safety Engineer',
    status: 'approved',
    approver: 'John Smith',
    timestamp: '2025-01-23T09:00:00Z'
  },
  {
    id: 'APR-005',
    workOrderId: 'WO-2025-002',
    adNumber: 'FAA-AD-2025-001',
    role: 'Maintenance Planner',
    status: 'pending'
  },
  {
    id: 'APR-006',
    workOrderId: 'WO-2025-003',
    adNumber: 'EASA-AD-2025-0042',
    role: 'Safety Engineer',
    status: 'pending'
  }
];

// Mock Audit Packages
export const mockAuditPackages: AuditPackage[] = [
  {
    id: 'AUD-001',
    adNumber: 'EASA-AD-2025-0078',
    source: 'EASA',
    createdAt: '2025-01-20T16:00:00Z',
    status: 'ready',
    documents: ['Original AD PDF', 'Parsed Data JSON', 'Impact Analysis', 'Work Orders', 'Completion Certificates', 'Photo Evidence'],
    signoffs: 3,
    totalSignoffs: 3
  },
  {
    id: 'AUD-002',
    adNumber: 'EASA-AD-2025-0056',
    source: 'EASA',
    createdAt: '2025-01-22T10:00:00Z',
    status: 'compiling',
    documents: ['Original AD PDF', 'Parsed Data JSON', 'Impact Analysis', 'Work Orders'],
    signoffs: 2,
    totalSignoffs: 3
  },
  {
    id: 'AUD-003',
    adNumber: 'FAA-AD-2024-089',
    source: 'FAA',
    createdAt: '2025-01-15T08:00:00Z',
    status: 'exported',
    documents: ['Original AD PDF', 'Parsed Data JSON', 'Impact Analysis', 'Work Orders', 'Completion Certificates', 'Photo Evidence', 'Audit Trail Log'],
    signoffs: 3,
    totalSignoffs: 3
  }
];

// Mock Agent Status
export const mockAgentStatus: AgentStatus[] = [
  { name: 'Detection Agent', status: 'active', lastActivity: '2 seconds ago', processedItems: 156, icon: 'radar' },
  { name: 'Parsing Agent', status: 'processing', lastActivity: 'now', processedItems: 142, icon: 'file-search' },
  { name: 'Impact Agent', status: 'active', lastActivity: '5 seconds ago', processedItems: 138, icon: 'target' },
  { name: 'Implementation Agent', status: 'idle', lastActivity: '2 minutes ago', processedItems: 89, icon: 'wrench' },
  { name: 'Testing Agent', status: 'active', lastActivity: '30 seconds ago', processedItems: 85, icon: 'check-circle' },
  { name: 'Governance Agent', status: 'processing', lastActivity: 'now', processedItems: 72, icon: 'shield' },
  { name: 'Deployment Agent', status: 'idle', lastActivity: '5 minutes ago', processedItems: 68, icon: 'rocket' },
  { name: 'Audit Agent', status: 'active', lastActivity: '1 minute ago', processedItems: 54, icon: 'clipboard' }
];

// Dashboard Stats
export const mockDashboardStats = {
  totalADs: 156,
  pendingCompliance: 12,
  completedThisMonth: 8,
  fleetSize: 8,
  operationalAircraft: 6,
  pendingWorkOrders: 4,
  pendingApprovals: 5,
  auditPackagesReady: 2,
  complianceRate: 94.2,
  avgProcessingTime: '4.2 hours'
};
