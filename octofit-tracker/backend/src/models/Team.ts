import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: String }],
    captain: { type: String }
  },
  { timestamps: true }
)

export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema)
