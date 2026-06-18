import { useEffect, useState } from 'react'
import { apiEndpoint, normalizeArrayResponse } from './api'

interface Activity {
  _id?: string
  id?: string
  type: string
  userId: string
  distanceKm?: number
  durationMinutes: number
  caloriesBurned?: number
  date: string
}

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(apiEndpoint('activities'))
      .then((response) => response.json())
      .then((data) => setActivities(normalizeArrayResponse<Activity>(data)))
      .catch((err) => setError(err.message || 'Failed to load activities'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container py-4">
      <h2>Activities</h2>
      {loading && <p>Loading activities…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && activities.length === 0 && <p>No activities found.</p>}
      {activities.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Type</th>
                <th>User</th>
                <th>Distance (km)</th>
                <th>Duration (min)</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id ?? activity.id ?? `${activity.type}-${activity.date}`}>
                  <td>{activity.type}</td>
                  <td>{activity.userId}</td>
                  <td>{activity.distanceKm ?? '—'}</td>
                  <td>{activity.durationMinutes}</td>
                  <td>{activity.caloriesBurned ?? '—'}</td>
                  <td>{new Date(activity.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
