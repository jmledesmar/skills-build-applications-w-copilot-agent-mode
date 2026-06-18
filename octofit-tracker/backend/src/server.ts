import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = process.env.PORT ? Number(process.env.PORT) : 8000
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit-tracker'

app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'OctoFit Tracker API' })
})

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello from OctoFit Tracker backend!' })
})

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected:', mongoUri)
    app.listen(port, () => {
      console.log(`Backend listening on http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error)
    process.exit(1)
  })
