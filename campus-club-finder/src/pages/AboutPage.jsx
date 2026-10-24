const techStack = [
  { name: 'Vite', role: 'Project scaffolding, dev server, and production bundling.' },
  { name: 'React', role: 'UI built from functional components and Hooks (useState, useEffect, useMemo).' },
  { name: 'React Router', role: 'Client-side navigation between pages, including the club detail route.' },
  { name: 'Tailwind CSS', role: 'All styling and responsive layout, via utility classes.' },
  { name: 'localStorage', role: 'Remembers which clubs you joined. No backend, no account needed.' },
]

const features = [
  'Browse all student clubs as cards in a grid or a list.',
  'Sort clubs by name, A–Z or Z–A.',
  "Open a club to read its full description and see upcoming events.",
  'Join a club with one click. Your choice is saved in this browser.',
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 md:py-14">
      <title>About · Campus Club Finder</title>
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        About Campus Club Finder
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-700">
        Campus Club Finder is a Student Affairs web app that helps students discover, learn about,
        and join student clubs. Everything runs in your browser: there are no accounts, and nothing
        is sent to a server.
      </p>

      <section aria-labelledby="features-heading" className="mt-10">
        <h2 id="features-heading" className="font-display text-2xl font-bold text-slate-900">
          What you can do
        </h2>
        <ul className="mt-4 space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex gap-3 text-slate-700">
              <span aria-hidden="true" className="font-bold text-indigo-600">
                ✓
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="stack-heading" className="mt-10">
        <h2 id="stack-heading" className="font-display text-2xl font-bold text-slate-900">
          Tech stack
        </h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          {techStack.map((tech) => (
            <div key={tech.name} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <dt className="font-display text-lg font-bold text-indigo-700">{tech.name}</dt>
              <dd className="mt-1 text-slate-600">{tech.role}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  )
}
