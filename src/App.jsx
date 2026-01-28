import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
<<<<<<< HEAD
import About from "./pages/AboutPage.jsx";
=======
import Meals from "./pages/Meals.jsx";
>>>>>>> 3f5f93507bfcb25cbe386d9eab372b5544f54ea5
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";

const App = () => {
  return (
    <div className="App min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<About />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
=======
          <Route path="/" element={<Home />} />
          <Route path="/meals" element={<Meals />} />
>>>>>>> 3f5f93507bfcb25cbe386d9eab372b5544f54ea5
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
export default App;
