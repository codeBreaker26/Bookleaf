import { Outlet } from 'react-router-dom';

export function AuthorLayout() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b bg-white px-6 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto">Author Portal</div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
