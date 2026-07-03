import { Link } from 'react-router-dom'

const mockAlbums = [
  { id: 1, title: 'Communiqué', artist: 'Dire Straits', year: 1979 },
  { id: 2, title: 'Clancy', artist: 'Twenty One Pilots', year: 2024 },
  { id: 3, title: 'Breach', artist: 'Audioslave', year: 2005 },
  { id: 4, title: 'Escape', artist: 'Journey', year: 1981 },
  { id: 5, title: 'Meteora', artist: 'Linkin Park', year: 2003 },
]

export default function Collection() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-light mb-2 text-vinyl-accent">Your Collection</h1>
      <p className="text-vinyl-text-muted text-sm mb-6">{mockAlbums.length} albums</p>

      <div className="divider mb-6" />

      <div className="space-y-3">
        {mockAlbums.map(album => (
          <Link
            key={album.id}
            to={`/album/${album.id}`}
            className="card hover:border-vinyl-accent transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="text-2xl">💿</div>
              <div className="flex-1">
                <div className="font-medium text-vinyl-text group-hover:text-vinyl-accent transition-colors">
                  {album.title}
                </div>
                <div className="text-sm text-vinyl-text-muted">
                  {album.artist} · {album.year}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
