import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiBell, FiSmartphone } from 'react-icons/fi';
import { useConfig } from '@/hooks/useConfig';
import Header from '@/components/common/Header';
import ConfigSectionCard from '@/components/system/ConfigSectionCard';
import ConfigToggleRow from '@/components/system/ConfigToggleRow';
import Button from '@/components/common/Button';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';

const DEFAULT_CHANNELS = {
  emailOnAttendance: true,
  emailOnLeaveDecision: true,
  pushOnNotification: true,
  smsOnCritical: false,
};

/**
 * Notification-channel configuration — backed by systemSlice's
 * notificationConfig via useConfig.
 */
const NotificationConfiguration = () => {
  const { notificationConfig, loading, error, fetchNotificationConfig, saveNotificationConfig } = useConfig();
  const [channels, setChannels] = useState(DEFAULT_CHANNELS);

  useEffect(() => {
    fetchNotificationConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (notificationConfig) setChannels((prev) => ({ ...prev, ...notificationConfig }));
  }, [notificationConfig]);

  const toggle = (key) => setChannels((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSave = async () => {
    const result = await saveNotificationConfig(channels);
    if (result.meta.requestStatus === 'fulfilled') toast.success('Notification configuration saved.');
  };

  if (error) return <ErrorState description={error} onRetry={fetchNotificationConfig} />;
  if (loading && !notificationConfig) return <Skeleton className="h-72 rounded-2xl" />;

  return (
    <div className="flex flex-col gap-6">
      <Header title="Notification Configuration" description="Control which events send platform-wide notifications" />

      <ConfigSectionCard icon={<FiBell size={18} />} title="Email Notifications">
        <ConfigToggleRow title="Attendance below threshold" checked={channels.emailOnAttendance} onChange={() => toggle('emailOnAttendance')} />
        <ConfigToggleRow title="Leave request decisions" checked={channels.emailOnLeaveDecision} onChange={() => toggle('emailOnLeaveDecision')} />
      </ConfigSectionCard>

      <ConfigSectionCard icon={<FiSmartphone size={18} />} title="Push & SMS">
        <ConfigToggleRow title="In-app push notifications" checked={channels.pushOnNotification} onChange={() => toggle('pushOnNotification')} />
        <ConfigToggleRow title="SMS for critical alerts" checked={channels.smsOnCritical} onChange={() => toggle('smsOnCritical')} />
      </ConfigSectionCard>

      <Button onClick={handleSave} loading={loading} className="self-end">
        Save Configuration
      </Button>
    </div>
  );
};

export default NotificationConfiguration;
