import React, { useEffect, useState } from 'react'

export default function Header(){
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">MetricMint</h1>
        <div>
          <button onClick={() => setDark(d => !d)} className="inline-flex items-center px-3 py-1 rounded-full border bg-white dark:bg-gray-800 text-sm shadow-sm">
            {dark ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>
    </header>
  )
}
