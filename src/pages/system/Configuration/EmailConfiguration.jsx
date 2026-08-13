import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiMail, FiServer } from 'react-icons/fi';
import { useConfig } from '@/hooks/useConfig';
import Header from '@/components/common/Header';
import ConfigSectionCard from '@/components/system/ConfigSectionCard';
import Input from '@/components/common/Input';
import PasswordInput from '@/components/common/PasswordInput';
import Select from '@/components/common/Select';
import Button from '@/components/common/Button';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';
import { selectCurrentUser } from '@/redux/slices/authSlice';
import { useAppSelector } from '@/redux/hooks';

const ENCRYPTION_OPTIONS = [
  { label: 'TLS', value: 'tls' },
  { label: 'SSL', value: 'ssl' },
  { label: 'None', value: 'none' },
];

/**
 * SMTP/email configuration — backed by systemSlice's emailConfig via
 * useConfig, with a "send test email" action to the current user.
 */
const EmailConfiguration = () => {
  const { emailConfig, loading, error, fetchEmailConfig, saveEmailConfig, testEmail } = useConfig();
  const currentUser = useAppSelector(selectCurrentUser);
  const [values, setValues] = useState({
    smtpHost: '',
    smtpPort: '',
    smtpUsername: '',
    smtpPassword: '',
    encryption: 'tls',
    fromAddress: '',
  });

  useEffect(() => {
    fetchEmailConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (emailConfig) setValues((prev) => ({ ...prev, ...emailConfig, smtpPassword: '' }));
  }, [emailConfig]);

  const handleChange = (field, value) => setValues((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    const result = await saveEmailConfig(values);
    if (result.meta.requestStatus === 'fulfilled') toast.success('Email configuration saved.');
  };

  const handleTestEmail = async () => {
    const result = await testEmail({ recipient: currentUser?.email });
    if (result.meta.requestStatus === 'fulfilled') toast.success('Test email sent successfully.');
  };

  if (error) return <ErrorState description={error} onRetry={fetchEmailConfig} />;
  if (loading && !emailConfig) return <Skeleton className="h-96 rounded-2xl" />;

  return (
    <div className="flex flex-col gap-6">
      <Header title="Email Configuration" description="SMTP settings used for outgoing platform emails" />

      <ConfigSectionCard icon={<FiServer size={18} />} title="SMTP Server" description="Connection details for your mail server">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="SMTP host" value={values.smtpHost} onChange={(e) => handleChange('smtpHost', e.target.value)} />
          <Input label="SMTP port" value={values.smtpPort} onChange={(e) => handleChange('smtpPort', e.target.value)} />
          <Input label="Username" value={values.smtpUsername} onChange={(e) => handleChange('smtpUsername', e.target.value)} />
          <PasswordInput label="Password" value={values.smtpPassword} onChange={(e) => handleChange('smtpPassword', e.target.value)} />
          <Select label="Encryption" options={ENCRYPTION_OPTIONS} value={values.encryption} onChange={(e) => handleChange('encryption', e.target.value)} />
        </div>
      </ConfigSectionCard>

      <ConfigSectionCard icon={<FiMail size={18} />} title="Sender Details" description="The address platform emails are sent from">
        <Input label="From address" type="email" value={values.fromAddress} onChange={(e) => handleChange('fromAddress', e.target.value)} />
      </ConfigSectionCard>

      <div className="flex justify-end gap-2">
        <Button variant="outlined" onClick={handleTestEmail} loading={loading}>
          Send Test Email
        </Button>
        <Button onClick={handleSave} loading={loading}>
          Save Configuration
        </Button>
      </div>
    </div>
  );
};

export default EmailConfiguration;
