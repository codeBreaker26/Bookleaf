type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchBar({ value, onChange, placeholder = 'Search' }: SearchBarProps) {
  return (
    <div className="w-full max-w-xl rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-slate-100 shadow-sm shadow-slate-950/20">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
      />
    </div>
  );
}
