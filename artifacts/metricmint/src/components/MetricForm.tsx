import React, { useState } from 'react'

const empty = { month: '', new_mrr: '0.00', churned_mrr: '0.00', new_customers: 0, churned_customers: 0, refunds: '0.00' }

export default function MetricForm({ onSaved }: { onSaved?: () => void }){
  const [form, setForm] = useState<any>(empty)
  const submit = async (e:any) => {
    e.preventDefault()
    await fetch('/api/metrics', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(form) })
    setForm(empty)
    onSaved && onSaved()
  }
  return (
    <form onSubmit={submit} className="rounded-xl bg-white dark:bg-slate-800 shadow-sm p-6 flex-1">
      <h3 className="font-semibold mb-3">Add / Edit Metric</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input required placeholder="YYYY-MM" value={form.month} onChange={e=>setForm({...form, month: e.target.value})} className="p-2 rounded border bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700" />
        <input required placeholder="new_mrr" value={form.new_mrr} onChange={e=>setForm({...form, new_mrr: e.target.value})} className="p-2 rounded border bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700" />
        <input placeholder="churned_mrr" value={form.churned_mrr} onChange={e=>setForm({...form, churned_mrr: e.target.value})} className="p-2 rounded border bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700" />
        <input placeholder="new_customers" type="number" value={form.new_customers} onChange={e=>setForm({...form, new_customers: Number(e.target.value)})} className="p-2 rounded border bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700" />
        <input placeholder="churned_customers" type="number" value={form.churned_customers} onChange={e=>setForm({...form, churned_customers: Number(e.target.value)})} className="p-2 rounded border bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700" />
        <input placeholder="refunds" value={form.refunds} onChange={e=>setForm({...form, refunds: e.target.value})} className="p-2 rounded border bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700" />
      </div>
      <div className="mt-4">
        <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded">Save</button>
      </div>
    </form>
  )
}
