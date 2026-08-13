import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMoon, FiBell, FiGlobe, FiUser, FiLock, FiLogOut } from 'react-icons/fi';
import StudentTopbar from '@/components/student/StudentTopbar';
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
  const [notifPrefs, setNotifPrefs] = useState({
    email: true,
    push: true,
    attendanceAlerts: true,
    leaveUpdates: false,
  });

  const toggle = (key) => setNotifPrefs((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex flex-col gap-6">
      <StudentTopbar title="Settings" subtitle="Manage your preferences and account" />

      <Section title="Appearance" spacing="sm">
        <div className="rounded-2xl border border-slate-200 bg-white px-5 dark:border-slate-700 dark:bg-surface-dark-elevated">
          <SettingsRow
            icon={<FiMoon size={16} />}
            title="Theme"
            description="Choose light, dark, or match your system"
            control={<ThemeSwitcher />}
          />
          <Divider />
          <SettingsRow
            icon={<FiGlobe size={16} />}
            title="Language"
            description="Choose your preferred language"
            control={<LanguageSwitcher />}
          />
        </div>
      </Section>

      <Section title="Notifications" spacing="sm">
        <div className="rounded-2xl border border-slate-200 bg-white px-5 dark:border-slate-700 dark:bg-surface-dark-elevated">
          <SettingsRow
            icon={<FiBell size={16} />}
            title="Email notifications"
            description="Receive updates via email"
            control={<Switch checked={notifPrefs.email} onChange={() => toggle('email')} />}
          />
          <Divider />
          <SettingsRow
            icon={<FiBell size={16} />}
            title="Push notifications"
            description="Receive updates in-app"
            control={<Switch checked={notifPrefs.push} onChange={() => toggle('push')} />}
          />
          <Divider />
          <SettingsRow
            icon={<FiBell size={16} />}
            title="Attendance alerts"
            description="Get notified when attendance drops below threshold"
            control={
              <Switch
                checked={notifPrefs.attendanceAlerts}
                onChange={() => toggle('attendanceAlerts')}
              />
            }
          />
          <Divider />
          <SettingsRow
            icon={<FiBell size={16} />}
            title="Leave status updates"
            description="Get notified when a leave request is reviewed"
            control={<Switch checked={notifPrefs.leaveUpdates} onChange={() => toggle('leaveUpdates')} />}
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
              <Link to="/student/profile/edit">
                <Button variant="outlined" size="sm">
                  Edit
                </Button>
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
                <Button variant="outlined" size="sm">
                  Change
                </Button>
              </Link>
            }
          />
          <Divider />
          <SettingsRow
            icon={<FiLogOut size={16} />}
            title="Sign out"
            description="Sign out of your account on this device"
            control={
              <Button variant="danger" size="sm">
                Sign out
              </Button>
            }
          />
        </div>
      </Section>
    </div>
  );
};

export default Settings;
