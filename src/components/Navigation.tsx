import { Link, useLocation } from 'react-router-dom'

export default function Navigation() {
  const location = useLocation()
  
  const isActive = (path: string) => location.pathname === path
  
  return (
    <nav className="border-t border-vinyl-border bg-vinyl-bg">
      <div className="grid grid-cols-4 gap-4 p-4 max-w-md mx-auto">
        <Link 
          to="/" 
          className={`text-center py-2 text-sm transition-colors ${
            isActive('/') 
              ? 'text-vinyl-accent' 
              : 'text-vinyl-text-muted hover:text-vinyl-text'
          }`}
        >
          Home
        </Link>
        <Link 
          to="/collection" 
          className={`text-center py-2 text-sm transition-colors ${
            isActive('/collection') 
              ? 'text-vinyl-accent' 
              : 'text-vinyl-text-muted hover:text-vinyl-text'
          }`}
        >
          Collection
        </Link>
        <Link 
          to="/listening" 
          className={`text-center py-2 text-sm transition-colors ${
            isActive('/listening') 
              ? 'text-vinyl-accent' 
              : 'text-vinyl-text-muted hover:text-vinyl-text'
          }`}
        >
          Listening
        </Link>
        <Link 
          to="/stats" 
          className={`text-center py-2 text-sm transition-colors ${
            isActive('/stats') 
              ? 'text-vinyl-accent' 
              : 'text-vinyl-text-muted hover:text-vinyl-text'
          }`}
        >
          Stats
        </Link>
      </div>
    </nav>
  )
}
