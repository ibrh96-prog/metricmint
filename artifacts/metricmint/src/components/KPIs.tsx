import React from 'react'

export default function KPIs({ summary }: { summary: any }){
  const Card = ({ children }: any) => (
    <div className="rounded-xl bg-white dark:bg-slate-800 shadow-sm p-6">
      {children}
    </div>
  )

  const Label = ({ children }: any) => (
    <div className="text-sm text-slate-500 dark:text-slate-400">{children}</div>
  )
  const Value = ({ children, positive }: any) => (
    <div className={`mt-2 text-2xl lg:text-3xl font-bold ${positive ? 'text-emerald-600' : 'text-slate-900 dark:text-slate-100'}`}>
      {children}
    </div>
  )

  if (!summary) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[0,1,2,3].map(i=> (
        <div key={i} className="rounded-xl bg-white dark:bg-slate-800 shadow-sm p-6">Loading</div>
      ))}
    </div>
  )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <Label>Net MRR</Label>
        <Value positive>{`$${summary.net_mrr}`}</Value>
      </Card>
      <Card>
        <Label>MRR Growth</Label>
        <Value positive={summary.growth_pct && summary.growth_pct >= 0}>{summary.growth_pct === null ? '—' : `${summary.growth_pct}%`}</Value>
      </Card>
      <Card>
        <Label>Churn Rate</Label>
        <Value positive={false}>{summary.churn_rate === null ? '—' : `${summary.churn_rate}%`}</Value>
      </Card>
      <Card>
        <Label>ARPU</Label>
        <Value positive>{summary.arpu === null ? '—' : `$${summary.arpu}`}</Value>
      </Card>
    </div>
  )
}
