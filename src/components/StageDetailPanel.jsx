import React from 'react'
import { getStageDefinition, STATUS_LABELS } from '../data'

export default function StageDetailPanel({ stage }) {
  const def = getStageDefinition(stage.id)

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-semibold text-slate-900">
          {def?.name ?? `Stage ${stage.id}`}
        </h3>
        <span className="text-[11px] text-slate-500">
          {STATUS_LABELS[stage.status] ?? stage.status}
        </span>
      </div>
      <p className="text-xs text-slate-500 mb-3">
        Canonical stage #{stage.id} in the Lift4M workflow backbone.
      </p>

      <dl className="grid grid-cols-2 gap-x-6 gap-y-1 text-[11px] text-slate-600 mb-3">
        {stage.expected && (
          <>
            <dt className="font-medium">Expected by</dt>
            <dd>{stage.expected}</dd>
          </>
        )}
        {stage.actual && (
          <>
            <dt className="font-medium">Completed on</dt>
            <dd>{stage.actual}</dd>
          </>
        )}
        {stage.owner && (
          <>
            <dt className="font-medium">Responsible party</dt>
            <dd>{stage.owner}</dd>
          </>
        )}
      </dl>

      <div>
        <div className="text-[11px] font-semibold text-slate-700 mb-1">
          Notes / events
        </div>
        {stage.notes && stage.notes.length > 0 ? (
          <ul className="text-[11px] text-slate-600 list-disc pl-4 space-y-0.5">
            {stage.notes.map((n, idx) => (
              <li key={idx}>{n}</li>
            ))}
          </ul>
        ) : (
          <p className="text-[11px] text-slate-400">
            No notes logged yet for this stage.
          </p>
        )}
      </div>
    </div>
  )
}
