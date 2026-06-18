/**
 * Seed the octofit_db database with test data
 */
import mongoose from 'mongoose'
import { User } from '../models/User.js'
import { Team } from '../models/Team.js'
import { Activity } from '../models/Activity.js'
import { LeaderboardEntry } from '../models/LeaderboardEntry.js'
import { Workout } from '../models/Workout.js'

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db'

async function seed() {
  console.log('Seed the octofit_db database with test data')
  await mongoose.connect(mongoUri)
  console.log('Connected to MongoDB for seeding:', mongoUri)

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({})
  ])

  const users = await User.create([
    { name: 'Ari Octo', email: 'ari@octofit.io', role: 'athlete', teamId: 'team-1' },
    { name: 'Nova Reef', email: 'nova@octofit.io', role: 'coach', teamId: 'team-1' },
    { name: 'Kai Marina', email: 'kai@octofit.io', role: 'athlete', teamId: 'team-2' }
  ])

  const teams = await Team.create([
    {
      name: 'Team Kraken',
      description: 'A group of competitive ocean athletes',
      members: [users[0].id, users[1].id],
      captain: users[1].id
    },
    {
      name: 'Team Coral',
      description: 'Strength and endurance training crew',
      members: [users[2].id],
      captain: users[2].id
    }
  ])

  const activities = await Activity.create([
    {
      type: 'running',
      userId: users[0].id,
      distanceKm: 12.3,
      durationMinutes: 68,
      caloriesBurned: 820,
      date: new Date('2026-06-10T08:30:00.000Z')
    },
    {
      type: 'cycling',
      userId: users[2].id,
      distanceKm: 40,
      durationMinutes: 115,
      caloriesBurned: 1020,
      date: new Date('2026-06-11T16:00:00.000Z')
    },
    {
      type: 'swimming',
      userId: users[0].id,
      durationMinutes: 50,
      caloriesBurned: 520,
      date: new Date('2026-06-12T07:15:00.000Z')
    }
  ])

  const leaderboardEntries = await LeaderboardEntry.create([
    { rank: 1, userId: users[0].id, userName: users[0].name, score: 1120 },
    { rank: 2, userId: users[2].id, userName: users[2].name, score: 980 },
    { rank: 3, userId: users[1].id, userName: users[1].name, score: 945 }
  ])

  const workouts = await Workout.create([
    {
      title: 'Marina Strength Circuit',
      description: 'A high-intensity strength session for swimmers and runners.',
      durationMinutes: 45,
      intensity: 'high',
      focusArea: 'full body'
    },
    {
      title: 'Recovery Flow',
      description: 'Low-impact mobility and stretching to support recovery.',
      durationMinutes: 30,
      intensity: 'low',
      focusArea: 'mobility'
    }
  ])

  console.log('Seed completed:')
  console.log('Users:', users.length)
  console.log('Teams:', teams.length)
  console.log('Activities:', activities.length)
  console.log('Leaderboard entries:', leaderboardEntries.length)
  console.log('Workouts:', workouts.length)

  await mongoose.disconnect()
  console.log('MongoDB disconnected after seeding')
}

seed().catch((error) => {
  console.error('Seeding failed:', error)
  process.exit(1)
})
