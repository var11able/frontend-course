import { HiListBullet, HiSquares2X2 } from 'react-icons/hi2'

const views = [
  { value: 'grid', label: 'Grid view', Icon: HiSquares2X2 },
  { value: 'list', label: 'List view', Icon: HiListBullet },
]

export default function ViewToggle({ value, onChange }) {
  return (
    <div
      role="group"
      aria-label="Layout"
      className="inline-flex rounded-full bg-white p-1 shadow-sm ring-1 ring-slate-300"
    >
      {views.map((view) => {
        const active = view.value === value
        return (
          <button
            key={view.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(view.value)}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
              active ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <view.Icon aria-hidden="true" className="h-4 w-4" />
            {view.label}
          </button>
        )
      })}
    </div>
  )
}
