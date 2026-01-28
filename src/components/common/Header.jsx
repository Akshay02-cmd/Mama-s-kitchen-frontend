import { Link } from "react-router-dom";
import { Menu, X, User, ShoppingBag } from "lucide-react";
import { useState } from "react";
import logo from "../../assets/logo.png";
import defaultProfilePic from "../../assets/DefaulProfile.jpg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "About" },
    { to: "/home", label: "Meals" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl top-0 w-full fixed z-50 border-b border-amber-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="shrink-0">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img src={logo} alt="Mama's Kitchen Logo" className="w-14 h-14 sm:w-16 sm:h-16 rounded-full ring-2 ring-amber-500/50 group-hover:ring-amber-500 transition-all" />
                <div className="absolute inset-0 bg-amber-500/10 rounded-full group-hover:bg-amber-500/20 transition-all"></div>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-serif font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Mama's Kitchen</h1>
                <p className="text-xs text-amber-200/70 font-light tracking-wider">Authentic Home Cooking</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-5 py-2 text-amber-50 hover:text-amber-400 transition-all font-medium relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Profile Section */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/home"
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full hover:from-amber-600 hover:to-amber-700 transition-all font-semibold shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Order Now
            </Link>
            <Link to="/login" className="group">
              <div className="w-10 h-10 rounded-full ring-2 ring-amber-500/50 group-hover:ring-amber-500 transition-all overflow-hidden">
                <img
                  src={defaultProfilePic}
                  alt="Profile"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-700/50 transition text-amber-50"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-amber-600/20 bg-slate-900/95 backdrop-blur-sm">
          <nav className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-amber-50 hover:bg-amber-600/20 rounded-lg transition font-medium"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 pb-2 space-y-3 border-t border-amber-600/20">
              <Link
                to="/home"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-center rounded-lg hover:from-amber-600 hover:to-amber-700 transition font-semibold"
              >
                Order Now
              </Link>
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-amber-50 hover:bg-slate-700/50 rounded-lg transition text-center font-medium"
              >
                Login / Sign Up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
