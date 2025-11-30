const roles = [
  {
    id: 'super-admin',
    label: 'Super Admin',
    summary: [
      { title: 'Active projects', value: 24, descriptor: 'Across all regions', badge: 'All stakeholders visible' },
      { title: 'Onboarding', value: 6, descriptor: 'Manufacturer approvals pending', badge: 'Verification queue' },
      { title: 'Service SLAs', value: '92%', descriptor: 'Met in last 30 days', badge: 'Monitor countdowns' },
      { title: 'Disputes', value: 2, descriptor: 'Under review', badge: 'Escalation desk' }
    ],
    tasks: [
      'Review manufacturer KYC and certifications for onboarding.',
      'Tune AI ranking weightages for reliability and SLA speed.',
      'Approve Form A templates for upcoming licensing cycles.'
    ]
  },
  {
    id: 'customer',
    label: 'Building Manager / Customer / Builder',
    summary: [
      { title: 'My lifts in progress', value: 5, descriptor: '3 new install, 2 retrofit', badge: 'Live visibility' },
      { title: 'Quotes awaiting action', value: 3, descriptor: 'Top 3 ranked options ready', badge: 'Approve or ask' },
      { title: 'AMC & Service', value: 4, descriptor: 'SLAs in green', badge: 'Schedule visits' },
      { title: 'Breakdown tickets', value: 1, descriptor: 'SLA at risk', badge: 'Watch timer' }
    ],
    tasks: [
      'Complete shaft measurement uploads for retrofit shafts.',
      'Approve GAD drawings for Tower B elevator.',
      'Select AMC plan for Building Alpha before expiry.'
    ]
  },
  {
    id: 'manufacturer',
    label: 'Manufacturer',
    summary: [
      { title: 'Leads to respond', value: 4, descriptor: 'Geo-filtered broadcast', badge: 'Standardized spec' },
      { title: 'Quotes submitted', value: 7, descriptor: 'Awaiting AI ranking', badge: 'Keep SLAs' },
      { title: 'Production', value: 3, descriptor: 'In QC or packing', badge: 'Serials assigned' },
      { title: 'Installations', value: 2, descriptor: 'Onsite teams live', badge: 'Photo verify' }
    ],
    tasks: [
      'Upload final GAD for Skyview Tower modernization.',
      'Update factory QC status for Alpha-23 cabin line.',
      'Attach serial numbers and dispatch schedule.'
    ]
  },
  {
    id: 'maintenance',
    label: 'Maintenance Provider',
    summary: [
      { title: 'Service tickets', value: 8, descriptor: '2 breakdowns, 6 scheduled', badge: 'Prioritize SLA' },
      { title: 'AMC renewals', value: 5, descriptor: 'Due in 30 days', badge: 'Prevent churn' },
      { title: 'Parts in transit', value: 3, descriptor: 'For escalated jobs', badge: 'Track ETA' },
      { title: 'Digital logbooks', value: 11, descriptor: 'Needing updates', badge: 'Stay compliant' }
    ],
    tasks: [
      'Close breakdown ticket for Lift ID A-102 before SLA breach.',
      'Confirm AMC visit schedule for Week 34.',
      'Upload photo proof for replaced door operator.'
    ]
  }
];

const coreStages = [
  'Customer / Builder Onboarding & Need Discovery',
  'Smart Requirement Form + Measurement Capture',
  'Verified Survey & Feasibility Report',
  'Lead Broadcast to Verified Manufacturer Pool',
  'AI Ranking & Top 3 Quote Presentation',
  'Customer Selection & Tri-Party Contract',
  'Final Technical Freeze (GAD Approval)',
  'Production & Pre-Installation Readiness',
  'Delivery, Installation & Commissioning',
  'Handover + Digital Logbook + Lifetime Support'
];

