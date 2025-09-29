import { useState, useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { LoginForm } from "./components/LoginForm";
import { DashboardHeader } from "./components/DashboardHeader";
import { SharedHome } from "./components/SharedHome";
import { RoleBasedDashboard } from "./components/RoleBasedDashboard";
import { RemindersProvider } from "./context/RemindersContext";
import { ReminderWatcher } from "./components/ReminderWatcher";
import { Toaster } from "./components/ui/sonner";
import type { User, UserRole } from "./types";

export default function App() {
  const [currentPage, setCurrentPage] = useState<
    "landing" | "login" | "dashboard"
  >("landing");
  const [selectedRole, setSelectedRole] =
    useState<UserRole | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'dashboard'>('home');

  // Handle role selection from landing page
  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setCurrentPage("login");
  };

  // Handle successful login
  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage("dashboard");
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    setSelectedRole(null);
    setCurrentPage("landing");
  };

  // Handle back to landing
  const handleBackToLanding = () => {
    setSelectedRole(null);
    setCurrentPage("landing");
  };

  const renderDashboard = () => {
    if (!user) return null;
    return <RoleBasedDashboard user={user} onLogout={handleLogout} />;
  };

  return (
    <RemindersProvider>
      <div className="min-h-screen bg-white transition-smooth">
        {currentPage === "landing" && (
          <LandingPage onRoleSelect={handleRoleSelect} />
        )}

        {currentPage === "login" && selectedRole && (
          <LoginForm
            role={selectedRole}
            onLogin={handleLogin}
            onBack={handleBackToLanding}
          />
        )}

        {currentPage === "dashboard" && user && (
          <div className="min-h-screen bg-gray-50">
            <DashboardHeader
              user={user}
              onLogout={handleLogout}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            <main className="pt-16 pb-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mt-12">
                  {activeTab === 'home' ? (
                    <SharedHome user={user} />
                  ) : (
                    renderDashboard()
                  )}
                </div>
              </div>
            </main>
          </div>
        )}

        {currentPage === "dashboard" && user && <ReminderWatcher user={user} />}
      </div>
      <Toaster />
    </RemindersProvider>
  );
}
