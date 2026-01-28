import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";


const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white w-full mt-auto border-t border-amber-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-3 rounded-xl shadow-lg shadow-amber-500/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-utensils h-6 w-6 text-white"
                >
                  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
                  <path d="M7 2v20"></path>
                  <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
                </svg>
              </div>
              <div>
                <span className="text-2xl font-serif font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Mama's Kitchen</span>
                <p className="text-xs text-amber-200/50 font-light">Authentic Home Cooking</p>
              </div>
            </div>
            <p className="text-gray-300/80 leading-relaxed mb-6">
              Home-style food made with love, delivered fresh to your doorstep.
              Experience the taste of homemade meals, just like mama makes.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-amber-600 flex items-center justify-center transition-all group">
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-amber-600 flex items-center justify-center transition-all group">
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-amber-600 flex items-center justify-center transition-all group">
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6 text-amber-400">Quick Links</h3>
            <div className="space-y-3">
              <Link to="/" className="block text-gray-300 hover:text-amber-400 transition-colors hover:translate-x-1 transform duration-200">About Us</Link>
              <Link to="/home" className="block text-gray-300 hover:text-amber-400 transition-colors hover:translate-x-1 transform duration-200">Our Meals</Link>
              <Link to="/contact" className="block text-gray-300 hover:text-amber-400 transition-colors hover:translate-x-1 transform duration-200">Contact</Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6 text-amber-400">Contact</h3>
            <div className="space-y-4 text-gray-300">
              <a href="mailto:hello@mamaskitchen.com" className="flex items-center gap-3 hover:text-amber-400 transition group">
                <Mail className="h-5 w-5 text-amber-500" />
                <span className="text-sm">hello@mamaskitchen.com</span>
              </a>
              <a href="tel:+15551234567" className="flex items-center gap-3 hover:text-amber-400 transition group">
                <Phone className="h-5 w-5 text-amber-500" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </a>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <span className="text-sm">123 Kitchen Street, Nashik</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-amber-600/20 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2026 Mama's Kitchen. All rights reserved. Crafted with ❤️ for food lovers.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
