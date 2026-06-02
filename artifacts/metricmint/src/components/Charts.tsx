import React from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, LineChart, Line, CartesianGrid, ResponsiveContainer } from 'recharts'

export default function Charts({ metrics }: { metrics: any[] }){
  const data = metrics.map((m:any)=>({
    month: m.month,
    net: Number(m.new_mrr) - Number(m.churned_mrr),
    new_mrr: Number(m.new_mrr),
    churned_mrr: Number(m.churned_mrr),
    churned_customers: Number(m.churned_customers)
  }))
  // build running net
  let running = 0
  const areaData = data.map(d=>{ running += d.net; return { ...d, running } })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
      <div className="rounded-xl bg-white dark:bg-slate-800 shadow-sm p-6 overflow-hidden min-w-0">
        <h3 className="font-semibold mb-2">12-month Net MRR</h3>
        <div className="w-full min-w-0">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="net" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="running" stroke="#059669" fill="url(#net)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="rounded-xl bg-white dark:bg-slate-800 shadow-sm p-6 overflow-hidden min-w-0">
        <h3 className="font-semibold mb-2">Net New MRR</h3>
        <div className="w-full min-w-0">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="new_mrr" fill="#10b981" />
              <Bar dataKey="churned_mrr" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="rounded-xl bg-white dark:bg-slate-800 shadow-sm p-6 md:col-span-2 overflow-hidden min-w-0">
        <h3 className="font-semibold mb-2">Churn Trend</h3>
        <div className="w-full min-w-0">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#eee" />
              <Line type="monotone" dataKey="churned_customers" stroke="#ef4444" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
