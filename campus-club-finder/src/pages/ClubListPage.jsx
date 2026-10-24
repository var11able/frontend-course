import { useMemo, useState } from 'react'
import ClubCard from '../components/ClubCard.jsx'
import SortControl from '../components/SortControl.jsx'
import ViewToggle from '../components/ViewToggle.jsx'
import { clubs } from '../data/clubs.js'
import { useJoinedClubs } from '../hooks/useJoinedClubs.js'

export default function ClubListPage() {
  const [sortOrder, setSortOrder] = useState('name-asc')
  const [view, setView] = useState('grid')
  const { isJoined } = useJoinedClubs()

  const sortedClubs = useMemo(() => {
    const direction = sortOrder === 'name-asc' ? 1 : -1
    return [...clubs].sort((a, b) => a.name.localeCompare(b.name) * direction)
  }, [sortOrder])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
      <title>Clubs · Campus Club Finder</title>
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Student Clubs
          </h1>
          <p className="mt-2 text-slate-600">
            {clubs.length} clubs to explore. Pick one to see its events and join.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <SortControl value={sortOrder} onChange={setSortOrder} />
          <ViewToggle value={view} onChange={setView} />
        </div>
      </header>

      <ul
        className={`mt-8 grid gap-6 ${
          view === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
        }`}
      >
        {sortedClubs.map((club) => (
          <li key={club.id} className="flex">
            <ClubCard club={club} view={view} joined={isJoined(club.id)} />
          </li>
        ))}
      </ul>
    </div>
  )
}
