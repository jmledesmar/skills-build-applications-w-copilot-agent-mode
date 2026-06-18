import { useEffect, useState } from 'react'
import { apiEndpoint, normalizeArrayResponse } from './api'

interface Workout {
  _id?: string
  id?: string
  title: string
  description: string
  durationMinutes: number
  intensity: string
  focusArea: string
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(apiEndpoint('workouts'))
      .then((response) => response.json())
      .then((data) => setWorkouts(normalizeArrayResponse<Workout>(data)))
      .catch((err) => setError(err.message || 'Failed to load workouts'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container py-4">
      <h2>Workouts</h2>
      {loading && <p>Loading workouts…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && workouts.length === 0 && <p>No workouts found.</p>}
      {workouts.length > 0 && (
        <div className="row g-3">
          {workouts.map((workout) => (
            <div className="col-md-6" key={workout._id ?? workout.id ?? workout.title}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{workout.title}</h5>
                  <p className="card-text">{workout.description}</p>
                  <ul className="list-unstyled">
                    <li>Duration: {workout.durationMinutes} min</li>
                    <li>Intensity: {workout.intensity}</li>
                    <li>Focus: {workout.focusArea}</li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
