import ButtonLink from '../components/ButtonLink.jsx'

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center sm:px-6">
      <title>Page not found · Campus Club Finder</title>
      <p className="font-display text-7xl font-extrabold text-indigo-600 sm:text-8xl">404</p>
      <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-900">
        This page skipped the meeting
      </h1>
      <p className="mt-3 text-lg text-slate-600">
        We couldn't find what you were looking for. It may have moved, or the link might be
        mistyped.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink to="/">Back to Home</ButtonLink>
        <ButtonLink to="/clubs" variant="secondary">
          Browse clubs
        </ButtonLink>
      </div>
    </div>
  )
}
