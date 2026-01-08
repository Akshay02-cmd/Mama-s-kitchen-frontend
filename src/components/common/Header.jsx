import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "/src/assets/logo.png";
import defaultProfilePic from "/src/assets/DefaulProfile.jpg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/meals", label: "Meals" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-white shadow-md top-0 w-full fixed z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="shrink-0">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <img src={logo} alt="Mama's Kitchen Logo" className="w-12 h-12 sm:w-16 sm:h-16" />
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Mama's Kitchen</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-700 hover:text-orange-600 transition font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Profile Section */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/meals"
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold"
            >
              Order Now
            </Link>
            <Link to="/login">
              <img
                src={defaultProfilePic}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover cursor-pointer hover:opacity-80 transition"
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition font-medium"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 pb-2 space-y-3 border-t border-gray-200">
              <Link
                to="/meals"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full px-4 py-3 bg-orange-600 text-white text-center rounded-lg hover:bg-orange-700 transition font-semibold"
              >
                Order Now
              </Link>
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition text-center font-medium"
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
