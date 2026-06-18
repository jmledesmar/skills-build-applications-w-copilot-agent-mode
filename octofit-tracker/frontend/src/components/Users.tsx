import { useEffect, useState } from 'react'
import { apiEndpoint, normalizeArrayResponse } from './api'

interface User {
  _id?: string
  id?: string
  name: string
  email: string
  role: string
  teamId?: string
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(apiEndpoint('users'))
      .then((response) => response.json())
      .then((data) => setUsers(normalizeArrayResponse<User>(data)))
      .catch((err) => setError(err.message || 'Failed to load users'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container py-4">
      <h2>Users</h2>
      {loading && <p>Loading users…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && users.length === 0 && <p>No users found.</p>}
      {users.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id ?? user.id ?? user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.teamId || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
