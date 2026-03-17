import { Link, useLocation } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const { pathname } = useLocation();

  const usesDesktopSidebar =
    pathname === "/home" ||
    pathname === "/meals" ||
    pathname === "/orders" ||
    pathname === "/profile" ||
    pathname === "/owner/dashboard" ||
    pathname === "/owner/create-mess" ||
    pathname === "/mess/dashboard" ||
    pathname === "/mess/orders" ||
    pathname === "/mess/create-meal" ||
    pathname === "/mess/profile" ||
    /^\/mess\/[^/]+\/(dashboard|orders|create-meal|profile)$/.test(pathname) ||
    /^\/mess\/[^/]+\/orders\/[^/]+$/.test(pathname);

  return (
    <footer
      className={`mt-auto overflow-hidden border-t text-white ${usesDesktopSidebar ? 'w-full md:ml-64 md:w-[calc(100%-16rem)]' : 'w-full'}`}
      style={{ 
        background: 'linear-gradient(to bottom, #6D28D9, #5B21B6)',
        borderColor: 'rgba(139, 92, 246, 0.2)'
      }}>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-bold mb-3"
              style={{ color: '#FFFFFF' }}>Mumas Kitchen</h3>
            <p className="text-sm mb-3"
              style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Home-style food made with love.
            </p>
            <div className="flex gap-2">
              <a href="https://www.facebook.com/mummas.kitchen_nashik" className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                <Facebook className="w-4 h-4" style={{ color: '#FFFFFF' }} />
              </a>
              <a href="https://www.instagram.com/mummas.kitchen_nashik" className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                <Instagram className="w-4 h-4" style={{ color: '#FFFFFF' }} />
              </a>
              <a href="https://twitter.com/mummas_kitchen" className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                <Twitter className="w-4 h-4" style={{ color: '#FFFFFF' }} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4"
              style={{ color: '#FFFFFF' }}>Quick Links</h3>
            <div className="space-y-2">
              <Link to="/home" className="block transition-colors hover:translate-x-1 transform duration-200"
                style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)'}>
                Our Meals
              </Link>
              <Link to="/contact" className="block transition-colors hover:translate-x-1 transform duration-200"
                style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)'}>
                Contact
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4"
              style={{ color: '#FFFFFF' }}>Contact</h3>
            <div className="space-y-2"
              style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              <a href="mailto:hello@mamaskitchen.com" className="flex items-start gap-3 transition group break-all"
                onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)'}>
                <Mail className="h-5 w-5"
                  style={{ color: '#FFFFFF' }} />
                <span className="text-sm">hello@mamaskitchen.com</span>
              </a>
              <a href="tel:+15551234567" className="flex items-start gap-3 transition group"
                onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)'}>
                <Phone className="h-5 w-5"
                  style={{ color: '#FFFFFF' }} />
                <span className="text-sm">+1 (555) 123-4567</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0"
                  style={{ color: '#FFFFFF' }} />
                <span className="text-sm">123 Kitchen Street, Nashik</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t mt-6 pt-4 text-center"
          style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}>
          <p className="text-xs"
            style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            © 2026 Mumas Kitchen. All rights reserved. Crafted with ❤️ for food lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
