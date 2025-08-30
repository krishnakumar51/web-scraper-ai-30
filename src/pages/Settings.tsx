import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import SettingsSidebar from '@/components/settings/SettingsSidebar';
import GeneralSettings from '@/components/settings/GeneralSettings';
import SecuritySettings from '@/components/settings/SecuritySettings';
import ProfileSettings from '@/components/settings/ProfileSettings';
import UpgradeSection from '@/components/settings/UpgradeSection';

export type SettingsSection = 'general' | 'security' | 'profile' | 'upgrade';

const Settings = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<SettingsSection>('general');

  // Handle navigation from other parts of the app (like UserMenu and upgrade banner)
  useEffect(() => {
    if (location.state?.section) {
      setActiveSection(location.state.section as SettingsSection);
      // Clear the navigation state to prevent issues on refresh
      window.history.replaceState({}, document.title);
    } else if (location.hash === '#upgrade') {
      setActiveSection('upgrade');
    }
  }, [location.state, location.hash]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'general':
        return <GeneralSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'profile':
        return <ProfileSettings />;
      case 'upgrade':
        return <UpgradeSection />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-scraper-bg-primary">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-scraper-text-primary mb-2">Settings</h1>
          <p className="text-scraper-text-secondary">Manage your account and preferences</p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <SettingsSidebar 
              activeSection={activeSection} 
              onSectionChange={setActiveSection} 
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-scraper-bg-card rounded-xl border border-scraper-border shadow-scraper-md transition-all duration-200 hover:shadow-scraper-lg">
              {renderActiveSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
