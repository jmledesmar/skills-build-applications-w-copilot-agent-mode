import mongoose from 'mongoose'

const leaderboardEntrySchema = new mongoose.Schema(
  {
    rank: { type: Number, required: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    score: { type: Number, required: true }
  },
  { timestamps: true }
)

export const LeaderboardEntry = mongoose.models.LeaderboardEntry || mongoose.model('LeaderboardEntry', leaderboardEntrySchema)
