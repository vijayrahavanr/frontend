import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiSliders, FiUpload, FiToggleRight } from 'react-icons/fi';
import { useConfig } from '@/hooks/useConfig';
import Header from '@/components/common/Header';
import ConfigSectionCard from '@/components/system/ConfigSectionCard';
import ConfigToggleRow from '@/components/system/ConfigToggleRow';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import Button from '@/components/common/Button';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';

const PAGE_SIZE_OPTIONS = [
  { label: '10 per page', value: '10' },
  { label: '25 per page', value: '25' },
  { label: '50 per page', value: '50' },
];

const DEFAULT_FEATURES = { qrAttendance: true, faceRecognition: true, darkMode: true, notifications: true };

/**
 * Application-level configuration — backed by systemSlice's
 * applicationConfig via useConfig.
 */
const ApplicationConfiguration = () => {
  const { applicationConfig, loading, error, fetchApplicationConfig, saveApplicationConfig } = useConfig();
  const [values, setValues] = useState({ defaultPageSize: '10', maxUploadSizeMB: '10' });
  const [features, setFeatures] = useState(DEFAULT_FEATURES);

  useEffect(() => {
    fetchApplicationConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (applicationConfig) {
      setValues((prev) => ({ ...prev, ...applicationConfig }));
      if (applicationConfig.features) setFeatures((prev) => ({ ...prev, ...applicationConfig.features }));
    }
  }, [applicationConfig]);

  const toggleFeature = (key) => setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  const handleChange = (field, value) => setValues((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    const result = await saveApplicationConfig({ ...values, features });
    if (result.meta.requestStatus === 'fulfilled') toast.success('Application configuration saved.');
  };

  if (error) return <ErrorState description={error} onRetry={fetchApplicationConfig} />;
  if (loading && !applicationConfig) return <Skeleton className="h-96 rounded-2xl" />;

  return (
    <div className="flex flex-col gap-6">
      <Header title="Application Configuration" description="Feature toggles and application defaults" />

      <ConfigSectionCard icon={<FiToggleRight size={18} />} title="Feature Toggles" description="Enable or disable platform features">
        <ConfigToggleRow title="QR Attendance" checked={features.qrAttendance} onChange={() => toggleFeature('qrAttendance')} />
        <ConfigToggleRow title="Face Recognition" checked={features.faceRecognition} onChange={() => toggleFeature('faceRecognition')} />
        <ConfigToggleRow title="Dark Mode" checked={features.darkMode} onChange={() => toggleFeature('darkMode')} />
        <ConfigToggleRow title="Notifications" checked={features.notifications} onChange={() => toggleFeature('notifications')} />
      </ConfigSectionCard>

      <ConfigSectionCard icon={<FiSliders size={18} />} title="Display Defaults" description="Default pagination and list behavior">
        <Select label="Default page size" options={PAGE_SIZE_OPTIONS} value={values.defaultPageSize} onChange={(e) => handleChange('defaultPageSize', e.target.value)} />
      </ConfigSectionCard>

      <ConfigSectionCard icon={<FiUpload size={18} />} title="File Uploads" description="Limits for uploaded files (profile photos, documents)">
        <Input label="Max upload size (MB)" type="number" value={values.maxUploadSizeMB} onChange={(e) => handleChange('maxUploadSizeMB', e.target.value)} />
      </ConfigSectionCard>

      <Button onClick={handleSave} loading={loading} className="self-end">
        Save Configuration
      </Button>
    </div>
  );
};

export default ApplicationConfiguration;