const projectTypeMappings = {
  'new-installation': {
    label: 'New Installation',
    stages: coreStages,
    notes: 'Uses all 10 backbone stages with escrow-gated progression.'
  },
  retrofit: {
    label: 'Retrofit (Modernization)',
    stages: coreStages.map((s, idx) =>
      idx === 0
        ? `${s} + existing lift constraints`
        : idx === 1
        ? `${s} with demolition and reuse checks`
        : s
    ),
    notes: 'Adds legacy lift capture, demolition constraints, and reuse vs replace decisions.'
  },
  service: {
    label: 'Service Business (Service & AMC)',
    stages: [
      'Service Request Created / Need Discovery',
      'Smart Issue Form + Photos/Video Upload',
      'Onsite Diagnosis & Feasibility',
      'Lead Broadcast to Service Providers',
      'AI Ranking & Top 3 Service Quotes / AMC Plans',
      'Contract / Work Order Confirmation',
      'Service Execution & Parts Tracking',
      'Closure + Digital Logbook Update & Feedback',
      'AMC Activation & SLA Monitoring'
    ],
    notes: 'Leverages backbone semantics for service and AMC lifecycle with SLA timers.'
  }
};

const projects = [
  {
    id: 'PRJ-145',
    name: 'Skyview Tower — New Lift',
    building: 'Skyview Tower, Mumbai',
    type: 'new-installation',
    owner: 'Building Manager',
    manager: 'Anita (Lift4M)',
    manufacturer: 'Ascend Elevators',
    status: 'In Progress',
    stages: [
      { title: coreStages[0], status: 'Completed', expected: 'Jan 4', actual: 'Jan 3', owner: 'Customer', updatedBy: 'Anita', notes: 'Wizard completed with power feasibility check passed.' },
      { title: coreStages[1], status: 'Completed', expected: 'Jan 8', actual: 'Jan 7', owner: 'Customer', updatedBy: 'Anita', notes: 'Uploaded architectural drawings; auto-extraction placeholder flagged ready.' },
      { title: coreStages[2], status: 'Completed', expected: 'Jan 12', actual: 'Jan 11', owner: 'Lift4M Engineer', updatedBy: 'Survey Bot', notes: 'GPS-verified survey and feasibility report graded Green.' },
      { title: coreStages[3], status: 'Completed', expected: 'Jan 13', actual: 'Jan 13', owner: 'System', updatedBy: 'Broadcast Engine', notes: 'Broadcasted to 6 verified manufacturers in region.' },
      { title: coreStages[4], status: 'Completed', expected: 'Jan 15', actual: 'Jan 15', owner: 'AI Engine', updatedBy: 'Ranking Engine', notes: 'Top 3 quotes pinned with SLA weightage highest.' },
      { title: coreStages[5], status: 'Completed', expected: 'Jan 18', actual: 'Jan 17', owner: 'Customer', updatedBy: 'Anita', notes: 'Tri-party contract digitally accepted; escrow Milestone 1 received.' },
      { title: coreStages[6], status: 'In Progress', expected: 'Jan 22', actual: null, owner: 'Manufacturer', updatedBy: 'GAD Lead', notes: 'Architect and MEP approvals pending reminder.' },
      { title: coreStages[7], status: 'Pending', expected: 'Feb 2', actual: null, owner: 'Manufacturer', updatedBy: null, notes: 'Production will start post GAD approval + escrow confirmation.' },
      { title: coreStages[8], status: 'Pending', expected: 'Feb 18', actual: null, owner: 'Manufacturer', updatedBy: null, notes: 'Milestone sub-stages for rails, machine, doors, wiring, testing.' },
      { title: coreStages[9], status: 'Pending', expected: 'Mar 2', actual: null, owner: 'Lift4M', updatedBy: null, notes: 'Handover includes license, digital logbook, AMC activation.' }
    ]
  },
  {
    id: 'PRJ-202',
    name: 'Heritage Plaza — Modernization',
    building: 'Heritage Plaza, Pune',
    type: 'retrofit',
    owner: 'Building Manager',
    manager: 'Ravi (Lift4M)',
    manufacturer: 'Nova Elevators',
    status: 'In Progress',
    stages: [
      { title: `${coreStages[0]} + existing lift constraints`, status: 'Completed', expected: 'Jan 6', actual: 'Jan 6', owner: 'Customer', updatedBy: 'Ravi', notes: 'Legacy lift captured; reuse options logged.' },
      { title: `${coreStages[1]} with demolition and reuse checks`, status: 'In Progress', expected: 'Jan 10', actual: null, owner: 'Customer', updatedBy: 'Ravi', notes: 'Demolition constraints pending builder confirmation.' },
      { title: coreStages[2], status: 'Pending', expected: 'Jan 15', actual: null, owner: 'Survey Partner', updatedBy: null, notes: 'Schedule site survey once demolition plan ready.' },
      { title: coreStages[3], status: 'Pending', expected: 'Jan 20', actual: null, owner: 'System', updatedBy: null, notes: 'Will broadcast to modernization-certified manufacturers.' },
      { title: coreStages[4], status: 'Pending', expected: 'Jan 25', actual: null, owner: 'AI Engine', updatedBy: null, notes: 'Ranking weights emphasize emergency response and reuse pricing.' },
      { title: coreStages[5], status: 'Pending', expected: 'Jan 28', actual: null, owner: 'Customer', updatedBy: null, notes: 'Tri-party contract includes demolition and reuse clauses.' },
      { title: coreStages[6], status: 'Pending', expected: 'Feb 2', actual: null, owner: 'Manufacturer', updatedBy: null, notes: 'GAD to reflect retrofit constraints.' },
      { title: coreStages[7], status: 'Pending', expected: 'Feb 10', actual: null, owner: 'Manufacturer', updatedBy: null, notes: 'Production planned after structural readiness.' },
      { title: coreStages[8], status: 'Pending', expected: 'Feb 24', actual: null, owner: 'Manufacturer', updatedBy: null, notes: 'Installation to follow gated checklists and photo proofs.' },
      { title: coreStages[9], status: 'Pending', expected: 'Mar 3', actual: null, owner: 'Lift4M', updatedBy: null, notes: 'Digital logbook to inherit prior service history.' }
    ]
  },
  {
    id: 'SRV-88',
    name: 'Breakdown Ticket — Tower B',
    building: 'Lumen Heights, Bengaluru',
    type: 'service',
    owner: 'Building Manager',
    manager: 'Priya (Lift4M)',
    manufacturer: 'Service Pool',
    status: 'At Risk',
    stages: [
      { title: 'Service Request Created / Need Discovery', status: 'Completed', expected: 'Jan 5', actual: 'Jan 5', owner: 'Customer', updatedBy: 'Priya', notes: 'Breakdown reported with basic details.' },
      { title: 'Smart Issue Form + Photos/Video Upload', status: 'Completed', expected: 'Jan 5', actual: 'Jan 5', owner: 'Customer', updatedBy: 'Priya', notes: 'Photos and voice note captured; ARD issue suspected.' },
      { title: 'Onsite Diagnosis & Feasibility', status: 'Completed', expected: 'Jan 6', actual: 'Jan 6', owner: 'Technician', updatedBy: 'GPS Tech', notes: 'Diagnosis completed; part replacement needed.' },
      { title: 'Lead Broadcast to Service Providers', status: 'Completed', expected: 'Jan 6', actual: 'Jan 6', owner: 'System', updatedBy: 'Broadcast Engine', notes: 'Sent to 4 AMC partners with ARD expertise.' },
      { title: 'AI Ranking & Top 3 Service Quotes / AMC Plans', status: 'Completed', expected: 'Jan 6', actual: 'Jan 6', owner: 'AI Engine', updatedBy: 'Ranking Engine', notes: 'Reliability and SLA speed weightages tuned to 40%.' },
      { title: 'Contract / Work Order Confirmation', status: 'Completed', expected: 'Jan 6', actual: 'Jan 6', owner: 'Customer', updatedBy: 'Priya', notes: 'Work order signed; SLA countdown started.' },
      { title: 'Service Execution & Parts Tracking', status: 'In Progress', expected: 'Jan 7', actual: null, owner: 'Maintenance Provider', updatedBy: 'Tech Lead', notes: 'Part delivery ETA today; live SLA timer running.' },
      { title: 'Closure + Digital Logbook Update & Feedback', status: 'Pending', expected: 'Jan 8', actual: null, owner: 'Maintenance Provider', updatedBy: null, notes: 'Awaiting closure proof and customer feedback.' },
      { title: 'AMC Activation & SLA Monitoring', status: 'Pending', expected: 'Jan 15', actual: null, owner: 'Lift4M', updatedBy: null, notes: 'Offer AMC options post closure; extend SLA coverage.' }
    ]
  }
];

