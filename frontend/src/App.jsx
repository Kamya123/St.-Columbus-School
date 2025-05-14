// src/App.jsx

import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Import public pages
import Home from "./pages/Home";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Activities from "./pages/Activities";
import Admission from "./pages/Admission";
import Contact from "./pages/Contact";

// Import layout components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Import admin pages and protected route
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./layouts/admin/AdminPanel";
import ProtectedRoute from "./routes/ProtectedRoute";
import GalleryPage from "./pages/GalleryPage";
import AdminSchoolInfoTable from "./layouts/admin/AdminSchoolInfoTable";
import AdminGallery from "./layouts/admin/AdminGallery";
import AdminDisclosureTable from "./layouts/admin/AdminDisclosureTable";
import AdminAnnouncementsTable from "./layouts/admin/AdminAnnouncementTable";
import AdminTeachersTable from "./layouts/admin/AdminTeachersTable";
import AdminResultsTable from "./layouts/admin/AdminResultsTable";
import AdminStaffTable from "./layouts/admin/AdminStaffTable";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <div className="mt-[6rem]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About headerTitle="About Us" />} />
          <Route
            path="/academics"
            element={<Academics headerTitle="Academics" />}
          />
          <Route
            path="/activities"
            element={<Activities headerTitle="Co-curricular Activities" />}
          />
          <Route
            path="/admission"
            element={<Admission headerTitle="Admission" />}
          />
          <Route
            path="/gallery"
            element={<GalleryPage headerTitle="Gallery" />}
          />
          <Route
            path="/contact"
            element={<Contact headerTitle="Contact Us" />}
          />
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/schoolinfo"
            element={
              <ProtectedRoute>
                <AdminSchoolInfoTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/gallery"
            element={
              <ProtectedRoute>
                <AdminGallery />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/disclosure"
            element={
              <ProtectedRoute>
                <AdminDisclosureTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/results"
            element={
              <ProtectedRoute>
                <AdminResultsTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/staffinfo"
            element={
              <ProtectedRoute>
                <AdminStaffTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/announcements"
            element={
              <ProtectedRoute>
                <AdminAnnouncementsTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/teachers"
            element={
              <ProtectedRoute>
                <AdminTeachersTable />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
