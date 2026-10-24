import { Link, NavLink } from 'react-router'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/clubs', label: 'Clubs' },
  { to: '/about', label: 'About' },
]

function navLinkClass({ isActive }) {
  const base =
    'rounded-full px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:px-4'
  return isActive
    ? `${base} bg-indigo-600 text-white shadow-sm`
    : `${base} text-slate-700 hover:bg-indigo-50 hover:text-indigo-700`
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6"
      >
        <Link
          to="/"
          className="rounded-lg font-display text-base leading-tight font-extrabold tracking-tight text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600 sm:text-lg"
        >
          Campus Club Finder
        </Link>
        <ul className="flex items-center gap-1">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.end} className={navLinkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
