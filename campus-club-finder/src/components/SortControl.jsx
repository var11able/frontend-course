const sortOptions = [
  { value: 'name-asc', label: 'Name A–Z' },
  { value: 'name-desc', label: 'Name Z–A' },
]

export default function SortControl({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-clubs" className="text-sm font-semibold text-slate-700">
        Sort by
      </label>
      <select
        id="sort-clubs"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-full border border-slate-300 bg-white py-2 pr-9 pl-4 text-sm font-medium text-slate-800 shadow-sm focus:border-indigo-500 focus:outline-2 focus:outline-indigo-500"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
