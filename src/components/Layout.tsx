import { ReactNode } from 'react'
import Navigation from './Navigation'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-vinyl-dark flex flex-col">
      <main className="flex-1 overflow-auto">
        {children}
      </main>
      <Navigation />
    </div>
  )
}
