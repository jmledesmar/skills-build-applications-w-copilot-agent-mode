import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    teamId: { type: String, required: false },
    joinDate: { type: Date, default: () => new Date() }
  },
  { timestamps: true }
)

export const User = mongoose.models.User || mongoose.model('User', userSchema)
