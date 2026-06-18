import { useEffect, useState } from 'react'
import { apiEndpoint, normalizeArrayResponse } from './api'

interface LeaderboardEntry {
  _id?: string
  rank: number
  userId?: string
  userName: string
  score: number
}

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(apiEndpoint('leaderboard'))
      .then((response) => response.json())
      .then((data) => setEntries(normalizeArrayResponse<LeaderboardEntry>(data)))
      .catch((err) => setError(err.message || 'Failed to load leaderboard'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container py-4">
      <h2>Leaderboard</h2>
      {loading && <p>Loading leaderboard…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && entries.length === 0 && <p>No leaderboard entries found.</p>}
      {entries.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id ?? entry.rank}>
                  <td>{entry.rank}</td>
                  <td>{entry.userName}</td>
                  <td>{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
