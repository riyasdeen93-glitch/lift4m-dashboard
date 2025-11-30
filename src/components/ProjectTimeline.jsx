import React from 'react'
import { getStageDefinition, STATUS_COLORS, STATUS_LABELS } from '../data'

export default function ProjectTimeline({ project, selectedStage, onSelectStage }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
      <div className="border-b border-slate-200 px-4 py-2 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">Timeline</h2>
          <p className="text-[11px] text-slate-500">
            Click any stage for details, photos & owners.
          </p>
        </div>
        <div className="text-[11px] text-slate-500">
          {project.stages.filter(s => s.status === 'completed').length} /
          {project.stages.length} stages complete
        </div>
      </div>
      <div className="p-4">
        <ol className="relative border-l border-slate-200">
          {project.stages.map(stage => {
            const def = getStageDefinition(stage.id)
            const active = selectedStage && selectedStage.id === stage.id
            const dotColor = STATUS_COLORS[stage.status] ?? 'bg-slate-400'

            return (
              <li key={stage.id} className="mb-5 ml-4">
                <div
                  className={`absolute w-3 h-3 rounded-full -left-[6px] top-1.5 border border-white shadow ${dotColor}`}
                />
                <button
                  onClick={() => onSelectStage(stage)}
                  className={`text-left w-full rounded-md px-2 py-1.5 ${
                    active ? 'bg-slate-50 border border-liftBlue/40' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-semibold text-slate-900">
                      {def?.name ?? `Stage ${stage.id}`}
                    </span>
                    <span
                      className={`text-[11px] text-white px-2 py-0.5 rounded-full capitalize ${dotColor}`}
                    >
                      {STATUS_LABELS[stage.status] ?? stage.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                    {stage.expected && <span>ETA: {stage.expected}</span>}
                    {stage.actual && <span>Done: {stage.actual}</span>}
                    {stage.owner && <span>Owner: {stage.owner}</span>}
                  </div>
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
