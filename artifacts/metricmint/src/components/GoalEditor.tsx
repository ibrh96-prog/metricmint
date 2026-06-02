import React, { useEffect, useState } from 'react'

export default function GoalEditor({ summary, onUpdate }: any){
  const [goal, setGoal] = useState('')
  useEffect(()=>{ (async ()=>{ const s = await fetch('/api/settings').then(r=>r.json()); setGoal(s?.mrr_goal || '10000.00') })() }, [])
  const save = async ()=>{ await fetch('/api/settings', { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ mrr_goal: goal }) }); onUpdate && onUpdate() }
  const current = summary?.net_mrr || 0
  const pct = Number(goal) === 0 ? 0 : Math.min(100, (Number(current)/Number(goal))*100)
  return (
    <div className="rounded-xl bg-white dark:bg-slate-800 shadow-sm p-6 lg:col-span-2 overflow-hidden">
      <div className="flex flex-col gap-4">
        <div>
          <div className="text-sm text-slate-500 dark:text-slate-400">Goal MRR</div>
          <div className="text-2xl font-bold mt-1">${goal}</div>
        </div>

        <div className="w-full">
          <div className="bg-slate-200 dark:bg-slate-700 h-3 rounded overflow-hidden w-full">
            <div style={{ width: pct + '%' }} className="bg-emerald-500 h-3" />
          </div>
        </div>

        <div className="w-full mt-1">
          <div className="flex items-center gap-3 w-full">
            <input value={goal} onChange={e=>setGoal(e.target.value)} className="flex-1 p-2 rounded border bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700" />
            <button onClick={save} className="w-32 flex-shrink-0 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded">Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}
