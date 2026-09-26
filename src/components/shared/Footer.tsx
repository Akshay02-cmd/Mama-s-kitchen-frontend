import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => (
  <footer className="border-t border-stone-800 bg-stone-950 text-stone-300">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.3fr_0.7fr_1fr] lg:px-8">
      <div><p className="font-display text-2xl text-white">Mumma's Kitchen</p><p className="mt-3 max-w-sm text-sm leading-6 text-stone-400">Home-style food made with care, from our kitchen to your table.</p><a href="https://www.instagram.com/mummas.kitchen_nashik" aria-label="Mumma's Kitchen on Instagram" className="mt-5 inline-flex rounded-lg bg-stone-800 p-2 text-stone-300 hover:bg-orange-700 hover:text-white"><Instagram className="h-4 w-4" /></a></div>
      <div><h2 className="text-sm font-bold uppercase tracking-wider text-white">Explore</h2><div className="mt-4 space-y-3 text-sm"><Link to="/" className="block hover:text-orange-400">Home</Link><Link to="/meals" className="block hover:text-orange-400">Menu</Link><Link to="/contact" className="block hover:text-orange-400">Contact</Link></div></div>
      <div><h2 className="text-sm font-bold uppercase tracking-wider text-white">Talk to us</h2><div className="mt-4 space-y-3 text-sm text-stone-400"><a href="mailto:hello@mamaskitchen.com" className="flex items-center gap-3 hover:text-orange-400"><Mail className="h-4 w-4" />hello@mamaskitchen.com</a><a href="tel:+15551234567" className="flex items-center gap-3 hover:text-orange-400"><Phone className="h-4 w-4" />+1 (555) 123-4567</a><span className="flex items-center gap-3"><MapPin className="h-4 w-4 shrink-0" />Nashik, Maharashtra</span></div></div>
    </div>
    <div className="border-t border-stone-800 px-4 py-5 text-center text-xs text-stone-500">© 2026 Mumma's Kitchen. Made for everyday comfort.</div>
  </footer>
);

export default Footer;
