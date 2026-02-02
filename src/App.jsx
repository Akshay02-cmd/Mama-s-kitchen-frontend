import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/AboutPage.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import MealsListPage from "./pages/MealsListPage.jsx";
import MealDetailPage from "./pages/MealDetailPage.jsx";
import MyOrdersPage from "./pages/MyOrdersPage.jsx";
import OrderDetailPage from "./pages/OrderDetailPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import MessListPage from "./pages/MessListPage.jsx";
import MessDetailPage from "./pages/MessDetailPage.jsx";
import CustomerProfilePage from "./pages/CustomerProfilePage.jsx";
import EditProfilePage from "./pages/EditProfilePage.jsx";
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";

// 404 Page Component
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--gray-100)' }}>
    <div className="text-center">
      <h1 className="text-6xl font-bold mb-4" style={{ color: 'var(--primary-500)' }}>404</h1>
      <p className="text-xl mb-4" style={{ color: 'var(--gray-700)' }}>Page Not Found</p>
      <a href="/" className="px-6 py-3 rounded-lg" style={{ backgroundColor: 'var(--primary-500)', color: 'white' }}>
        Go Home
      </a>
    </div>
  </div>
);

const App = () => {
  return (
    <div className="App min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Meals Routes */}
          <Route path="/meals" element={<MealsListPage />} />
          <Route path="/meals/:id" element={<MealDetailPage />} />
          
          {/* Order Routes */}
          <Route path="/orders" element={<MyOrdersPage />} />
          <Route path="/orders/:id" element={<OrderDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          
          {/* Mess Routes */}
          <Route path="/mess" element={<MessListPage />} />
          <Route path="/mess/:id" element={<MessDetailPage />} />
          
          {/* Profile Routes */}
          <Route path="/profile" element={<CustomerProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          
          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
export default App;
