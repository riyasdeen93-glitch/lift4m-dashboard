import React from 'react'
import { PROJECT_TYPES } from '../data'

function typeLabel(type) {
  if (type === PROJECT_TYPES.NEW) return 'New Installation'
  if (type === PROJECT_TYPES.RETROFIT) return 'Retrofit'
  if (type === PROJECT_TYPES.SERVICE) return 'Service / AMC'
  return type
}

export default function ProjectList({ user, projects, selectedProject, onSelectProject }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
      <div className="border-b border-slate-200 px-4 py-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-800">Projects</h2>
        <span className="text-[11px] text-slate-500 uppercase tracking-wide">
          {projects.length} active
        </span>
      </div>
      <div className="divide-y divide-slate-100">
        {projects.map(p => {
          const isSelected = selectedProject && p.id === selectedProject.id
          const completedStages = p.stages.filter(s => s.status === 'completed').length
          const progress = Math.round((completedStages / p.stages.length) * 100)

          return (
            <button
              key={p.id}
              onClick={() => onSelectProject(p)}
              className={`w-full text-left px-4 py-3 text-sm hover:bg-slate-50 ${
                isSelected ? 'bg-slate-50 border-l-liftBlue border-l-2' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="font-medium text-slate-900">
                  {p.name}
                </div>
                <span className="text-[11px] rounded-full px-2 py-0.5 bg-slate-100 text-slate-600">
                  {typeLabel(p.type)}
                </span>
              </div>
              <div className="text-xs text-slate-500 mb-1">
                {p.address}
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 bg-slate-200 rounded-full flex-1 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-[11px] text-slate-500">{progress}%</span>
              </div>
            </button>
          )
        })}

        {projects.length === 0 && (
          <div className="px-4 py-6 text-xs text-slate-400 text-center">
            No projects yet for this profile.
          </div>
        )}
      </div>
    </div>
  )
}
