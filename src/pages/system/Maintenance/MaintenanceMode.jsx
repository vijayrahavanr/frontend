import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSystem } from '@/hooks/useSystem';
import Header from '@/components/common/Header';
import MaintenanceModeCard from '@/components/system/MaintenanceModeCard';
import DatePicker from '@/components/common/DatePicker';
import TimePicker from '@/components/common/TimePicker';
import Button from '@/components/common/Button';
import Section from '@/components/common/Section';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';

/**
 * Maintenance-mode control — backed by systemSlice's maintenanceMode
 * via useSystem.
 */
const MaintenanceMode = () => {
  const { maintenanceMode, loading, error, fetchMaintenanceMode, setMaintenanceMode } = useSystem();
  const [message, setMessage] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  useEffect(() => {
    fetchMaintenanceMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (maintenanceMode?.message) setMessage(maintenanceMode.message);
  }, [maintenanceMode]);

  const handleToggle = async (enabled) => {
    const result = await setMaintenanceMode({ enabled, message });
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success(enabled ? 'Maintenance mode enabled.' : 'Maintenance mode disabled.');
    }
  };

  const handleSchedule = async () => {
    const result = await setMaintenanceMode({
      enabled: maintenanceMode?.enabled ?? false,
      message,
      scheduledAt: scheduledDate && scheduledTime ? `${scheduledDate}T${scheduledTime}` : undefined,
    });
    if (result.meta.requestStatus === 'fulfilled') toast.success('Maintenance window scheduled.');
  };

  if (error) return <ErrorState description={error} onRetry={fetchMaintenanceMode} />;
  if (loading && !maintenanceMode) return <Skeleton className="h-40 rounded-2xl" />;

  return (
    <div className="flex flex-col gap-6">
      <Header title="Maintenance Mode" description="Control platform access during scheduled maintenance" />

      <MaintenanceModeCard
        enabled={maintenanceMode?.enabled ?? false}
        onToggle={handleToggle}
        message={message}
        onMessageChange={setMessage}
      />

      <Section title="Schedule Future Maintenance" spacing="sm">
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-surface-dark-elevated">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DatePicker label="Date" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} />
            <TimePicker label="Time" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} />
          </div>
          <Button variant="outlined" className="self-end" onClick={handleSchedule} loading={loading}>
            Schedule Maintenance Window
          </Button>
        </div>
      </Section>
    </div>
  );
};

export default MaintenanceMode;
