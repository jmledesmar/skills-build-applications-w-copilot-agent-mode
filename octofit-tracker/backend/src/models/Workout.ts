import mongoose from 'mongoose'

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    intensity: { type: String, required: true },
    focusArea: { type: String, required: true }
  },
  { timestamps: true }
)

export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema)
