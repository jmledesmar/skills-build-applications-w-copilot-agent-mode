import { useEffect, useState } from 'react'
import { apiEndpoint, normalizeArrayResponse } from './api'

interface Team {
  _id?: string
  id?: string
  name: string
  description: string
  members?: string[]
  captain?: string
}

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(apiEndpoint('teams'))
      .then((response) => response.json())
      .then((data) => setTeams(normalizeArrayResponse<Team>(data)))
      .catch((err) => setError(err.message || 'Failed to load teams'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container py-4">
      <h2>Teams</h2>
      {loading && <p>Loading teams…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && teams.length === 0 && <p>No teams found.</p>}
      {teams.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Members</th>
                <th>Captain</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id ?? team.id ?? team.name}>
                  <td>{team.name}</td>
                  <td>{team.description}</td>
                  <td>{team.members?.length ?? 0}</td>
                  <td>{team.captain || 'TBD'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
