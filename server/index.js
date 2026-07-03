import express from 'express'
import cors from 'cors'
import axios from 'axios'
import sqlite3 from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Database setup
const dbPath = path.join(__dirname, 'vinyldesk.db')
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database error:', err)
  } else {
    console.log('Connected to SQLite database')
  }
})

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON')

// Initialize database
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS albums (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      discogsId INTEGER UNIQUE,
      title TEXT NOT NULL,
      artist TEXT NOT NULL,
      year INTEGER,
      cover TEXT,
      tracklist TEXT,
      story TEXT,
      addedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
  
  db.run(`
    CREATE TABLE IF NOT EXISTS listening_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      albumId INTEGER,
      listenedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (albumId) REFERENCES albums(id)
    )
  `)
})

// Discogs API configuration
const DISCOGS_API = 'https://api.discogs.com'
const DISCOGS_HEADERS = {
  'User-Agent': 'VinylDesk/1.0 +https://github.com/MelleF4/vinyldesk'
}

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Search Discogs for albums
app.get('/api/search', async (req, res) => {
  try {
    const { q, artist, title } = req.query
    
    let query = ''
    if (title && artist) {
      query = `release_title="${title}" artist="${artist}" type:release`
    } else if (q) {
      query = `${q} type:release`
    } else {
      return res.status(400).json({ error: 'Search query required' })
    }
    
    const response = await axios.get(`${DISCOGS_API}/database/search`, {
      params: {
        q: query,
        per_page: 20
      },
      headers: DISCOGS_HEADERS
    })
    
    res.json(response.data)
  } catch (error) {
    console.error('Discogs search error:', error.message)
    res.status(500).json({ error: 'Failed to search Discogs' })
  }
})

// Get release details from Discogs
app.get('/api/discogs/release/:id', async (req, res) => {
  try {
    const { id } = req.params
    const response = await axios.get(`${DISCOGS_API}/releases/${id}`, {
      headers: DISCOGS_HEADERS
    })
    res.json(response.data)
  } catch (error) {
    console.error('Discogs release error:', error.message)
    res.status(500).json({ error: 'Failed to fetch release' })
  }
})

// Get user's collection
app.get('/api/collection', (req, res) => {
  db.all('SELECT * FROM albums ORDER BY addedAt DESC', (err, albums) => {
    if (err) {
      console.error('Collection error:', err)
      return res.status(500).json({ error: 'Failed to fetch collection' })
    }
    res.json(albums || [])
  })
})

// Get single album
app.get('/api/collection/:id', (req, res) => {
  const { id } = req.params
  db.get('SELECT * FROM albums WHERE id = ?', [id], (err, album) => {
    if (err) {
      console.error('Album error:', err)
      return res.status(500).json({ error: 'Failed to fetch album' })
    }
    if (!album) return res.status(404).json({ error: 'Album not found' })
    res.json(album)
  })
})

// Add album to collection
app.post('/api/collection', (req, res) => {
  try {
    const { discogsId, title, artist, year, cover, tracklist, story } = req.body
    
    if (!title || !artist) {
      return res.status(400).json({ error: 'Title and artist required' })
    }
    
    db.run(
      `INSERT INTO albums (discogsId, title, artist, year, cover, tracklist, story)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [discogsId, title, artist, year, cover, JSON.stringify(tracklist), story],
      function(err) {
        if (err) {
          console.error('Add album error:', err)
          return res.status(500).json({ error: 'Failed to add album' })
        }
        res.json({ id: this.lastID })
      }
    )
  } catch (error) {
    console.error('Add album error:', error)
    res.status(500).json({ error: 'Failed to add album' })
  }
})

// Get statistics
app.get('/api/stats', (req, res) => {
  db.get('SELECT COUNT(*) as count FROM albums', (err, result) => {
    if (err) {
      console.error('Stats error:', err)
      return res.status(500).json({ error: 'Failed to fetch stats' })
    }
    
    const collectionSize = result?.count || 0
    
    db.get('SELECT COUNT(*) as count FROM listening_history', (err, result) => {
      const totalListeningTime = result?.count || 0
      
      db.get(
        `SELECT artist, COUNT(*) as count 
         FROM listening_history 
         JOIN albums ON listening_history.albumId = albums.id 
         GROUP BY artist 
         ORDER BY count DESC 
         LIMIT 1`,
        (err, result) => {
          res.json({
            collectionSize,
            totalListeningTime,
            favoriteArtist: result?.artist || 'Unknown'
          })
        }
      )
    })
  })
})

app.listen(PORT, () => {
  console.log(`🎶 VinylDesk server running on http://localhost:${PORT}`)
})
