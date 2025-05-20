import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Tutor from "./pages/Tutor";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";
import Courses from "./pages/Courses";
import UploadCertificate from "./pages/UploadCertificate";
import VerifyOTPUser from "./pages/VerifyOTPUser";
import RegisterUser from "./pages/RegisterUser";
import ProfileUser from "./pages/ProfileUser";
import EditProfileUser from "./pages/EditProfileUser";

const LayoutWithNavFooter = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

const LayoutWithoutNavFooter = () => <Outlet />;

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<LayoutWithNavFooter />}>
          <Route path="/" element={<Home />} />
          <Route path="/tutor" element={<Tutor />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/upload-certificate" element={<UploadCertificate />} />
          <Route path="/profile-user" element={<ProfileUser />} />
          <Route path="/edit-profile-user" element={<EditProfileUser />} />
        </Route>

        <Route element={<LayoutWithoutNavFooter />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/register-user" element={<RegisterUser />} />
          <Route path="/verify-otp-user" element={<VerifyOTPUser />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
