// src/App.jsx

import { Routes, Route } from "react-router-dom";

// Import different pages
import Home from "./pages/Home";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Activities from "./pages/Activities";
import Admission from "./pages/Admission";
import Contact from "./pages/Contact";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />

      {/* Route Components */}
      <div className="mt-[6rem]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About headerTitle="About Us" />} />
          <Route path="/academics" element={<Academics headerTitle="Academics" />} />
          <Route path="/activities" element={<Activities headerTitle="Co-curricular Activities" />} />
          <Route path="/admission" element={<Admission headerTitle="Admission" />} />
          <Route path="/contact" element={<Contact headerTitle="Contact Us" />} />
        </Routes>
      </div>

      {/* Footer component */}
      <Footer />
    </>
  );
}

export default App;
