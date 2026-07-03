import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Album from './pages/Album'
import ListeningMode from './pages/ListeningMode'
import Statistics from './pages/Statistics'

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/album/:id" element={<Album />} />
          <Route path="/listening" element={<ListeningMode />} />
          <Route path="/stats" element={<Statistics />} />
        </Routes>
      </Layout>
    </Router>
  )
}
