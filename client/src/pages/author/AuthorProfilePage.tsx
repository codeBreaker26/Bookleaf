import { useAuth } from '@hooks/useAuth';
import { UserCircle2, Mail, MapPin, FileText } from 'lucide-react';

export function AuthorProfilePage() {
  const auth = useAuth();
  const user = auth.user;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <section className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Profile</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Your author profile</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              View your account details, role, and contact information managed by BookLeaf support.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-6 shadow-2xl shadow-slate-950/20">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-violet-500/10 text-violet-300">
              <UserCircle2 className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Account</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{user?.name ?? 'Author'}</h2>
              <p className="text-sm text-slate-400">{user?.role ?? 'author'}</p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Email</p>
              <p className="mt-2 text-sm text-white">{user?.email ?? 'No email available'}</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Member since</p>
              <p className="mt-2 text-sm text-white">Managed through BookLeaf support.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-6 shadow-2xl shadow-slate-950/20">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">About</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Profile overview</h2>
          <p className="mt-3 text-sm text-slate-400">
            Your author profile is protected and maintained through the BookLeaf portal. If you need to update your contact details or role, reach out to support and we will assist you.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-950 px-4 py-4">
              <Mail className="h-5 w-5 text-violet-300" />
              <div>
                <p className="text-sm text-slate-400">Email</p>
                <p className="text-sm text-white">{user?.email ?? 'Not available'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-950 px-4 py-4">
              <MapPin className="h-5 w-5 text-violet-300" />
              <div>
                <p className="text-sm text-slate-400">Location</p>
                <p className="text-sm text-white">Managed by BookLeaf support</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-950 px-4 py-4">
              <FileText className="h-5 w-5 text-violet-300" />
              <div>
                <p className="text-sm text-slate-400">Role</p>
                <p className="text-sm text-white">{user?.role ?? 'author'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
