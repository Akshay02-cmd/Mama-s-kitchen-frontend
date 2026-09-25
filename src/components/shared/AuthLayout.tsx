import { ChefHat } from 'lucide-react';

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-md w-full relative">
        {/* Logo and Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 shadow-2xl" style={{ background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-500) 100%)' }}>
            <ChefHat className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--gray-900)' }}>{title}</h1>
          <p className="text-lg" style={{ color: 'var(--gray-600)' }}>{subtitle}</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100 backdrop-blur-sm">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
