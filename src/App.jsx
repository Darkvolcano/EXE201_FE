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
import TutorProfile from "./pages/ProfileTutor";
import Dashboard from "./pages/Dashboard";
import AdminProfile from "./pages/ProfileAdmin";
import AIChat from "./pages/AIChat";
import CoursePlayer from "./pages/CoursePlayer";
import TutorDetail from "./pages/TutorDetail";
import Pricing from "./pages/Price";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Forbidden from "./pages/Forbidden";
import { AuthGuardProvider } from "./contexts/AuthGuardContext";
import AdminTutorsPage from "./pages/ViewTutorAccount";
import CertificateManagement from "./pages/CertificateManagement";
import SidebarAdmin from "./components/SidebarAdmin";
import CourseManagement from "./pages/CourseManagement";

const LayoutWithNavFooter = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

const LayoutWithSidebarAdmin = () => (
  <>
    <SidebarAdmin />
  </>
);

const LayoutWithoutNavFooter = () => <Outlet />;

function App() {
  return (
    <Router>
      <AuthGuardProvider>
        <Routes>
          <Route path="/forbidden" element={<Forbidden />} />
          <Route element={<LayoutWithNavFooter />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/tutor" element={<Tutor />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/upload-certificate" element={<UploadCertificate />} />
            <Route path="/profile-user" element={<ProfileUser />} />
            <Route path="/edit-profile-user" element={<EditProfileUser />} />
            <Route path="/profile-tutor" element={<TutorProfile />} />
            <Route path="/ai-chat" element={<AIChat />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/course-detail" element={<CoursePlayer />} />
            <Route path="/courses/:id" element={<CoursePlayer />} />
            <Route path="/tutors/:accountId" element={<TutorDetail />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<LayoutWithoutNavFooter />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/register-user" element={<RegisterUser />} />
            <Route path="/verify-otp-user" element={<VerifyOTPUser />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile-admin" element={<AdminProfile />} />
          </Route>

          <Route element={<LayoutWithSidebarAdmin />}>
            <Route path="/certificate" element={<CertificateManagement />} />
            <Route path="/course-management" element={<CourseManagement />} />
          </Route>
        </Routes>
      </AuthGuardProvider>
    </Router>
  );
}

export default App;