const roleSelect = document.getElementById('roleSelect');
const projectTypeSelect = document.getElementById('projectTypeSelect');
const summaryGrid = document.getElementById('summaryGrid');
const timelineEl = document.getElementById('timeline');
const stageDetails = document.getElementById('stageDetails');
const stageMapping = document.getElementById('stageMapping');
const aiRanking = document.getElementById('aiRanking');

function initSelectors() {
  roles.forEach((role) => {
    const opt = document.createElement('option');
    opt.value = role.id;
    opt.textContent = role.label;
    roleSelect.appendChild(opt);
  });

  Object.entries(projectTypeMappings).forEach(([key, mapping]) => {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = mapping.label;
    projectTypeSelect.appendChild(opt);
  });

  roleSelect.value = roles[0].id;
  projectTypeSelect.value = 'new-installation';
}

function renderSummary(roleId) {
  const role = roles.find((r) => r.id === roleId);
  summaryGrid.innerHTML = '';
  role.summary.forEach((item) => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <p class="eyebrow">${item.title}</p>
      <h3>${item.value}</h3>
      <p class="subhead">${item.descriptor}</p>
      <span class="badge badge-soft">${item.badge}</span>
    `;
    summaryGrid.appendChild(div);
  });

  const todo = document.createElement('div');
  todo.className = 'card';
  todo.innerHTML = `
    <p class="eyebrow">What’s next</p>
    <h3>Priority actions</h3>
    <ul class="section-list">${role.tasks.map((t) => `<li>${t}</li>`).join('')}</ul>
  `;
  summaryGrid.appendChild(todo);
}

function renderTimeline(roleId, projectType) {
  const filteredProjects = projects.filter((p) => p.type === projectType || projectType === 'all');
  const roleLabel = roles.find((r) => r.id === roleId).label;

  timelineEl.innerHTML = '';
  if (!filteredProjects.length) {
    timelineEl.innerHTML = `<p class="subhead">No projects for ${roleLabel} yet. Create a project to see the stage timeline.</p>`;
    return;
  }

  filteredProjects.forEach((project) => {
    const activeStage = project.stages.find((s) => s.status === 'In Progress') || project.stages.find((s) => s.status === 'Pending');
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.onclick = () => renderStageDetails(project, activeStage);

    const statusClass = activeStage?.status === 'Completed' ? 'status-completed' : activeStage?.status === 'In Progress' ? 'status-in-progress' : 'status-pending';

    item.innerHTML = `
      <div>
        <div class="timeline-meta">
          <span class="status-dot ${statusClass}"></span>
          <strong>${project.name}</strong>
          <span class="chip chip-${project.status === 'At Risk' ? 'red' : 'green'}">${project.status}</span>
          <span class="chip">${project.type === 'service' ? 'Service / AMC' : projectTypeMappings[project.type].label}</span>
        </div>
        <p class="subhead">${project.building}</p>
      </div>
      <div class="timeline-meta">
        <span>Owner: ${project.owner}</span>
        <span>Manager: ${project.manager}</span>
      </div>
      <div class="timeline-meta">
        <span>Current: <strong>${activeStage?.title ?? 'Not started'}</strong></span>
        <span>Expected: ${activeStage?.expected ?? '--'}</span>
      </div>
    `;
    timelineEl.appendChild(item);
  });
}

function renderStageDetails(project, stage) {
  if (!stage) return;
  stageDetails.innerHTML = `
    <div class="stage-details">
      <p class="eyebrow">${project.id}</p>
      <h3>${project.name}</h3>
      <p class="subhead">${project.building} — Managed by ${project.manager}</p>
      <div class="timeline-meta" style="margin: 12px 0;">
        <span class="chip">${project.owner}</span>
        <span class="chip">Manufacturer: ${project.manufacturer}</span>
        <span class="chip">${projectTypeMappings[project.type]?.label ?? 'Service'}</span>
      </div>
      <h4 style="margin: 12px 0 6px;">Stage details</h4>
      <ul class="section-list">
        <li><strong>Status:</strong> ${stage.status}</li>
        <li><strong>Expected date:</strong> ${stage.expected}</li>
        <li><strong>Actual completion:</strong> ${stage.actual ?? '—'}</li>
        <li><strong>Responsible party:</strong> ${stage.owner}</li>
        <li><strong>Last updated by:</strong> ${stage.updatedBy ?? 'Pending'}</li>
        <li><strong>Notes:</strong> ${stage.notes}</li>
      </ul>
      <p class="subhead">Click other timeline rows to inspect their current stage and audit trail.</p>
    </div>
  `;
}

function renderStageMapping(projectType) {
  const mapping = projectTypeMappings[projectType];
  stageMapping.innerHTML = `
    <div class="stage-mapping">
      <p class="eyebrow">Stage Engine</p>
      <h3>${mapping.label} workflow</h3>
      <p class="subhead">${mapping.notes}</p>
      <table class="table">
        <thead>
          <tr><th>#</th><th>Stage</th><th>Auditability</th></tr>
        </thead>
        <tbody>
          ${mapping.stages
            .map(
              (stage, idx) => `
                <tr>
                  <td>${idx + 1}</td>
                  <td>${stage}</td>
                  <td><span class="chip chip-green">Trackable</span></td>
                </tr>
              `
            )
            .join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderAIRanking() {
  aiRanking.innerHTML = `
    <div>
      <p class="eyebrow">AI Ranking Engine</p>
      <h3>Configurable weightages</h3>
      <p class="subhead">Tune reliability, SLA speed, AMC cost, and warranty prominence per project type.</p>
      <div class="summary-grid">
        ${[
          { label: 'Emergency response SLA', value: '40%' },
          { label: 'Service reliability rating', value: '20%' },
          { label: 'Delivery lead time', value: '15%' },
          { label: 'Warranty & AMC', value: '15%' },
          { label: 'Total cost of ownership', value: '10%' }
        ]
          .map(
            (item) => `
              <div class="card">
                <p class="eyebrow">${item.label}</p>
                <h3>${item.value}</h3>
                <p class="subhead">Configurable per project type; exportable for audits.</p>
              </div>
            `
          )
          .join('')}
      </div>
      <ul class="section-list">
        <li>Only standardized quotes allowed; IS 17900-1 & 17900-2 compliance enforced.</li>
        <li>Tri-party contract generation with escrow-linked milestones and reminder engine.</li>
        <li>Digital logbook and AMC activation automatically attach to handover stage.</li>
      </ul>
    </div>
  `;
}

function bootstrap() {
  initSelectors();
  renderSummary(roleSelect.value);
  renderTimeline(roleSelect.value, projectTypeSelect.value);
  renderStageDetails(projects[0], projects[0].stages[6]);
  renderStageMapping(projectTypeSelect.value);
  renderAIRanking();

  roleSelect.addEventListener('change', () => {
    renderSummary(roleSelect.value);
    renderTimeline(roleSelect.value, projectTypeSelect.value);
  });

  projectTypeSelect.addEventListener('change', () => {
    renderTimeline(roleSelect.value, projectTypeSelect.value);
    renderStageMapping(projectTypeSelect.value);
  });
}

bootstrap();
