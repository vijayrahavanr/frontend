import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMoon, FiBell, FiGlobe, FiUser, FiLock, FiServer, FiLogOut } from 'react-icons/fi';
import AdminTopbar from '@/components/admin/AdminTopbar';
import Section from '@/components/common/Section';
import ThemeSwitcher from '@/components/common/ThemeSwitcher';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import Switch from '@/components/common/Switch';
import Button from '@/components/common/Button';
import Divider from '@/components/common/Divider';

const SettingsRow = ({ icon, title, description, control }) => (
  <div className="flex items-center justify-between gap-4 py-4">
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
        {icon}
      </span>
      <div>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{title}</p>
        {description && <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>}
      </div>
    </div>
    {control}
  </div>
);

const Settings = () => {
  const [notifPrefs, setNotifPrefs] = useState({ email: true, push: true, systemAlerts: true });
  const [systemPrefs, setSystemPrefs] = useState({ maintenanceMode: false, autoBackup: true });

  const toggleNotif = (key) => setNotifPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  const toggleSystem = (key) => setSystemPrefs((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex flex-col gap-6">
      <AdminTopbar title="Settings" subtitle="Manage system preferences and account" />

      <Section title="Appearance" spacing="sm">
        <div className="rounded-2xl border border-slate-200 bg-white px-5 dark:border-slate-700 dark:bg-surface-dark-elevated">
          <SettingsRow icon={<FiMoon size={16} />} title="Theme" description="Choose light, dark, or match your system" control={<ThemeSwitcher />} />
          <Divider />
          <SettingsRow icon={<FiGlobe size={16} />} title="Language" description="Choose your preferred language" control={<LanguageSwitcher />} />
        </div>
      </Section>

      <Section title="Notifications" spacing="sm">
        <div className="rounded-2xl border border-slate-200 bg-white px-5 dark:border-slate-700 dark:bg-surface-dark-elevated">
          <SettingsRow icon={<FiBell size={16} />} title="Email notifications" description="Receive updates via email" control={<Switch checked={notifPrefs.email} onChange={() => toggleNotif('email')} />} />
          <Divider />
          <SettingsRow icon={<FiBell size={16} />} title="Push notifications" description="Receive updates in-app" control={<Switch checked={notifPrefs.push} onChange={() => toggleNotif('push')} />} />
          <Divider />
          <SettingsRow icon={<FiBell size={16} />} title="System alerts" description="Get notified of system-level events" control={<Switch checked={notifPrefs.systemAlerts} onChange={() => toggleNotif('systemAlerts')} />} />
        </div>
      </Section>

      <Section title="System Settings" spacing="sm">
        <div className="rounded-2xl border border-slate-200 bg-white px-5 dark:border-slate-700 dark:bg-surface-dark-elevated">
          <SettingsRow
            icon={<FiServer size={16} />}
            title="Maintenance mode"
            description="Temporarily restrict access for non-admin users"
            control={<Switch checked={systemPrefs.maintenanceMode} onChange={() => toggleSystem('maintenanceMode')} />}
          />
          <Divider />
          <SettingsRow
            icon={<FiServer size={16} />}
            title="Automatic backups"
            description="Back up system data daily"
            control={<Switch checked={systemPrefs.autoBackup} onChange={() => toggleSystem('autoBackup')} />}
          />
        </div>
      </Section>

      <Section title="Account" spacing="sm">
        <div className="rounded-2xl border border-slate-200 bg-white px-5 dark:border-slate-700 dark:bg-surface-dark-elevated">
          <SettingsRow
            icon={<FiUser size={16} />}
            title="Profile information"
            description="Update your personal and contact details"
            control={
              <Link to="/admin/profile/edit">
                <Button variant="outlined" size="sm">Edit</Button>
              </Link>
            }
          />
          <Divider />
          <SettingsRow
            icon={<FiLock size={16} />}
            title="Password"
            description="Change your account password"
            control={
              <Link to="/auth/change-password">
                <Button variant="outlined" size="sm">Change</Button>
              </Link>
            }
          />
          <Divider />
          <SettingsRow
            icon={<FiLogOut size={16} />}
            title="Sign out"
            description="Sign out of your account on this device"
            control={<Button variant="danger" size="sm">Sign out</Button>}
          />
        </div>
      </Section>
    </div>
  );
};

export default Settings;
