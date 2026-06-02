import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { createProxyMiddleware } from 'http-proxy-middleware'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const PORT = process.env.PORT || 3000
const HOST = '0.0.0.0'

// API proxy target
const apiTarget = process.env.VITE_API_URL || process.env.API_URL || 'http://localhost:8080'

// Proxy /api to backend
app.use('/api', createProxyMiddleware({ target: apiTarget, changeOrigin: true }))

// Serve static files from dist
const staticPath = path.join(__dirname, 'dist')
app.use(express.static(staticPath))

// SPA fallback - return index.html for any non-static route
app.get('*', (_req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'))
})

app.listen(PORT, HOST, () => {
  console.log(`Static server running on http://${HOST}:${PORT}, proxying /api -> ${apiTarget}`)
})
