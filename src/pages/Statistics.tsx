export default function Statistics() {
  const stats = [
    { label: 'Collection Size', value: '5 albums' },
    { label: 'Favorite Artist', value: 'Dire Straits' },
    { label: 'Most Played', value: 'Communiqué' },
    { label: 'Total Listening', value: '47 hours' },
    { label: 'First LP', value: 'Escape by Journey' },
    { label: 'Latest Acquisition', value: 'Clancy by Twenty One Pilots' },
  ]

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-light mb-2 text-vinyl-accent">Your Vinyl Journey</h1>
      <p className="text-vinyl-text-muted text-sm mb-8">Your personal archive</p>

      <div className="space-y-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="card">
            <div className="text-vinyl-text-muted text-sm uppercase tracking-wide mb-2">
              {stat.label}
            </div>
            <div className="text-xl font-light text-vinyl-accent">
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
