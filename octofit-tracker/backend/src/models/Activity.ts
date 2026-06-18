import mongoose from 'mongoose'

const activitySchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    userId: { type: String, required: true },
    distanceKm: { type: Number, required: false },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: false },
    date: { type: Date, required: true }
  },
  { timestamps: true }
)

export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema)
