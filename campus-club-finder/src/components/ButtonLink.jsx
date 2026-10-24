import { Link } from 'react-router'

const variants = {
  primary: 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-700',
  secondary: 'bg-white text-indigo-700 ring-1 ring-indigo-200 hover:bg-indigo-50',
}

export default function ButtonLink({ to, variant = 'primary', children }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${variants[variant]}`}
    >
      {children}
    </Link>
  )
}
