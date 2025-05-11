import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Tutor from "./pages/Tutor";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<Home />} />
            <Route path="/tutor" element={<Tutor />} />
            {/* Thêm các route khác ở đây, ví dụ: */}
            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="/pricing" element={<Pricing />} /> */}
          </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
