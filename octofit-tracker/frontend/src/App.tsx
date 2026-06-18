import { Routes, Route, Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container py-5">
      <h1>OctoFit Tracker</h1>
      <p>Modern React 19 + Vite starter for the OctoFit multi-tier app.</p>
      <Link to="/dashboard" className="btn btn-primary">
        View Dashboard
      </Link>
    </div>
  )
}

function Dashboard() {
  return (
    <div className="container py-5">
      <h2>Dashboard</h2>
      <p>Backend API and MongoDB will power this tracker.</p>
      <Link to="/" className="btn btn-secondary">
        Back Home
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}
