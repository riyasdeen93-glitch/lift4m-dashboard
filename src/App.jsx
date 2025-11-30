import React, { useState } from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Package,
  FileText,
  CheckCircle,
  Search,
  Bell,
  ShieldCheck,
  Hammer,
  Truck,
  FileCheck,
  BarChart3,
  Plus,
  ArrowLeft,
  LogOut,
  Star
} from 'lucide-react';

/* ------------------------------------------------------------------
   ROLES & SAMPLE USERS
-------------------------------------------------------------------*/

const ROLES = {
  ADMIN: 'Super Admin',
  CUSTOMER: 'Customer',
  MANUFACTURER: 'Manufacturer',
  MAINTENANCE: 'Maintenance Provider'
};

const SAMPLE_CREDENTIALS = [
  { role: ROLES.ADMIN, name: 'Super Admin', email: 'admin@test.com', pass: '123' },
  { role: ROLES.CUSTOMER, name: 'Builder Inc.', email: 'builder@test.com', pass: '123' },
  { role: ROLES.MANUFACTURER, name: 'Alpha Lifts (Mfr A)', email: 'alpha@test.com', pass: '123', id: 'mfr-a' },
  { role: ROLES.MANUFACTURER, name: 'Beta Elevators (Mfr B)', email: 'beta@test.com', pass: '123', id: 'mfr-b' },
  { role: ROLES.MANUFACTURER, name: 'Gamma Corp (Mfr C)', email: 'gamma@test.com', pass: '123', id: 'mfr-c' },
  { role: ROLES.MANUFACTURER, name: 'Delta Lifts (Mfr D)', email: 'delta@test.com', pass: '123', id: 'mfr-d' },
  { role: ROLES.MAINTENANCE, name: 'Service Pro', email: 'service@test.com', pass: '123' }
];

/* ------------------------------------------------------------------
   10-STAGE BACKBONE (UPDATED: SURVEY AFTER TOP-3 QUOTES)
-------------------------------------------------------------------*/

const CORE_STAGES = [
  {
    id: 1,
    key: 'onboarding',
    title: 'Stage 1 — Customer / Builder Onboarding & Need Discovery',
    shortLabel: 'Signed Up',
    platformLabel: 'Signed Up ✔',
    icon: <Search size={16} />
  },
  {
    id: 2,
    key: 'requirements',
    title: 'Stage 2 — Smart Requirement Form + Measurement Capture',
    shortLabel: 'Requirements Submitted',
    platformLabel: 'Requirements Submitted',
    icon: <ClipboardList size={16} />
  },
  {
    id: 3,
    key: 'broadcast',
    title: 'Stage 3 — Lead Broadcast to Verified Manufacturer Pool',
    shortLabel: 'Lead Broadcast',
    platformLabel: 'Lead Broadcast to Manufacturers',
    icon: <Users size={16} />
  },
  {
    id: 4,
    key: 'top3',
    title: 'Stage 4 — AI Ranking & Top 3 Quote Presentation',
    shortLabel: 'Top 3 Quotes',
    platformLabel: 'Top 3 Quotes Ready',
    icon: <BarChart3 size={16} />
  },
  {
    id: 5,
    key: 'survey',
    title: 'Stage 5 — Verified Survey & Feasibility Report (Lift4M)',
    shortLabel: 'Survey & Feasibility',
    platformLabel: 'Survey Completed • Feasibility Passed',
    icon: <FileCheck size={16} />
  },
  {
    id: 6,
    key: 'contract',
    title: 'Stage 6 — Customer Selection & Tri-Party Contract',
    shortLabel: 'Contract Signed',
    platformLabel: 'Contract Signed',
    icon: <FileText size={16} />
  },
  {
    id: 7,
    key: 'gad',
    title: 'Stage 7 — Final Technical Freeze (GAD Approval)',
    shortLabel: 'GAD Approved',
    platformLabel: 'GAD Approved',
    icon: <CheckCircle size={16} />
  },
  {
    id: 8,
    key: 'production',
    title: 'Stage 8 — Production & Pre-Installation Readiness',
    shortLabel: 'Production',
    platformLabel: 'Production Started',
    icon: <Hammer size={16} />
  },
  {
    id: 9,
    key: 'installation',
    title: 'Stage 9 — Delivery, Installation & Commissioning',
    shortLabel: 'Installation',
    platformLabel: 'Installation / Commissioning',
    icon: <Truck size={16} />
  },
  {
    id: 10,
    key: 'handover',
    title: 'Stage 10 — Handover + Digital Logbook + Lifetime Support',
    shortLabel: 'Handover & AMC',
    platformLabel: 'Handover Complete • AMC Active',
    icon: <ShieldCheck size={16} />
  }
];

const STAGE_META = {
  1: {
    objective: 'Get the customer / builder onboarded and clarify what kind of project this is.',
    keyPoints: [
      'Guided product selector: home, stilt + 4, apartment, commercial.',
      'Capture preferences for brands, cabin styles, door types and price bands.',
      'Rule-based prompts to check 3-phase power feasibility.',
      'Pre-warning about regulatory / licensing requirements.'
    ],
    whatsNext: 'Move to Stage 2 to capture shaft dimensions or upload drawings.'
  },
  2: {
    objective:
      'Capture all technical requirements and any existing data the customer has, including shaft geometry and power constraints.',
    keyPoints: [
      'Customer enters shaft width/depth, pit depth, headroom height, or uploads floor plans.',
      'Guided explanation with 2D visuals for shaft, pit and headroom so non-technical users understand what to measure.',
      'Upload photos, videos, voice notes for context.',
      'Placeholder for AI: auto-extract shaft dimensions from drawings.'
    ],
    whatsNext:
      'Once initial data looks reasonable, broadcast the requirement to the verified manufacturer pool (Stage 3).'
  },
  3: {
    objective:
      'Share a standardized opportunity with the right manufacturer pool using the initial data from the customer.',
    keyPoints: [
      'Broadcast only to verified, onboarded manufacturers based on geography & capacity.',
      'Manufacturers see standardized technical sheet and constraints based on customer inputs.',
      'Proposals must comply with IS 17900-1 & 17900-2 and transparent cost breakup.',
      'Warranty expectations and lead time window are clearly defined.'
    ],
    whatsNext:
      'Manufacturers submit proposals; AI prepares Top 3 best-fit options for the builder (Stage 4).'
  },
  4: {
    objective:
      'Help the customer decide quickly without being overwhelmed, before committing to a detailed physical survey.',
    keyPoints: [
      'Algorithm ranks proposals on Lift4M-controlled rating, lead time, warranty & total cost of ownership.',
      'AMC charges and emergency response SLAs get extra weight.',
      'Customer sees only the Top 3 in a clean comparison table including drive type and key specs.',
      'Hidden-cost checks flag surprises and non-compliant proposals.'
    ],
    whatsNext:
      'Once a preferred option is shortlisted, schedule Lift4M survey for parameter validation (Stage 5).'
  },
  5: {
    objective:
      'Lift4M-authorised technician validates all inputs before contract, protecting both customer and manufacturer.',
    keyPoints: [
      'Confirm shaft / pit / headroom dimensions versus manufacturer proposal.',
      'Check structural constraints and power backup feasibility.',
      'Verify electrical readiness (main failure point in many homes).',
      'Capture photos, GPS/time-stamped measurements and assign risk grading (Green / Amber / Red).'
    ],
    whatsNext:
      'After survey approval by Lift4M Super Admin, proceed to tri-party contract and escrow payments (Stage 6).'
  },
  6: {
    objective: 'Convert the chosen proposal into a trusted, tri-party agreement.',
    keyPoints: [
      'Contract between Customer, Lift4M marketplace and Manufacturer.',
      'Covers deadlines, safety standards, warranty and AMC obligations.',
      'Escrow-linked payment milestones build trust.',
      'Digital acceptance / e-sign placeholders for future integration.'
    ],
    whatsNext: 'After contract + escrow, GAD design freeze begins (Stage 7).'
  },
  7: {
    objective: 'Lock down the final technical solution and get everyone’s sign-off.',
    keyPoints: [
      'Manufacturer uploads GAD drawings.',
      'Approvals tracked across Customer, Architect, Builder and MEP engineer.',
      'Lift license documentation (Form A/C/F) can be assisted and tracked.',
      'Automated reminders nudge stakeholders when approvals are pending.'
    ],
    whatsNext:
      'When GAD is approved and first payment is cleared, production starts (Stage 8).'
  },
  8: {
    objective: 'Ensure production and site are both ready before material moves.',
    keyPoints: [
      'Track production ETA, serial numbers and material readiness.',
      'Factory QC status logged before dispatch.',
      'Joint Readiness Certificate (JRC) confirms civil & electrical readiness.',
      'Surface risks around site readiness early.'
    ],
    whatsNext: 'Material dispatch and installation milestones start (Stage 9).'
  },
  9: {
    objective: 'Track every sub-step of installation and commissioning.',
    keyPoints: [
      'Milestones: dispatch, delivery, rails, machine, doors, cabin, wiring, testing.',
      'Every sub-stage has photos, timestamps and QC checklists.',
      'Lift4M approval is required before moving to the next gate.',
      'Commissioning includes load test, safety circuits and ARD test.'
    ],
    whatsNext:
      'After commissioning, move to handover & lifetime support (Stage 10).'
  },
  10: {
    objective: 'Complete the project and set up long-term service & AMC visibility.',
    keyPoints: [
      'Operating license assistance and documentation stored in digital logbook.',
      'Warranty activation and AMC plan details are visible to the customer.',
      'Emergency support channels and SLA timers for breakdowns.',
      'Lift card shows status, AMC schedule and next visit.'
    ],
    whatsNext: 'Ongoing lifecycle: service tickets, AMC renewals and SLA tracking.'
  }
};

