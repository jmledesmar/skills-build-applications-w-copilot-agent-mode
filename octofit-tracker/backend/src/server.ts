import express from 'express'
import mongoose from 'mongoose'
import { User } from './models/User'
import { Team } from './models/Team'
import { Activity } from './models/Activity'
import { LeaderboardEntry } from './models/LeaderboardEntry'
import { Workout } from './models/Workout'

const app = express()
const port = process.env.PORT ? Number(process.env.PORT) : 8000
const host = '0.0.0.0'
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db'
const apiBaseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.githubpreview.dev`
  : `http://localhost:${port}`

app.use(express.json())

app.get('/api/health', async (_req, res) => {
  const usersCount = await User.countDocuments()
  const teamsCount = await Team.countDocuments()
  res.json({
    status: 'ok',
    service: 'OctoFit Tracker API',
    apiBaseUrl,
    collections: {
      users: usersCount,
      teams: teamsCount
    }
  })
})

app.get('/api/users', async (_req, res) => {
  const users = await User.find().lean()
  res.json({ users })
})

app.get('/api/teams', async (_req, res) => {
  const teams = await Team.find().lean()
  res.json({ teams })
})

app.get('/api/activities', async (_req, res) => {
  const activities = await Activity.find().lean()
  res.json({ activities })
})

app.get('/api/leaderboard', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 }).lean()
  res.json({ leaderboard })
})

app.get('/api/workouts', async (_req, res) => {
  const workouts = await Workout.find().lean()
  res.json({ workouts })
})

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected:', mongoUri)
    app.listen(port, host, () => {
      console.log(`Backend listening on ${apiBaseUrl}`)
    })
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error)
    process.exit(1)
  })
