import { NavLink, Routes, Route } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import 'bootstrap/dist/css/bootstrap.min.css'

const navItems = [
  { path: '/users', label: 'Users' },
  { path: '/teams', label: 'Teams' },
  { path: '/activities', label: 'Activities' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/workouts', label: 'Workouts' }
]

function Home() {
  return (
    <div className="container py-5">
      <h1>OctoFit Tracker</h1>
      <p>Modern React 19 + Vite starter for the OctoFit multi-tier app.</p>
      <p>
        This app uses <code>VITE_CODESPACE_NAME</code> to build the backend API URL
        for Codespaces. If the variable is missing, it falls back to
        <code>http://localhost:8000</code>.
      </p>
      <p>
        Example API endpoint:
        <code>
          https://&lt;VITE_CODESPACE_NAME&gt;-8000.app.github.dev/api/users
        </code>
      </p>
    </div>
  )
}

function Layout() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            OctoFit Tracker
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {navItems.map((item) => (
                <li className="nav-item" key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </div>
  )
}

export default function App() {
  return <Layout />
}
