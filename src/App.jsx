import React, { useState, useMemo } from 'react'
import Layout from './components/Layout'
import RoleSelector from './components/RoleSelector'
import Dashboard from './components/Dashboard'
import { getProjectsForUser } from './data'

export default function App() {
  const [user, setUser] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedStage, setSelectedStage] = useState(null)

  const projects = useMemo(() => {
    if (!user) return []
    return getProjectsForUser(user)
  }, [user])

  const handleSelectUser = (u) => {
    setUser(u)
    setSelectedProject(null)
    setSelectedStage(null)
  }

  const handleLogout = () => {
    setUser(null)
    setSelectedProject(null)
    setSelectedStage(null)
  }

  const handleSelectProject = (project) => {
    setSelectedProject(project)
    setSelectedStage(null)
  }

  const handleSelectStage = (stage) => {
    setSelectedStage(stage)
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      {!user ? (
        <RoleSelector onSelect={handleSelectUser} />
      ) : (
        <Dashboard
          user={user}
          projects={projects}
          selectedProject={selectedProject}
          onSelectProject={handleSelectProject}
          selectedStage={selectedStage}
          onSelectStage={handleSelectStage}
        />
      )}
    </Layout>
  )
}
