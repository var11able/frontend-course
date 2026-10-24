import { Link } from 'react-router'

export default function ClubCard({ club, view, joined }) {
  const isList = view === 'list'

  return (
    <article
      className={`group relative flex w-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md ${
        isList ? 'flex-col sm:flex-row' : 'flex-col'
      }`}
    >
      <img
        src={club.image}
        alt=""
        className={`aspect-[8/5] w-full object-cover ${isList ? 'sm:w-64 sm:shrink-0 md:w-72' : ''}`}
      />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
            {club.category}
          </span>
          {joined && (
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
              ✓ Joined
            </span>
          )}
        </div>
        <h2 className="font-display text-xl font-bold text-slate-900">{club.name}</h2>
        <p className="flex-1 text-slate-600">{club.shortDescription}</p>
        <Link
          to={`/clubs/${club.id}`}
          className="mt-1 w-fit rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors after:absolute after:inset-0 hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          View Details
          <span className="sr-only">for {club.name}</span>
        </Link>
      </div>
    </article>
  )
}