/* ------------------------------------------------------------------
   INITIAL PRODUCT MASTER (RICH SPEC)
-------------------------------------------------------------------*/

const INITIAL_PRODUCTS = [
  {
    id: 'p1',
    mfrId: 'mfr-a',
    name: 'Alpha Glide 3000',
    liftType: 'Passenger',
    driveType: 'MRL Traction',
    capacity: '6 persons / 408 kg',
    speed: '1.0 m/s',
    stopsRange: 'G+7',
    doorType: 'Automatic centre opening',
    machineRoom: 'MRL (machine-room-less)',
    pitRequired: '1500 mm',
    headroomRequired: '4500 mm',
    basePrice: 1200000,
    warrantyYears: 2,
    usp: 'Reliable mid-rise passenger solution with low energy use.'
  },
  {
    id: 'p2',
    mfrId: 'mfr-b',
    name: 'Beta Max Load',
    liftType: 'Freight',
    driveType: 'Traction',
    capacity: '2000 kg',
    speed: '0.5 m/s',
    stopsRange: 'G+3',
    doorType: 'Manual swing / vertical bi-parting',
    machineRoom: 'Machine room on top',
    pitRequired: '1600 mm',
    headroomRequired: '4700 mm',
    basePrice: 1800000,
    warrantyYears: 1,
    usp: 'Heavy-duty freight lift built for warehouses.'
  },
  {
    id: 'p3',
    mfrId: 'mfr-c',
    name: 'Gamma Eco Home',
    liftType: 'Home Lift',
    driveType: 'Hydraulic',
    capacity: '4 persons / 320 kg',
    speed: '0.3 m/s',
    stopsRange: 'G+3',
    doorType: 'Swing or automatic telescopic',
    machineRoom: 'Compact machine room',
    pitRequired: '200 mm',
    headroomRequired: '2600 mm',
    basePrice: 950000,
    warrantyYears: 2,
    usp: 'Low pit & headroom – ideal for villas and retrofits.'
  },
  {
    id: 'p4',
    mfrId: 'mfr-d',
    name: 'Delta High Speed',
    liftType: 'Passenger',
    driveType: 'Gearless Traction',
    capacity: '10 persons / 680 kg',
    speed: '1.75 m/s',
    stopsRange: 'G+15',
    doorType: 'Automatic centre opening',
    machineRoom: 'MRL',
    pitRequired: '1700 mm',
    headroomRequired: '5000 mm',
    basePrice: 2200000,
    warrantyYears: 3,
    usp: 'Premium high-rise passenger lift with smooth ride.'
  }
];

/* ------------------------------------------------------------------
   LIFT4M RATING (SUPER ADMIN CONTROLLED)
-------------------------------------------------------------------*/

const INITIAL_MFR_RATINGS = {
  'mfr-a': { id: 'mfr-a', name: 'Alpha Lifts', score: 4.4, totalReviews: 112 },
  'mfr-b': { id: 'mfr-b', name: 'Beta Elevators', score: 4.1, totalReviews: 87 },
  'mfr-c': { id: 'mfr-c', name: 'Gamma Corp', score: 4.6, totalReviews: 65 },
  'mfr-d': { id: 'mfr-d', name: 'Delta Lifts', score: 4.3, totalReviews: 54 }
};

/* ------------------------------------------------------------------
   HELPERS
-------------------------------------------------------------------*/

const formatINR = (val) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);

const RatingBadge = ({ score, totalReviews }) => {
  if (!score) return null;
  const fullStars = Math.floor(score);
  const halfStar = score - fullStars >= 0.5;
  const stars = [];
  for (let i = 0; i < fullStars; i++) stars.push('full');
  if (halfStar) stars.push('half');
  while (stars.length < 5) stars.push('empty');

  return (
    <div className="inline-flex items-center gap-1 text-[11px] bg-amber-50 text-amber-700 px-2 py-1 rounded-full">
      <div className="flex">
        {stars.map((s, idx) => (
          <Star
            key={idx}
            size={12}
            className={
              s === 'empty'
                ? 'text-slate-300'
                : s === 'half'
                ? 'text-amber-400 opacity-70'
                : 'text-amber-500'
            }
            fill={s === 'empty' ? 'none' : 'currentColor'}
          />
        ))}
      </div>
      <span className="font-semibold">{score.toFixed(1)}</span>
      <span className="text-slate-400">• {totalReviews} Google reviews</span>
    </div>
  );
};

/* ------------------------------------------------------------------
   REUSABLE UI PIECES
-------------------------------------------------------------------*/

