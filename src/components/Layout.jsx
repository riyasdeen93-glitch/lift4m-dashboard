import React from 'react'

export default function Layout({ user, onLogout, children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-liftBlue text-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="font-semibold text-lg">Lift4M</div>
          {user && (
            <div className="flex items-center gap-4 text-sm">
              <div>
                <div className="font-medium">{user.name}</div>
                <div className="text-xs text-slate-100">
                  {user.role.replace('_', ' ')}
                </div>
              </div>
              <button
                onClick={onLogout}
                className="border border-white/40 px-3 py-1 rounded text-xs hover:bg-white/10"
              >
                Switch user
              </button>
            </div>
          )}
        </div>
      </header>
      <main className="flex-1 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          {children}
        </div>
      </main>
      <footer className="border-t border-slate-200 text-xs text-slate-500 py-4 text-center">
        © 2025 Lift4M demo — timelines & workflows for lifts.
      </footer>
    </div>
  )
}
