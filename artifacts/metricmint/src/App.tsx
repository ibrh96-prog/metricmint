import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import KPIs from './components/KPIs'
import Charts from './components/Charts'
import MetricsList from './components/MetricsList'
import MetricForm from './components/MetricForm'
import GoalEditor from './components/GoalEditor'

export default function App() {
  const [metrics, setMetrics] = useState<any[]>([])
  const [summary, setSummary] = useState<any>(null)

  const fetchAll = async () => {
    const m = await fetch('/api/metrics').then(r => r.json())
    setMetrics(m)
    const s = await fetch('/api/summary').then(r => r.json())
    setSummary(s)
  }

  useEffect(() => { fetchAll() }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-slate-900 dark:text-slate-100">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8 lg:px-12">
        <div className="flex flex-col gap-6">
          <KPIs summary={summary} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <GoalEditor summary={summary} onUpdate={fetchAll} />
          </div>
          <Charts metrics={metrics} />
          <div className="flex flex-col lg:flex-row gap-4">
            <MetricForm onSaved={fetchAll} />
            <MetricsList metrics={metrics} onChanged={fetchAll} />
          </div>
        </div>
      </main>
    </div>
  )
}
