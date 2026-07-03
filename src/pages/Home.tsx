import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-light mb-2 text-vinyl-accent">VINYLDESK</h1>
        <p className="text-vinyl-text-muted text-sm tracking-wide">Your digital companion for analog listening</p>
      </div>

      <div className="space-y-8">
        {/* Collection Stats */}
        <div className="card text-center">
          <div className="text-3xl font-light mb-2">5</div>
          <div className="text-vinyl-text-muted text-sm">Albums in collection</div>
        </div>

        <div className="divider" />

        {/* Main Actions */}
        <div className="space-y-3">
          <Link 
            to="/listening"
            className="block w-full btn btn-primary text-center font-medium"
          >
            ▶ Start Listening
          </Link>
          <Link 
            to="/collection"
            className="block w-full btn btn-secondary text-center"
          >
            Browse Collection
          </Link>
        </div>

        <div className="divider" />

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-3">
          <Link 
            to="/stats"
            className="card text-center py-6 hover:border-vinyl-accent transition-colors"
          >
            <div className="text-2xl mb-2">📊</div>
            <div className="text-sm">Statistics</div>
          </Link>
          <Link 
            to="/collection"
            className="card text-center py-6 hover:border-vinyl-accent transition-colors"
          >
            <div className="text-2xl mb-2">⚙️</div>
            <div className="text-sm">Settings</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
