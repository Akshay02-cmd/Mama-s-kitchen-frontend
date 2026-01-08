import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-amber-500 p-2 rounded-lg">
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
              <span className="text-xl font-bold">Mama's Kitchen</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Home-style food made with love, delivered fresh to your doorstep.
              Experience the taste of homemade meals, just like mama makes.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-400 hover:text-white transition">Home</Link>
              <Link to="/about" className="block text-gray-400 hover:text-white transition">About</Link>
              <Link to="/meals" className="block text-gray-400 hover:text-white transition">Meals</Link>
              <Link to="/contact" className="block text-gray-400 hover:text-white transition">Contact</Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center"><Mail className="mr-2 h-4 w-4" />hello@mamaskitchen.com</p>
              <p className="flex items-center"><Phone className="mr-2 h-4 w-4" />+1 (555) 123-4567</p>
              <p className="flex items-center"><MapPin className="mr-2 h-4 w-4" />123 Kitchen Street, Food City</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2026 Mama's Kitchen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
