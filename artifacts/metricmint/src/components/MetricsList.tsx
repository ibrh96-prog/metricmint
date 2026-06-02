import React from 'react'

export default function MetricsList({ metrics, onChanged }: any){
  const del = async (id:number) => { await fetch('/api/metrics/' + id, { method: 'DELETE' }); onChanged && onChanged(); }
  return (
    <div className="rounded-xl bg-white dark:bg-slate-800 shadow-sm p-6 flex-1 overflow-auto">
      <h3 className="font-semibold mb-3">Monthly Records</h3>
      {metrics.length === 0 && <div className="text-sm text-slate-500 dark:text-slate-400">No records yet</div>}
      <div className="overflow-auto">
        <table className="w-full text-left table-auto">
          <thead className="text-sm text-slate-500 dark:text-slate-400"><tr><th className="px-2 py-1">Month</th><th className="px-2 py-1">New MRR</th><th className="px-2 py-1">Churn MRR</th><th className="px-2 py-1">New Cust</th><th className="px-2 py-1">Churn Cust</th><th className="px-2 py-1"></th></tr></thead>
          <tbody>
            {metrics.map((m:any)=>(
              <tr key={m.id} className="border-t border-gray-100 dark:border-gray-700">
                <td className="px-2 py-2">{m.month}</td>
                <td className="px-2 py-2 text-emerald-600">${m.new_mrr}</td>
                <td className="px-2 py-2 text-red-500">${m.churned_mrr}</td>
                <td className="px-2 py-2">{m.new_customers}</td>
                <td className="px-2 py-2">{m.churned_customers}</td>
                <td className="px-2 py-2"><button onClick={()=>del(m.id)} className="text-red-600">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