const StatusBadge = ({ status }) => {
  const styles = {
    Active: 'bg-emerald-100 text-emerald-800',
    Pending: 'bg-amber-100 text-amber-800',
    'Requirements Submitted': 'bg-amber-50 text-amber-700',
    'Survey Scheduled': 'bg-amber-50 text-amber-700',
    Bidding: 'bg-blue-100 text-blue-800',
    Quoted: 'bg-purple-100 text-purple-800',
    'Action Required': 'bg-red-100 text-red-800',
    Completed: 'bg-slate-100 text-slate-800',
    Accepted: 'bg-green-100 text-green-800',
    Rejected: 'bg-red-50 text-red-400',
    Submitted: 'bg-blue-50 text-blue-600',
    Contract: 'bg-slate-800 text-white',
    'GAD Approval': 'bg-indigo-50 text-indigo-700',
    Production: 'bg-sky-50 text-sky-700',
    Installation: 'bg-teal-50 text-teal-700'
  };
  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-bold ${
        styles[status] || styles['Pending']
      }`}
    >
      {status}
    </span>
  );
};

const Timeline = ({ activeStage }) => (
  <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm overflow-x-auto mb-4">
    <h3 className="font-bold text-sm text-slate-500 uppercase mb-6 tracking-wider">
      Live Project Status
    </h3>
    <div className="flex items-center min-w-[880px]">
      {CORE_STAGES.map((stage, idx) => {
        const isActive = stage.id === activeStage;
        const isCompleted = stage.id < activeStage;
        return (
          <div key={stage.id} className="relative flex-1 group">
            <div className="flex flex-col items-center z-10 relative">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                  isActive
                    ? 'bg-emerald-600 border-emerald-600 text-white scale-110 shadow-lg'
                    : isCompleted
                    ? 'bg-emerald-100 border-emerald-500 text-emerald-700'
                    : 'bg-white border-slate-200 text-slate-300'
                }`}
              >
                {isCompleted ? <CheckCircle size={14} /> : stage.id}
              </div>
              <span
                className={`text-[10px] mt-2 font-medium text-center absolute top-8 w-28 ${
                  isActive
                    ? 'text-emerald-700 font-bold'
                    : isCompleted
                    ? 'text-emerald-600'
                    : 'text-slate-400'
                }`}
              >
                {stage.shortLabel}
              </span>
            </div>
            {idx !== CORE_STAGES.length - 1 && (
              <div
                className={`absolute top-4 left-1/2 w-full h-1 -translate-y-1/2 -z-0 ${
                  isCompleted ? 'bg-emerald-500' : 'bg-slate-100'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  </div>
);

const StageInfoPanel = ({ stageNumber }) => {
  const meta = STAGE_META[stageNumber];
  const core = CORE_STAGES.find((s) => s.id === stageNumber);
  if (!meta || !core) return null;

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 mb-4">
      <h3 className="text-sm font-bold text-slate-900 mb-1">{core.title}</h3>
      <p className="text-xs text-slate-500 mb-3">{meta.objective}</p>
      <ul className="list-disc pl-4 space-y-1 text-xs text-slate-600">
        {meta.keyPoints.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
      <p className="text-[11px] text-slate-500 mt-3">
        <span className="font-semibold">What’s next:</span> {meta.whatsNext}
      </p>
    </div>
  );
};

/* ------------------------------------------------------------------
   SIMPLE 2D SHAFT DIAGRAM (EDUCATIONAL)
-------------------------------------------------------------------*/

const ShaftDiagram = () => (
  <div className="mt-4 bg-slate-50 border border-slate-200 rounded-lg p-4 text-[11px] text-slate-600">
    <p className="font-semibold mb-2">How to read the lift shaft dimensions</p>
    <div className="flex flex-col md:flex-row gap-4 items-center">
      {/* diagram box */}
      <div className="relative w-56 h-40 bg-white border border-slate-300 rounded">
        {/* shaft outline */}
        <div className="absolute inset-6 border border-emerald-400 rounded-sm">
          <span className="absolute inset-x-0 -top-4 text-center text-[10px]">
            Shaft (internal clear size)
          </span>
        </div>
        {/* width arrow */}
        <div className="absolute left-8 right-8 bottom-4 h-0.5 bg-slate-300">
          <div className="absolute -left-1 -top-1 w-2 h-2 border-l border-t border-slate-400 rotate-45" />
          <div className="absolute -right-1 -top-1 w-2 h-2 border-r border-b border-slate-400 rotate-45" />
          <span className="absolute left-1/2 -translate-x-1/2 -top-4">
            Width (mm)
          </span>
        </div>
        {/* depth arrow */}
        <div className="absolute top-8 bottom-8 right-4 w-0.5 bg-slate-300">
          <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-slate-400 rotate-45" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-l border-slate-400 rotate-45" />
          <span className="absolute -right-16 top-1/2 -translate-y-1/2">
            Depth (mm)
          </span>
        </div>
        {/* pit & headroom labels */}
        <span className="absolute left-2 bottom-1">Pit depth ↓</span>
        <span className="absolute left-2 top-1">Headroom height ↑</span>
      </div>
      {/* text help */}
      <div className="flex-1 space-y-1">
        <p>
          <b>Shaft width</b> – clear distance between left and right wall inside
          the lift shaft.
        </p>
        <p>
          <b>Shaft depth</b> – clear distance from front door wall to back wall.
        </p>
        <p>
          <b>Pit depth</b> – depth from finished floor level down to pit bottom.
        </p>
        <p>
          <b>Headroom</b> – height from top landing floor level to structural
          roof/beam above the lift.
        </p>
        <p className="text-[10px] text-slate-500">
          Tip: Your architect/structural drawing will usually mark these as
          “Lift Shaft” or “Elevator Shaft” with pit &amp; headroom notes.
        </p>
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------
   LOGIN / AUTH
-------------------------------------------------------------------*/

const LoginPage = ({ onLogin }) => (
  <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row min-h-[600px]">
      <div className="md:w-1/2 bg-slate-900 text-white p-12 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-emerald-500 p-2 rounded">
              <Package size={28} />
            </div>
            <span className="text-3xl font-bold tracking-tight">Lift4M</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Marketplace &amp; Project Mgmt
          </h1>
          <p className="text-slate-400">
            Platform for Builders, Manufacturers &amp; Service Teams.
          </p>
        </div>
      </div>
      <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
        <h2 className="text-xl font-bold mb-6">Select a Role to Simulate</h2>
        <div className="space-y-3">
          {SAMPLE_CREDENTIALS.map((cred, idx) => (
            <button
              key={idx}
              onClick={() => onLogin(cred)}
              className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition group"
            >
              <div className="text-left">
                <p className="font-bold text-slate-800">{cred.name}</p>
                <p className="text-xs text-slate-500">{cred.role}</p>
              </div>
              <div className="text-emerald-600 opacity-0 group-hover:opacity-100 font-bold text-sm">
                Login &rarr;
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------
   SUPER ADMIN DASHBOARD (NOW CONTROLS RATINGS)
-------------------------------------------------------------------*/

const SuperAdminDashboard = ({ projects, quotes, mfrRatings, setMfrRatings }) => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedProject, setSelectedProject] = useState(null);

  const totalValue = quotes
    .filter((q) => q.status === 'Accepted')
    .reduce((acc, curr) => acc + curr.price, 0);
  const potentialValue = quotes
    .filter((q) => q.status === 'Submitted')
    .reduce((acc, curr) => acc + curr.price, 0);
  const activeBids = quotes.filter((q) => q.status === 'Submitted').length;

  const allLogs = projects
    .flatMap((p) =>
      (p.auditLogs || []).map((log) => ({
        ...log,
        projectName: p.name,
        projectId: p.id
      }))
    )
    .sort((a, b) => b.id - a.id);

  const handleRatingChange = (id, newScore) => {
    setMfrRatings((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || {}), score: Number(newScore) }
    }));
  };

  if (selectedProject) {
    const projectQuotes = quotes.filter((q) => q.projectId === selectedProject.id);
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedProject(null)}
          className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1"
        >
          <ArrowLeft size={16} /> Back to Admin Dashboard
        </button>
        <div className="bg-slate-900 text-white p-4 rounded-lg flex justify-between items-center">
          <h2 className="text-xl font-bold">Admin Audit: {selectedProject.name}</h2>
          <span className="text-xs bg-slate-700 px-2 py-1 rounded">
            ID: {selectedProject.id}
          </span>
        </div>
        <Timeline activeStage={selectedProject.stage} />
        <StageInfoPanel stageNumber={selectedProject.stage} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold mb-4">Quotes Received</h3>
            <table className="w-full text-sm text-left">
              <thead>
                <tr>
                  <th className="pb-2">Mfr</th>
                  <th className="pb-2">Price</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {projectQuotes.map((q) => (
                  <tr key={q.id} className="border-t">
                    <td className="py-2">{q.mfrName}</td>
                    <td className="py-2 font-mono">{formatINR(q.price)}</td>
                    <td className="py-2">
                      <StatusBadge status={q.status} />
                    </td>
                  </tr>
                ))}
                {projectQuotes.length === 0 && (
                  <tr>
                    <td colSpan="3" className="py-4 text-center text-slate-400">
                      No quotes yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="bg-white p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold mb-4">Detailed Audit Log</h3>
            <div className="max-h-60 overflow-y-auto space-y-3">
              {(selectedProject.auditLogs || []).map((log) => (
                <div
                  key={log.id}
                  className="text-sm border-l-2 border-slate-200 pl-3"
                >
                  <p className="font-medium text-slate-800">{log.action}</p>
                  <div className="flex justify-between mt-1 text-xs text-slate-500">
                    <span>By: {log.user}</span>
                    <span>{log.timestamp}</span>
                  </div>
                </div>
              ))}
              {(!selectedProject.auditLogs ||
                selectedProject.auditLogs.length === 0) && (
                <p className="text-xs text-slate-400">
                  No audit entries yet for this project.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const ratingList = Object.values(mfrRatings);

  return (
    <div className="space-y-6">
      <div className="flex gap-4 border-b border-slate-200">
        {['Overview', 'Projects', 'Transactions', 'Manufacturers'].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${
              activeTab === t
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === 'Overview' && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-700">Macro Platform View</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 uppercase font-bold mb-1">
                Total Platform Value
              </p>
              <p className="text-2xl font-bold text-emerald-600">
                {formatINR(totalValue)}
              </p>
              <p className="text-xs text-slate-400 mt-2">Realized Revenue</p>
            </div>
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 uppercase font-bold mb-1">
                Pipeline Value
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {formatINR(potentialValue)}
              </p>
              <p className="text-xs text-slate-400 mt-2">Open Bids</p>
            </div>
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 uppercase font-bold mb-1">
                Active Projects
              </p>
              <p className="text-2xl font-bold text-slate-800">
                {projects.length}
              </p>
              <p className="text-xs text-slate-400 mt-2">Across all stages</p>
            </div>
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 uppercase font-bold mb-1">
                Bidding Activity
              </p>
              <p className="text-2xl font-bold text-purple-600">
                {activeBids}
              </p>
              <p className="text-xs text-slate-400 mt-2">Quotes Submitted</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800">
                  Recent Transactions (Micro View)
                </h3>
              </div>
              <div className="space-y-4">
                {allLogs.slice(0, 5).map((log, i) => (
                  <div
                    key={i}
                    className="flex gap-3 text-sm border-b border-slate-50 last:border-0 pb-2"
                  >
                    <div className="mt-1">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-800">{log.action}</p>
                      <p className="text-xs text-slate-500">
                        Project: {log.projectName} • User: {log.user}
                      </p>
                    </div>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">
                      {log.timestamp.split(',')[1]}
                    </span>
                  </div>
                ))}
                {allLogs.length === 0 && (
                  <p className="text-slate-400 text-center py-4">
                    No transactions recorded yet.
                  </p>
                )}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4">
                Manufacturer Leaderboard
              </h3>
              <div className="space-y-3">
                {ratingList.map((mfr) => {
                  const mfrQuotes = quotes.filter((q) => q.mfrId === mfr.id);
                  const wins = mfrQuotes.filter((q) => q.status === 'Accepted').length;
                  return (
                    <div
                      key={mfr.id}
                      className="flex justify-between items-center p-3 bg-slate-50 rounded"
                    >
                      <div>
                        <span className="font-medium text-sm block">
                          {mfr.name}
                        </span>
                        <RatingBadge
                          score={mfr.score}
                          totalReviews={mfr.totalReviews}
                        />
                      </div>
                      <div className="text-xs flex flex-col items-end gap-1">
                        <span className="text-slate-500">
                          {mfrQuotes.length} Quotes
                        </span>
                        <span className="font-bold text-emerald-600">
                          {wins} Wins
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Projects' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
              <tr>
                <th className="p-4">Project ID</th>
                <th className="p-4">Project Name</th>
                <th className="p-4">Client</th>
                <th className="p-4">Stage</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="p-4 font-mono text-slate-500">{p.id}</td>
                  <td className="p-4 font-medium text-slate-800">{p.name}</td>
                  <td className="p-4">{p.client}</td>
                  <td className="p-4">Stage {p.stage}</td>
                  <td className="p-4">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => setSelectedProject(p)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-xs flex items-center gap-1"
                    >
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-400">
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'Transactions' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold mb-4">Complete Transaction Log</h3>
          <div className="space-y-0 divide-y divide-slate-100">
            {allLogs.map((log, i) => (
              <div
                key={i}
                className="py-3 flex justify-between items-center hover:bg-slate-50 px-2 rounded transition"
              >
                <div className="flex gap-4 items-center">
                  <div className="text-xs font-mono text-slate-400 w-32">
                    {log.timestamp}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{log.action}</p>
                    <p className="text-xs text-slate-500">
                      User: {log.user} • Project: {log.projectName} ({log.projectId})
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  {log.action.includes('Quote Received') && (
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                      Bid
                    </span>
                  )}
                  {log.action.includes('Created') && (
                    <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded">
                      New
                    </span>
                  )}
                </div>
              </div>
            ))}
            {allLogs.length === 0 && (
              <p className="text-center text-slate-400">No transactions recorded.</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'Manufacturers' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 className="font-bold mb-4">Lift4M Rating Control</h3>
          <p className="text-xs text-slate-500 mb-4">
            These ratings are used in the AI ranking engine and shown to builders
            during bidding. They can be derived from Google Reviews + internal
            quality metrics.
          </p>
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="p-2">Manufacturer</th>
                <th className="p-2">Rating</th>
                <th className="p-2">Google Reviews</th>
              </tr>
            </thead>
            <tbody>
              {ratingList.map((mfr) => (
                <tr key={mfr.id} className="border-t">
                  <td className="p-2">{mfr.name}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        value={mfr.score}
                        onChange={(e) => handleRatingChange(mfr.id, e.target.value)}
                        className="w-16 border rounded px-1 py-0.5 text-xs"
                      />
                      <RatingBadge
                        score={mfr.score}
                        totalReviews={mfr.totalReviews}
                      />
                    </div>
                  </td>
                  <td className="p-2 text-xs text-slate-500">
                    {mfr.totalReviews} Google reviews
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------
   CUSTOMER FLOW – RICH WIZARD WITH DRIVE TYPE & DIAGRAM
-------------------------------------------------------------------*/

const CustomerWizard = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    type: '',
    location: '',
    floors: '',
    capacity: '',
    shaftAvailable: '',
    machineRoom: '',
    width: '',
    depth: '',
    pitDepth: '',
    headroom: '',
    drivePreference: '',
    planFileName: ''
  });

  const update = (k, v) => setData((prev) => ({ ...prev, [k]: v }));
  const next = () => setStep((s) => s + 1);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg border border-slate-200 p-8 my-8">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="font-bold text-lg">
          Stages 1–2: Onboarding, Selection Guide &amp; Measurement Capture
        </h2>
        <span className="text-xs bg-slate-100 px-2 py-1 rounded">
          Step {step}/6
        </span>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800">
            What kind of building is this for?
          </h3>
          <p className="text-xs text-slate-500">
            This helps us pick the right lift family and safety codes.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {['Residential', 'Stilt + 4', 'Apartment Block', 'Commercial'].map(
              (t) => (
                <button
                  key={t}
                  onClick={() => {
                    update('type', t);
                    next();
                  }}
                  className="p-4 border rounded hover:border-emerald-500 text-sm text-left"
                >
                  {t}
                </button>
              )
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800">
            Elevator type &amp; drive preference
          </h3>
          <p className="text-xs text-slate-500">
            A quick guide so manufacturers receive more precise requirements.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => {
                update('drivePreference', 'Pneumatic');
                next();
              }}
              className="p-4 border rounded hover:border-emerald-500 text-left text-xs space-y-1"
            >
              <p className="font-semibold text-sm">Pneumatic / Vacuum</p>
              <p>Ideal for small home lifts with minimal pit/headroom.</p>
              <p>Typically lower capacity &amp; speed.</p>
            </button>
            <button
              onClick={() => {
                update('drivePreference', 'Hydraulic');
                next();
              }}
              className="p-4 border rounded hover:border-emerald-500 text-left text-xs space-y-1"
            >
              <p className="font-semibold text-sm">Hydraulic</p>
              <p>Good for villas &amp; low-rise, tolerant to low pit.</p>
              <p>Oil-based system, usually 0.2–0.3 m/s.</p>
            </button>
            <button
              onClick={() => {
                update('drivePreference', 'Traction / MRL Traction');
                next();
              }}
              className="p-4 border rounded hover:border-emerald-500 text-left text-xs space-y-1"
            >
              <p className="font-semibold text-sm">Traction / MRL</p>
              <p>Standard for apartments &amp; commercial buildings.</p>
              <p>Higher speed, best efficiency, needs deeper pit/headroom.</p>
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800">
            Basic configuration &amp; location
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="City / Locality"
              className="w-full border p-2 rounded text-sm"
              onChange={(e) => update('location', e.target.value)}
            />
            <input
              placeholder="Floors to be served"
              type="number"
              className="w-full border p-2 rounded text-sm"
              onChange={(e) => update('floors', e.target.value)}
            />
          </div>
          <button
            onClick={next}
            className="bg-emerald-600 text-white px-4 py-2 rounded text-sm"
          >
            Next
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800">
            Is a lift shaft already planned or constructed?
          </h3>
          <p className="text-xs text-slate-500">
            If not, we’ll flag that a site survey and architect coordination is
            needed.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => {
                update('shaftAvailable', 'Yes');
                next();
              }}
              className="flex-1 border p-4 rounded text-sm"
            >
              Yes, shaft is ready / planned
            </button>
            <button
              onClick={() => {
                update('shaftAvailable', 'No');
                next();
              }}
              className="flex-1 border p-4 rounded text-sm"
            >
              No, needs guidance
            </button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800">
            Shaft measurements &amp; drawings
          </h3>
          <p className="text-xs text-slate-500">
            Share whatever you have now. Lift4M will run a professional survey
            later (Stage 5) before final contract.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Shaft width (mm)"
              className="w-full border p-2 rounded text-sm"
              onChange={(e) => update('width', e.target.value)}
            />
            <input
              placeholder="Shaft depth (mm)"
              className="w-full border p-2 rounded text-sm"
              onChange={(e) => update('depth', e.target.value)}
            />
            <input
              placeholder="Pit depth (mm)"
              className="w-full border p-2 rounded text-sm"
              onChange={(e) => update('pitDepth', e.target.value)}
            />
            <input
              placeholder="Headroom height (mm)"
              className="w-full border p-2 rounded text-sm"
              onChange={(e) => update('headroom', e.target.value)}
            />
          </div>
          <div className="space-y-2 text-xs">
            <label className="font-semibold">
              Upload floor plan / lift shaft drawing (optional)
            </label>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              className="text-xs"
              onChange={(e) =>
                update('planFileName', e.target.files?.[0]?.name || '')
              }
            />
            {data.planFileName && (
              <p className="text-[11px] text-slate-500">
                Attached: {data.planFileName}
              </p>
            )}
          </div>
          <ShaftDiagram />
          <button
            onClick={next}
            className="bg-emerald-600 text-white px-4 py-2 rounded text-sm mt-4"
          >
            Next
          </button>
        </div>
      )}

      {step === 6 && (
        <div className="text-center space-y-4">
          <h3 className="text-xl font-bold mb-2">
            Ready to create your Lift4M project?
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            We’ll treat this as an initial requirement. Manufacturers will quote
            based on these details (Stage 3–4), and Lift4M will physically verify
            everything in Stage 5 before contract.
          </p>
          <button
            onClick={() => onComplete(data)}
            className="bg-emerald-600 text-white px-8 py-3 rounded text-sm font-semibold"
          >
            Post to Marketplace
          </button>
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------
   CUSTOMER PROJECT VIEW – UPDATED STAGE FLOW & RATING VISIBILITY
-------------------------------------------------------------------*/

const CustomerProjectView = ({
  project,
  quotes,
  onBack,
  onSelectQuote,
  onAdvanceStage,
  getRating
}) => {
  const [tab, setTab] = useState('Overview');
  const projectQuotes = quotes.filter((q) => q.projectId === project.id);

  const getStageAction = () => {
    switch (project.stage) {
      case 2:
        return {
          label: 'Broadcast requirement to manufacturers (Stage 3)',
          description:
            'Once you are happy with the basic dimensions, push this opportunity to verified manufacturers.'
        };
      case 4:
        return {
          label: 'Schedule Lift4M survey & feasibility (Stage 5)',
          description:
            'After reviewing Top 3 options, ask Lift4M to run a detailed site survey to validate shaft/pit/headroom and electrical readiness.'
        };
      case 5:
        return {
          label: 'Confirm survey approved & move to contract (Stage 6)',
          description:
            'Lift4M survey is complete and parameters are verified. Proceed to tri-party contract with the chosen manufacturer.'
        };
      case 6:
        return {
          label: 'Confirm Contract Signed & Request GAD (Stage 7)',
          description:
            'Treat the deal as closed, move to GAD design freeze and multi-party approval workflow.'
        };
      case 7:
        return {
          label: 'Approve GAD & Move to Production (Stage 8)',
          description:
            'All stakeholders have signed off on drawings — start production and pre-installation readiness.'
        };
      case 8:
        return {
          label: 'Mark Production Ready & Start Installation (Stage 9)',
          description:
            'Factory QC done and JRC signed — dispatch material and begin on-site installation.'
        };
      case 9:
        return {
          label: 'Commissioning Complete & Handover (Stage 10)',
          description:
            'Confirm ARD, safety circuits and load tests; move project into handover + AMC mode.'
        };
      default:
        return null;
    }
  };

  const stageAction = getStageAction();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-200 rounded-full"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-2xl font-bold">{project.name}</h2>
          <p className="text-sm text-slate-500">
            ID: {project.id} • {project.location}
          </p>
        </div>
      </div>
      <Timeline activeStage={project.stage} />
      <StageInfoPanel stageNumber={project.stage} />

      <div className="flex border-b border-slate-200 mb-6 overflow-x-auto">
        {['Overview', 'Review Proposals', 'Financials', 'Files'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-3 font-medium text-sm whitespace-nowrap transition ${
              tab === t
                ? 'border-b-2 border-emerald-500 text-emerald-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {t}
            {t === 'Review Proposals' && projectQuotes.length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
                {projectQuotes.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === 'Overview' && (
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Project Specs</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-500">Type</p>
              <b>{project.type}</b>
            </div>
            <div>
              <p className="text-slate-500">Floors</p>
              <b>{project.floors}</b>
            </div>
            <div>
              <p className="text-slate-500">Preferred drive</p>
              <b>{project.drivePreference || 'Not specified'}</b>
            </div>
            <div>
              <p className="text-slate-500">Shaft</p>
              <b>
                {project.width} x {project.depth} mm
              </b>
            </div>
            <div>
              <p className="text-slate-500">Pit depth</p>
              <b>{project.pitDepth || 'TBD'} mm</b>
            </div>
            <div>
              <p className="text-slate-500">Headroom</p>
              <b>{project.headroom || 'TBD'} mm</b>
            </div>
            <div>
              <p className="text-slate-500">Status</p>
              <StatusBadge status={project.status} />
            </div>
          </div>

          {stageAction && (
            <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="font-bold text-emerald-800 text-sm">
                  Next recommended action
                </p>
                <p className="text-xs text-emerald-700 max-w-lg">
                  {stageAction.description}
                </p>
              </div>
              <button
                onClick={() => onAdvanceStage(project.id)}
                className="bg-emerald-600 text-white px-4 py-2 rounded text-xs font-semibold whitespace-nowrap"
              >
                {stageAction.label}
              </button>
            </div>
          )}

          {project.stage >= 3 && projectQuotes.length > 0 && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-bold text-blue-800">
                  {projectQuotes.length} quotes received
                </p>
                <p className="text-xs text-blue-600">
                  Review specifications, Lift4M rating and pricing before moving
                  ahead.
                </p>
              </div>
              <button
                onClick={() => setTab('Review Proposals')}
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold"
              >
                Review Now
              </button>
            </div>
          )}
        </div>
      )}

      {tab === 'Review Proposals' && (
        <div className="space-y-6">
          <h3 className="font-bold text-lg text-slate-800">
            Received Quotations
          </h3>
          {projectQuotes.length === 0 ? (
            <div className="p-10 text-center border-2 border-dashed rounded text-slate-400">
              Waiting for manufacturers to submit bids...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectQuotes.map((q) => {
                const rating = getRating ? getRating(q.mfrId) : null;
                return (
                  <div
                    key={q.id}
                    className="bg-white border-2 border-slate-100 rounded-xl p-5 hover:border-emerald-500 transition shadow-sm relative overflow-hidden"
                  >
                    {q.status === 'Accepted' && (
                      <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs px-3 py-1 rounded-bl-lg font-bold">
                        SELECTED
                      </div>
                    )}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600">
                          {q.mfrName[0]}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-slate-800">
                          {formatINR(q.price)}
                        </p>
                        <p className="text-xs text-slate-500">
                          Total Project Cost
                        </p>
                      </div>
                    </div>
                    <h4 className="font-bold text-lg mb-1">{q.mfrName}</h4>
                    {rating && (
                      <div className="mb-2">
                        <RatingBadge
                          score={rating.score}
                          totalReviews={rating.totalReviews}
                        />
                      </div>
                    )}
                    <div className="text-xs text-slate-600 mb-3 bg-slate-50 p-2 rounded space-y-1">
                      <p>
                        <b>Product:</b> {q.productName} ({q.liftType})
                      </p>
                      <p>
                        <b>Drive:</b> {q.driveType}
                      </p>
                      <p>
                        <b>Capacity:</b> {q.capacity} • <b>Speed:</b> {q.speed}
                      </p>
                      <p>
                        <b>Stops:</b> {q.stopsRange} •{' '}
                        <b>Door:</b> {q.doorType}
                      </p>
                      <p>
                        <b>Machine Room:</b> {q.machineRoom}
                      </p>
                      <p>
                        <b>Pit / Headroom needs:</b> {q.pitRequired} /{' '}
                        {q.headroomRequired}
                      </p>
                      <p>
                        <b>Warranty:</b> {q.warrantyYears} years (standard)
                      </p>
                      <p>
                        <b>Lead Time:</b> {q.leadTime} weeks
                      </p>
                    </div>
                    {q.usp && (
                      <p className="text-[11px] text-slate-500 italic mb-3">
                        USP: {q.usp}
                      </p>
                    )}
                    {project.stage === 4 ? (
                      <div className="grid grid-cols-2 gap-2">
                        <button className="border border-slate-300 text-slate-600 py-2 rounded text-sm font-bold">
                          Ask Question
                        </button>
                        <button
                          onClick={() => onSelectQuote(project.id, q.id)}
                          className="bg-slate-900 text-white py-2 rounded text-sm font-bold hover:bg-emerald-600 transition"
                        >
                          Shortlist &amp; Trigger Survey
                        </button>
                      </div>
                    ) : (
                      <div className="text-center text-sm text-slate-400 italic">
                        Bidding Closed
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------
   MANUFACTURER FLOW – LEADS + PRODUCT MASTER
-------------------------------------------------------------------*/

const LeadsMarketplace = ({ projects, user, onSubmitQuote, products }) => {
  const [selectedLead, setSelectedLead] = useState(null);
  const [quoteForm, setQuoteForm] = useState({
    price: '',
    leadTime: '',
    productId: ''
  });

  const leads = projects.filter((p) => p.stage >= 3 && p.stage <= 5);

  const submit = () => {
    const selectedProduct = products.find((p) => p.id === quoteForm.productId);
    onSubmitQuote({
      projectId: selectedLead.id,
      mfrId: user.id,
      mfrName: user.name,
      price: parseInt(quoteForm.price, 10),
      leadTime: quoteForm.leadTime,
      productId: quoteForm.productId,
      productName: selectedProduct?.name || 'Custom',
      liftType: selectedProduct?.liftType || 'Custom',
      driveType: selectedProduct?.driveType || 'Custom',
      capacity: selectedProduct?.capacity || 'N/A',
      speed: selectedProduct?.speed || 'N/A',
      stopsRange: selectedProduct?.stopsRange || 'N/A',
      doorType: selectedProduct?.doorType || 'N/A',
      machineRoom: selectedProduct?.machineRoom || 'N/A',
      pitRequired: selectedProduct?.pitRequired || 'N/A',
      headroomRequired: selectedProduct?.headroomRequired || 'N/A',
      warrantyYears: selectedProduct?.warrantyYears || 1,
      usp: selectedProduct?.usp || ''
    });
    setSelectedLead(null);
    setQuoteForm({ price: '', leadTime: '', productId: '' });
  };

  const selectedProduct =
    products.find((p) => p.id === quoteForm.productId) || null;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Users size={24} /> Opportunity Marketplace
      </h2>

      {selectedLead ? (
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-lg max-w-3xl mx-auto">
          <button
            onClick={() => setSelectedLead(null)}
            className="text-sm text-slate-500 mb-4 hover:underline"
          >
            ← Back to Leads
          </button>
          <h3 className="text-xl font-bold mb-4">
            Quote for: {selectedLead.name}
          </h3>

          <div className="grid grid-cols-2 gap-4 mb-6 text-sm bg-slate-50 p-4 rounded">
            <div>
              <span className="text-slate-500 block">Floors</span>
              <b>{selectedLead.floors}</b>
            </div>
            <div>
              <span className="text-slate-500 block">Preferred drive</span>
              <b>{selectedLead.drivePreference || 'Any'}</b>
            </div>
            <div>
              <span className="text-slate-500 block">Shaft</span>
              <b>
                {selectedLead.width}x{selectedLead.depth} mm
              </b>
            </div>
            <div>
              <span className="text-slate-500 block">Pit / Headroom</span>
              <b>
                {selectedLead.pitDepth || 'TBD'} /{' '}
                {selectedLead.headroom || 'TBD'} mm
              </b>
            </div>
          </div>

          <h4 className="font-bold mb-3 border-b pb-2">
            Prepare Quotation (with Product Master)
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1">
                Select Product from Catalog
              </label>
              <select
                className="w-full border p-2 rounded text-sm"
                value={quoteForm.productId}
                onChange={(e) =>
                  setQuoteForm((prev) => ({ ...prev, productId: e.target.value }))
                }
              >
                <option value="">-- Choose Product --</option>
                {products
                  .filter((p) => p.mfrId === user.id)
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.liftType}, {p.driveType})
                    </option>
                  ))}
              </select>
              <p className="text-[11px] text-slate-500 mt-1">
                If you don’t see a fit, create a new product under “Product
                Catalog” in your sidebar and return here.
              </p>
            </div>

            {selectedProduct && (
              <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs space-y-1">
                <p>
                  <b>Type:</b> {selectedProduct.liftType} •{' '}
                  <b>Drive:</b> {selectedProduct.driveType}
                </p>
                <p>
                  <b>Capacity:</b> {selectedProduct.capacity} •{' '}
                  <b>Speed:</b> {selectedProduct.speed}
                </p>
                <p>
                  <b>Stops:</b> {selectedProduct.stopsRange} •{' '}
                  <b>Door:</b> {selectedProduct.doorType}
                </p>
                <p>
                  <b>Machine Room:</b> {selectedProduct.machineRoom}
                </p>
                <p>
                  <b>Pit / Headroom:</b> {selectedProduct.pitRequired} /{' '}
                  {selectedProduct.headroomRequired}
                </p>
                <p>
                  <b>Base Price (indicative):</b>{' '}
                  {formatINR(selectedProduct.basePrice)}
                </p>
                {selectedProduct.usp && (
                  <p>
                    <b>USP:</b> {selectedProduct.usp}
                  </p>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1">
                  Quoted Price (INR)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-slate-500">₹</span>
                  <input
                    type="number"
                    className="w-full border p-2 pl-6 rounded text-sm"
                    value={quoteForm.price}
                    onChange={(e) =>
                      setQuoteForm((prev) => ({ ...prev, price: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">
                  Lead Time (Weeks)
                </label>
                <input
                  type="number"
                  className="w-full border p-2 rounded text-sm"
                  value={quoteForm.leadTime}
                  onChange={(e) =>
                    setQuoteForm((prev) => ({
                      ...prev,
                      leadTime: e.target.value
                    }))
                  }
                />
              </div>
            </div>
            <button
              onClick={submit}
              disabled={!quoteForm.productId || !quoteForm.price}
              className="w-full bg-emerald-600 text-white py-3 rounded font-bold hover:bg-emerald-700 disabled:bg-slate-300 text-sm"
            >
              Submit Detailed Quote
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leads.length === 0 && (
            <div className="col-span-3 text-center py-12 text-slate-400">
              No active leads currently available.
            </div>
          )}
          {leads.map((p) => (
            <div
              key={p.id}
              className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between mb-2">
                <StatusBadge status={p.status} />
                <span className="text-xs text-slate-400">#{p.id}</span>
              </div>
              <h3 className="font-bold text-lg mb-1">{p.name}</h3>
              <p className="text-sm text-slate-500 mb-4">
                {p.location} • {p.floors} Floors • Prefers{' '}
                {p.drivePreference || 'Any Drive'}
              </p>
              <button
                onClick={() => setSelectedLead(p)}
                className="w-full bg-slate-900 text-white py-2 rounded text-sm font-bold hover:bg-slate-800"
              >
                View &amp; Quote
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* PRODUCT CATALOG FOR MANUFACTURERS */

const ProductCatalog = ({ user, products, onAddProduct }) => {
  const myProducts = products.filter((p) => p.mfrId === user.id);
  const [form, setForm] = useState({
    name: '',
    liftType: 'Passenger',
    driveType: 'Traction',
    capacity: '',
    speed: '',
    stopsRange: '',
    doorType: '',
    machineRoom: '',
    pitRequired: '',
    headroomRequired: '',
    basePrice: '',
    warrantyYears: 1,
    usp: ''
  });

  const update = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  const addProduct = () => {
    onAddProduct({
      ...form,
      basePrice: Number(form.basePrice) || 0,
      warrantyYears: Number(form.warrantyYears) || 1
    });
    setForm({
      name: '',
      liftType: 'Passenger',
      driveType: 'Traction',
      capacity: '',
      speed: '',
      stopsRange: '',
      doorType: '',
      machineRoom: '',
      pitRequired: '',
      headroomRequired: '',
      basePrice: '',
      warrantyYears: 1,
      usp: ''
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Product Catalog</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg p-5 shadow-sm">
          <h3 className="font-bold mb-3">Create Product Template</h3>
          <div className="space-y-3 text-xs">
            <input
              className="w-full border p-2 rounded"
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
              <select
                className="border p-2 rounded"
                value={form.liftType}
                onChange={(e) => update('liftType', e.target.value)}
              >
                <option>Passenger</option>
                <option>Home Lift</option>
                <option>Freight</option>
                <option>Hospital / Bed</option>
              </select>
              <select
                className="border p-2 rounded"
                value={form.driveType}
                onChange={(e) => update('driveType', e.target.value)}
              >
                <option>Traction</option>
                <option>MRL Traction</option>
                <option>Hydraulic</option>
                <option>Pneumatic</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                className="border p-2 rounded"
                placeholder="Capacity (e.g., 6 persons / 408 kg)"
                value={form.capacity}
                onChange={(e) => update('capacity', e.target.value)}
              />
              <input
                className="border p-2 rounded"
                placeholder="Speed (e.g., 1.0 m/s)"
                value={form.speed}
                onChange={(e) => update('speed', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                className="border p-2 rounded"
                placeholder="Stops range (e.g., G+7)"
                value={form.stopsRange}
                onChange={(e) => update('stopsRange', e.target.value)}
              />
              <input
                className="border p-2 rounded"
                placeholder="Door type"
                value={form.doorType}
                onChange={(e) => update('doorType', e.target.value)}
              />
            </div>
            <input
              className="border p-2 rounded"
              placeholder="Machine room details"
              value={form.machineRoom}
              onChange={(e) => update('machineRoom', e.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                className="border p-2 rounded"
                placeholder="Pit required (mm)"
                value={form.pitRequired}
                onChange={(e) => update('pitRequired', e.target.value)}
              />
              <input
                className="border p-2 rounded"
                placeholder="Headroom required (mm)"
                value={form.headroomRequired}
                onChange={(e) => update('headroomRequired', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                className="border p-2 rounded"
                placeholder="Base price (INR)"
                type="number"
                value={form.basePrice}
                onChange={(e) => update('basePrice', e.target.value)}
              />
              <input
                className="border p-2 rounded"
                placeholder="Warranty years"
                type="number"
                value={form.warrantyYears}
                onChange={(e) => update('warrantyYears', e.target.value)}
              />
            </div>
            <textarea
              className="w-full border p-2 rounded"
              placeholder="USP / Differentiator (short one-liner)"
              rows={2}
              value={form.usp}
              onChange={(e) => update('usp', e.target.value)}
            />
            <button
              onClick={addProduct}
              disabled={!form.name}
              className="w-full bg-emerald-600 text-white py-2 rounded text-xs font-bold disabled:bg-slate-300"
            >
              Save Product Template
            </button>
          </div>
        </div>
        <div className="bg-white border rounded-lg p-5 shadow-sm">
          <h3 className="font-bold mb-3">My Templates</h3>
          {myProducts.length === 0 ? (
            <p className="text-xs text-slate-500">
              No products yet. Create a template on the left and it will appear
              here for re-use in quotes.
            </p>
          ) : (
            <div className="space-y-3 text-xs">
              {myProducts.map((p) => (
                <div
                  key={p.id}
                  className="border border-slate-100 rounded p-3 bg-slate-50"
                >
                  <p className="font-semibold text-slate-800">{p.name}</p>
                  <p className="text-slate-600">
                    {p.liftType} • {p.driveType} • {p.capacity}
                  </p>
                  <p className="text-slate-500">
                    {p.stopsRange} • {p.doorType}
                  </p>
                  <p className="text-slate-500">
                    Pit {p.pitRequired}, Headroom {p.headroomRequired}
                  </p>
                  <p className="text-slate-500">
                    Warranty {p.warrantyYears} yrs • Base{' '}
                    {formatINR(p.basePrice)}
                  </p>
                  {p.usp && (
                    <p className="text-[11px] text-slate-500 italic mt-1">
                      {p.usp}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ManufacturerDashboard = ({ quotes, user, setView }) => {
  const myQuotes = quotes.filter((q) => q.mfrId === user.id);
  const pending = myQuotes.filter((q) => q.status === 'Submitted').length;
  const won = myQuotes.filter((q) => q.status === 'Accepted').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => setView('leads')}
          className="bg-white p-6 rounded border shadow-sm cursor-pointer hover:border-emerald-500 group"
        >
          <h3 className="font-bold text-lg mb-2 text-slate-700 group-hover:text-emerald-600">
            Deal Pipeline
          </h3>
          <div className="text-4xl font-bold text-slate-800">
            {pending}{' '}
            <span className="text-sm font-normal text-slate-500">
              Active Quotes
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Click to view Leads Marketplace
          </p>
        </div>
        <div
          onClick={() => setView('products')}
          className="bg-white p-6 rounded border shadow-sm cursor-pointer hover:border-emerald-500 group"
        >
          <h3 className="font-bold text-lg mb-2 text-slate-700 group-hover:text-emerald-600">
            Product Catalog
          </h3>
          <p className="text-sm text-slate-600">
            Create product templates once and auto-fill quote responses.
          </p>
        </div>
        <div className="bg-white p-6 rounded border shadow-sm">
          <h3 className="font-bold text-lg mb-2 text-slate-700">Success Rate</h3>
          <div className="text-4xl font-bold text-slate-800">
            {won}{' '}
            <span className="text-sm font-normal text-slate-500">Deals Won</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="font-bold text-lg mb-4">My Quote History</h3>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="p-3">Project ID</th>
              <th className="p-3">Product Offered</th>
              <th className="p-3">Price Quoted</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {myQuotes.map((q) => (
              <tr key={q.id} className="border-t">
                <td className="p-3 font-mono">{q.projectId}</td>
                <td className="p-3 font-bold">{q.productName}</td>
                <td className="p-3">{formatINR(q.price)}</td>
                <td className="p-3">
                  <StatusBadge status={q.status} />
                </td>
              </tr>
            ))}
            {myQuotes.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-slate-400">
                  No quotes submitted yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------
   MAIN APP
-------------------------------------------------------------------*/

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('dashboard');
  const [activeProject, setActiveProject] = useState(null);

  const [projects, setProjects] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [mfrRatings, setMfrRatings] = useState(INITIAL_MFR_RATINGS);

  const handleLogin = (cred) => {
    setUser(cred);
    setView('dashboard');
    setActiveProject(null);
  };

  const handleCreateProject = (data) => {
    if (!user) return;
    const newProject = {
      id: `PRJ-${Math.floor(1000 + Math.random() * 9000)}`,
      name: `${data.type || 'Lift'} Project`,
      stage: 2,
      status: 'Requirements Submitted',
      type: data.type,
      client: user.name,
      floors: data.floors,
      location: data.location,
      width: data.width,
      depth: data.depth,
      pitDepth: data.pitDepth,
      headroom: data.headroom,
      drivePreference: data.drivePreference,
      auditLogs: [
        {
          id: Date.now(),
          action:
            'Project Created with initial requirements & shaft dimensions (Stages 1–2)',
          user: user.name,
          timestamp: new Date().toLocaleString()
        }
      ]
    };
    setProjects((prev) => [newProject, ...prev]);
    setView('dashboard');
  };

  const handleQuoteSubmit = (quoteData) => {
    const newQuote = {
      id: `QT-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Submitted',
      submittedAt: new Date(),
      ...quoteData
    };
    setQuotes((prev) => [newQuote, ...prev]);

    setProjects((prev) =>
      prev.map((p) =>
        p.id === quoteData.projectId
          ? {
              ...p,
              stage: Math.max(p.stage, 4), // move to Top-3 quotes stage
              status: 'Action Required',
              auditLogs: [
                {
                  id: Date.now() + 1,
                  action:
                    'Lead broadcast to verified manufacturer pool (Stage 3) & Top 3 ranking in progress (Stage 4)',
                  user: 'System',
                  timestamp: new Date().toLocaleString()
                },
                {
                  id: Date.now(),
                  action: `Quote Received from ${quoteData.mfrName}`,
                  user: 'System',
                  timestamp: new Date().toLocaleString()
                },
                ...(p.auditLogs || [])
              ]
            }
          : p
      )
    );

    setView('dashboard');
  };

  // Customer selects quote -> Stage 5 (survey) in new flow
  const handleSelectQuote = (projectId, quoteId) => {
    setQuotes((prev) =>
      prev.map((q) =>
        q.id === quoteId
          ? { ...q, status: 'Accepted' }
          : q.projectId === projectId
          ? { ...q, status: 'Rejected' }
          : q
      )
    );

    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              stage: 5,
              status: 'Survey Scheduled',
              auditLogs: [
                {
                  id: Date.now(),
                  action:
                    'Customer shortlisted manufacturer; Lift4M survey scheduled (Stage 5)',
                  user: user?.name || 'Customer',
                  timestamp: new Date().toLocaleString()
                },
                ...(p.auditLogs || [])
              ]
            }
          : p
      )
    );

    setActiveProject(null);
  };

  const handleAdvanceStage = (projectId) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;

        let nextStage = p.stage;
        let status = p.status;
        let actionText = '';

        switch (p.stage) {
          case 2:
            nextStage = 3;
            status = 'Bidding';
            actionText =
              'Requirements finalized; broadcasting opportunity to verified manufacturers (Stage 3).';
            break;
          case 4:
            nextStage = 5;
            status = 'Survey Scheduled';
            actionText =
              'Customer requested Lift4M survey & feasibility validation (Stage 5).';
            break;
          case 5:
            nextStage = 6;
            status = 'Contract';
            actionText =
              'Lift4M survey approved; moving to customer selection & tri-party contract (Stage 6).';
            break;
          case 6:
            nextStage = 7;
            status = 'GAD Approval';
            actionText =
              'Contract signed; requesting GAD drawings and stakeholder approvals (Stage 7).';
            break;
          case 7:
            nextStage = 8;
            status = 'Production';
            actionText =
              'GAD approved; moving to production and pre-installation readiness (Stage 8).';
            break;
          case 8:
            nextStage = 9;
            status = 'Installation';
            actionText =
              'Production ready; dispatching material and starting on-site installation (Stage 9).';
            break;
          case 9:
            nextStage = 10;
            status = 'Completed';
            actionText =
              'Commissioning complete; project handed over and AMC / digital logbook activated (Stage 10).';
            break;
          default:
            return p;
        }

        return {
          ...p,
          stage: nextStage,
          status,
          auditLogs: [
            {
              id: Date.now(),
              action: actionText,
              user: user?.name || 'Customer',
              timestamp: new Date().toLocaleString()
            },
            ...(p.auditLogs || [])
          ]
        };
      })
    );
  };

  const handleAddProduct = (productData) => {
    setProducts((prev) => [
      ...prev,
      {
        id: `prod-${Date.now()}`,
        mfrId: user.id,
        ...productData
      }
    ]);
  };

  const getRating = (mfrId) => mfrRatings[mfrId];

  const renderContent = () => {
    if (view === 'wizard') {
      return <CustomerWizard onComplete={handleCreateProject} />;
    }

    if (!user) return null;

    if (user.role === ROLES.ADMIN) {
      return (
        <SuperAdminDashboard
          projects={projects}
          quotes={quotes}
          mfrRatings={mfrRatings}
          setMfrRatings={setMfrRatings}
        />
      );
    }

    if (user.role === ROLES.CUSTOMER) {
      if (activeProject) {
        return (
          <CustomerProjectView
            project={activeProject}
            quotes={quotes}
            onBack={() => setActiveProject(null)}
            onSelectQuote={handleSelectQuote}
            onAdvanceStage={handleAdvanceStage}
            getRating={getRating}
          />
        );
      }
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-6 rounded-lg border shadow-sm">
            <div>
              <h2 className="text-2xl font-bold">Welcome, {user.name}</h2>
              <p className="text-slate-500">
                Stages 1–2: capture requirements, then track end-to-end.
              </p>
            </div>
            <button
              onClick={() => setView('wizard')}
              className="bg-emerald-600 text-white px-4 py-2 rounded flex items-center gap-2 text-sm"
            >
              <Plus size={18} /> New Project
            </button>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-6">
            <h3 className="font-bold text-lg mb-4">My Projects</h3>
            {projects.length === 0 ? (
              <p className="text-center text-slate-500 py-8">
                No active projects. Create one to start the Lift4M workflow.
              </p>
            ) : (
              <div className="space-y-3">
                {projects.map((p) => {
                  const count = quotes.filter((q) => q.projectId === p.id).length;
                  const stageLabel =
                    CORE_STAGES.find((s) => s.id === p.stage)?.shortLabel ||
                    `Stage ${p.stage}`;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setActiveProject(p)}
                      className="p-4 border rounded hover:border-emerald-500 cursor-pointer flex justify-between items-center group transition"
                    >
                      <div>
                        <p className="font-bold text-lg group-hover:text-emerald-700">
                          {p.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {p.id} • {stageLabel}
                        </p>
                      </div>
                      <div className="text-right">
                        <StatusBadge status={p.status} />
                        {p.stage >= 3 && count > 0 && (
                          <p className="text-xs text-blue-600 font-bold mt-1">
                            {count} Quotes Received
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      );
    }

    if (user.role === ROLES.MANUFACTURER) {
      if (view === 'leads') {
        return (
          <LeadsMarketplace
            projects={projects}
            user={user}
            products={products}
            onSubmitQuote={handleQuoteSubmit}
          />
        );
      }
      if (view === 'products') {
        return (
          <ProductCatalog
            user={user}
            products={products}
            onAddProduct={handleAddProduct}
          />
        );
      }
      return (
        <ManufacturerDashboard quotes={quotes} user={user} setView={setView} />
      );
    }

    return <div>Maintenance dashboard coming soon.</div>;
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      <div className="w-64 bg-slate-900 text-slate-300 hidden md:flex flex-col h-screen fixed left-0 top-0 z-20">
        <div className="p-6 flex items-center gap-2 text-white">
          <div className="bg-emerald-500 p-1 rounded">
            <Package size={24} />
          </div>
          <span className="text-xl font-bold">Lift4M</span>
        </div>
        <div className="px-6 py-2">
          <nav className="space-y-1 text-sm">
            <button
              onClick={() => {
                setView('dashboard');
                setActiveProject(null);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded transition ${
                view === 'dashboard'
                  ? 'bg-slate-800 text-white'
                  : 'hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard size={18} /> Dashboard
            </button>
            {user.role === ROLES.CUSTOMER && (
              <button
                onClick={() => setView('wizard')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded transition ${
                  view === 'wizard'
                    ? 'bg-slate-800 text-white'
                    : 'hover:bg-slate-800'
                }`}
              >
                <Plus size={18} /> New Project
              </button>
            )}
            {user.role === ROLES.MANUFACTURER && (
              <>
                <button
                  onClick={() => setView('leads')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded transition ${
                    view === 'leads'
                      ? 'bg-slate-800 text-white'
                      : 'hover:bg-slate-800'
                  }`}
                >
                  <Users size={18} /> Leads Marketplace
                </button>
                <button
                  onClick={() => setView('products')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded transition ${
                    view === 'products'
                      ? 'bg-slate-800 text-white'
                      : 'hover:bg-slate-800'
                  }`}
                >
                  <Package size={18} /> Product Catalog
                </button>
              </>
            )}
          </nav>
        </div>
        <div className="mt-auto p-4 border-t border-slate-800 text-xs">
          <div className="mb-4 text-slate-500 font-mono">
            Logged in as:
            <br />
            <span className="text-white font-bold">{user.name}</span>
          </div>
          <button
            onClick={() => {
              setUser(null);
              setView('dashboard');
              setActiveProject(null);
            }}
            className="flex items-center gap-2 text-red-400"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </div>
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <header className="bg-white h-16 border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between px-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800">
            Lift4M Workspace — 10-Stage Project Timeline
          </h2>
          <div className="bg-slate-100 p-2 rounded-full">
            <Bell size={20} />
          </div>
        </header>
        <div className="p-6 md:p-8 overflow-y-auto flex-1">{renderContent()}</div>
      </main>
    </div>
  );
}
