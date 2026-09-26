import { ChefHat, ShieldCheck } from 'lucide-react';

const AuthLayout = ({ title, subtitle, children }) => (
  <div className="min-h-[calc(100vh-4.5rem)] bg-[#fffaf5] px-4 py-10 sm:px-6 lg:px-8">
    <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-4xl border bg-white shadow-xl shadow-orange-900/10 lg:grid-cols-[0.85fr_1.15fr]" style={{ borderColor: 'var(--border-light)' }}>
      <div className="relative hidden overflow-hidden bg-stone-950 p-10 text-white lg:flex lg:flex-col lg:justify-between"><div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} /><div className="relative"><div className="flex items-center gap-3"><div className="rounded-xl bg-orange-600 p-2"><ChefHat className="h-5 w-5" /></div><span className="font-display text-xl">Mumma's Kitchen</span></div><h2 className="font-display mt-20 max-w-xs text-4xl leading-tight">Good food should feel like coming home.</h2></div><div className="relative flex items-center gap-2 text-sm text-orange-100"><ShieldCheck className="h-4 w-4" /> Fresh meals. Familiar comfort.</div></div>
      <div className="p-6 sm:p-10 lg:p-14"><div className="mb-8 lg:hidden"><p className="font-display text-2xl font-bold text-stone-900">Mumma's Kitchen</p></div><div className="mb-8"><h1 className="font-display text-4xl text-stone-950">{title}</h1><p className="mt-2 text-stone-500">{subtitle}</p></div>{children}</div>
    </div>
  </div>
);

export default AuthLayout;
