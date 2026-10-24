import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { getClubById } from '../data/clubs.js'
import { useJoinedClubs } from '../hooks/useJoinedClubs.js'
import NotFoundPage from './NotFoundPage.jsx'

function parseDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export default function ClubDetailPage() {
  const { clubId } = useParams()
  const club = getClubById(clubId)
  const { isJoined, joinClub } = useJoinedClubs()
  const [justJoinedId, setJustJoinedId] = useState(null)

  if (!club) return <NotFoundPage />

  const joined = isJoined(club.id)
  const justJoined = justJoinedId === club.id
  const events = [...club.events].sort((a, b) => a.date.localeCompare(b.date))

  function handleJoin() {
    joinClub(club.id)
    setJustJoinedId(club.id)
  }

  return (
    <article className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-12">
      <title>{`${club.name} · Campus Club Finder`}</title>
      <Link
        to="/clubs"
        className="rounded text-sm font-semibold text-indigo-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Back to all clubs
      </Link>

      <img
        src={club.image}
        alt=""
        className="mt-5 aspect-[8/5] w-full rounded-3xl object-cover shadow-sm ring-1 ring-slate-200"
      />

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_20rem]">
        <div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
            {club.category}
          </span>
          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            {club.name}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">{club.description}</p>
          <p className="mt-4 text-slate-600">
            <span className="font-semibold text-slate-800">Meets:</span> {club.meets}
          </p>

          <section aria-labelledby="events-heading" className="mt-10">
            <h2 id="events-heading" className="font-display text-2xl font-bold text-slate-900">
              Upcoming Events
            </h2>
            <ul className="mt-4 space-y-3">
              {events.map((event) => {
                const date = parseDate(event.date)
                return (
                  <li
                    key={`${event.date}-${event.name}`}
                    className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200"
                  >
                    <time
                      dateTime={event.date}
                      className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-indigo-50 text-indigo-700"
                    >
                      <span className="text-xs font-bold uppercase">
                        {date.toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                      <span className="font-display text-2xl leading-none font-extrabold">
                        {date.getDate()}
                      </span>
                    </time>
                    <div>
                      <p className="font-semibold text-slate-900">{event.name}</p>
                      <p className="text-sm text-slate-600">
                        {date.toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>
        </div>

        <aside className="md:sticky md:top-24 md:self-start">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="font-display text-xl font-bold text-slate-900">Membership</h2>
            {joined ? (
              <>
                <p className="mt-2 text-slate-600">You're on the member list for this club.</p>
                <button
                  type="button"
                  disabled
                  className="mt-5 w-full cursor-not-allowed rounded-full bg-emerald-100 px-6 py-3 font-semibold text-emerald-800"
                >
                  ✓ You have joined this club!
                </button>
              </>
            ) : (
              <>
                <p className="mt-2 text-slate-600">
                  Join to get event updates. You can join as many clubs as you like.
                </p>
                <button
                  type="button"
                  onClick={handleJoin}
                  className="mt-5 w-full rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Join Club
                </button>
              </>
            )}
            <div role="status" aria-live="polite">
              {justJoined && (
                <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm font-medium text-emerald-900 ring-1 ring-emerald-200">
                  🎉 Welcome to the {club.name}! Your membership is saved on this device.
                </p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </article>
  )
}
