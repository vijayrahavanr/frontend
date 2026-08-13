import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiGlobe, FiClock, FiCalendar } from 'react-icons/fi';
import { useConfig } from '@/hooks/useConfig';
import Header from '@/components/common/Header';
import ConfigSectionCard from '@/components/system/ConfigSectionCard';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import Button from '@/components/common/Button';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';

const TIMEZONE_OPTIONS = [
  { label: '(GMT+5:30) India Standard Time', value: 'Asia/Kolkata' },
  { label: '(GMT+0:00) UTC', value: 'UTC' },
];
const DATE_FORMAT_OPTIONS = [
  { label: 'DD/MM/YYYY', value: 'dd/MM/yyyy' },
  { label: 'MM/DD/YYYY', value: 'MM/dd/yyyy' },
];
const YEAR_START_OPTIONS = [
  { label: 'July', value: '07' },
  { label: 'August', value: '08' },
  { label: 'January', value: '01' },
];

/**
 * Core system-wide configuration — backed by systemSlice's
 * systemConfig via useConfig.
 */
const SystemConfiguration = () => {
  const { systemConfig, loading, error, fetchSystemConfig, saveSystemConfig } = useConfig();
  const [values, setValues] = useState({
    institutionName: '',
    timezone: 'Asia/Kolkata',
    dateFormat: 'dd/MM/yyyy',
    academicYearStart: '07',
  });

  useEffect(() => {
    fetchSystemConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (systemConfig) setValues((prev) => ({ ...prev, ...systemConfig }));
  }, [systemConfig]);

  const handleChange = (field, value) => setValues((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    const result = await saveSystemConfig(values);
    if (result.meta.requestStatus === 'fulfilled') toast.success('System configuration saved.');
  };

  if (error) return <ErrorState description={error} onRetry={fetchSystemConfig} />;
  if (loading && !systemConfig) return <Skeleton className="h-96 rounded-2xl" />;

  return (
    <div className="flex flex-col gap-6">
      <Header title="System Configuration" description="Core institution and regional settings" />

      <ConfigSectionCard icon={<FiGlobe size={18} />} title="Institution Details" description="Basic information used across the platform">
        <Input label="Institution name" value={values.institutionName} onChange={(e) => handleChange('institutionName', e.target.value)} />
      </ConfigSectionCard>

      <ConfigSectionCard icon={<FiClock size={18} />} title="Regional Settings" description="Timezone and date formatting">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select label="Timezone" options={TIMEZONE_OPTIONS} value={values.timezone} onChange={(e) => handleChange('timezone', e.target.value)} />
          <Select label="Date format" options={DATE_FORMAT_OPTIONS} value={values.dateFormat} onChange={(e) => handleChange('dateFormat', e.target.value)} />
        </div>
      </ConfigSectionCard>

      <ConfigSectionCard icon={<FiCalendar size={18} />} title="Academic Year" description="When the academic year begins">
        <Select label="Academic year start month" options={YEAR_START_OPTIONS} value={values.academicYearStart} onChange={(e) => handleChange('academicYearStart', e.target.value)} />
      </ConfigSectionCard>

      <Button onClick={handleSave} loading={loading} className="self-end">
        Save Configuration
      </Button>
    </div>
  );
};

export default SystemConfiguration;
