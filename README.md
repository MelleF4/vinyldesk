# VinylDesk

> Your digital companion for analog listening

A serene, minimalist web app designed for old tablets. VinylDesk enriches your vinyl experience without stealing attention from the music.

## Philosophy

VinylDesk is **not** a Spotify clone. It's **not** a media player.

The music comes from your turntable. **VinylDesk provides only context, information, and atmosphere.**

The tablet should feel like part of your hi-fi setup—not like you're looking at a screen.

## Core Values

### 1. **Tranquility**
- No notifications
- No ads
- No bright colors
- No distracting animations
- Everything revolves around the music

### 2. **Context**
Vinyl listening is more than hearing a song. VinylDesk tells you:
- When the album was released
- Who played on it
- How it was recorded
- Fascinating background stories
- Track information

So you experience the album more consciously.

### 3. **Personal**
This is *your* collection—not "every album ever."

Only the records *you own*. Each page feels personal.

## Features

### Current Screens

- **Home** - Welcome, quick stats, navigation
- **Collection** - Your vinyl library at a glance
- **Album** - Full album details with tracklist and story
- **Listening Mode** - The screen that's always open. Now spinning info with minimal distractions
- **Statistics** - Your vinyl journey: collection size, favorite artist, most-played LP, total listening hours, first LP, latest acquisition

### Data Source

Powered by the **[Discogs API](https://www.discogs.com/developers/)** for rich album metadata.

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: SQLite (local-first, tablet-friendly)
- **API**: Discogs for album metadata
- **Styling**: Dark theme, minimal aesthetic

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Future Features

- 📖 Deeper album stories and background info
- 📝 Optional per-track lyrics view
- ⭐ Personal ratings and notes
- 📷 Photos of your own copy
- 📅 Listening history
- 📀 Wishlist for records you're hunting

---

Made with 🎶 for vinyl lovers who value atmosphere over speed.