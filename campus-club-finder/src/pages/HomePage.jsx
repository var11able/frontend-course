import ButtonLink from '../components/ButtonLink.jsx'

const highlights = [
  { title: 'Discover', text: 'Browse every club in one place, in a grid or a list.' },
  { title: 'Learn', text: 'See what each club does and when it meets next.' },
  { title: 'Join', text: 'Join in one click. We remember it on this device.' },
]

export default function HomePage() {
  return (
    <>
      <title>Campus Club Finder</title>
      <section className="overflow-hidden bg-gradient-to-b from-indigo-50 to-slate-50">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
          <div>
            <h1 className="font-display text-4xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Find your people <span className="text-indigo-600">on campus.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">
              Welcome to Campus Club Finder, the Student Affairs guide to student clubs. Explore
              what's out there, check upcoming events, and join the communities that fit you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/clubs">Explore Clubs</ButtonLink>
              <ButtonLink to="/about" variant="secondary">
                How it works
              </ButtonLink>
            </div>
          </div>
          <img
            src="/images/hero.jpg"
            alt="Students walking through a university campus archway"
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lg ring-1 ring-slate-200"
          />
        </div>
      </section>

      <section aria-labelledby="highlights-heading" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 id="highlights-heading" className="sr-only">
          What you can do
        </h2>
        <ol className="grid gap-5 sm:grid-cols-3">
          {highlights.map((item, index) => (
            <li key={item.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <span className="font-display text-sm font-extrabold text-indigo-600">
                0{index + 1}
              </span>
              <h3 className="mt-1 font-display text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-slate-600">{item.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
