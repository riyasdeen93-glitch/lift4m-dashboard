import React from 'react'
import { USERS } from '../data'

export default function RoleSelector({ onSelect }) {
  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-sm rounded-lg border border-slate-200 p-6">
      <h1 className="text-xl font-semibold mb-2 text-slate-900">
        Lift4M Demo Platform
      </h1>
      <p className="text-slate-600 mb-4 text-sm">
        Choose a profile to see how the project dashboards and timelines look
        for different stakeholders.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {USERS.map(user => (
          <button
            key={user.id}
            onClick={() => onSelect(user)}
            className="text-left border border-slate-200 rounded-lg p-3 hover:border-liftBlue hover:shadow-sm transition bg-slate-50"
          >
            <div className="font-medium text-slate-900">{user.name}</div>
            <div className="text-xs text-slate-500 capitalize">
              {user.role.replace('_', ' ')}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
