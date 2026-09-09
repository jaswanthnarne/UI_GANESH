import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { useDataStore } from './store/useDataStore';
import { useThemeStore } from './store/useThemeStore';

import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { AdminControlPanel } from './components/admin/AdminControlPanel';
import { ShareableReceiptModal } from './components/ShareableReceiptModal';
import { Footer } from './components/Footer';

// Protected Route Component for Admin Dashboard
function ProtectedAdminRoute({ children }) {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xs font-semibold text-saffron-700">
        Loading Admin Session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Public Layout (Navbar + Page + Footer)
function PublicLayout() {
  const {
    settings,
    announcements,
    events,
    gallery,
    selectedReceipt,
    setSelectedReceipt,
  } = useDataStore();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Navbar />
        <LandingPage
          settings={settings}
          announcements={announcements}
          events={events}
          gallery={gallery}
        />
      </div>

      <Footer settings={settings} />

      <ShareableReceiptModal
        contribution={selectedReceipt}
        settings={settings}
        onClose={() => setSelectedReceipt(null)}
      />
    </div>
  );
}

export default function App() {
  const { checkAuth } = useAuthStore();
  const { fetchAllData } = useDataStore();
  const { initTheme } = useThemeStore();

  useEffect(() => {
    initTheme();
    checkAuth();
    fetchAllData();
  }, []);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<PublicLayout />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminControlPanel />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}
