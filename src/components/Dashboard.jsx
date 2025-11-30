import React from 'react'
import ProjectList from './ProjectList'
import ProjectTimeline from './ProjectTimeline'
import StageDetailPanel from './StageDetailPanel'

export default function Dashboard({
  user,
  projects,
  selectedProject,
  onSelectProject,
  selectedStage,
  onSelectStage
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <div className="space-y-4">
        <ProjectList
          user={user}
          projects={projects}
          selectedProject={selectedProject}
          onSelectProject={onSelectProject}
        />
      </div>

      {selectedProject ? (
        <div className="space-y-4">
          <ProjectTimeline
            project={selectedProject}
            selectedStage={selectedStage}
            onSelectStage={onSelectStage}
          />
          {selectedStage && (
            <StageDetailPanel
              stage={selectedStage}
            />
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center bg-white rounded-lg border border-dashed border-slate-300 text-slate-400 text-sm">
          Select a project to see its workflow timeline.
        </div>
      )}
    </div>
  )
}
