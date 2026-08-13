import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiLock, FiClock, FiShield } from 'react-icons/fi';
import { useConfig } from '@/hooks/useConfig';
import Header from '@/components/common/Header';
import ConfigSectionCard from '@/components/system/ConfigSectionCard';
import ConfigToggleRow from '@/components/system/ConfigToggleRow';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';

const DEFAULT_SECURITY = { requireUppercase: true, requireNumber: true, requireSymbol: false, twoFactorAuth: false };

/**
 * Security configuration — backed by systemSlice's securityConfig
 * via useConfig.
 */
const SecurityConfiguration = () => {
  const { securityConfig, loading, error, fetchSecurityConfig, saveSecurityConfig } = useConfig();
  const [policy, setPolicy] = useState({ minLength: '8', sessionTimeoutMinutes: '20', maxLoginAttempts: '5' });
  const [security, setSecurity] = useState(DEFAULT_SECURITY);

  useEffect(() => {
    fetchSecurityConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (securityConfig) {
      setPolicy((prev) => ({ ...prev, ...securityConfig }));
      setSecurity((prev) => ({ ...prev, ...securityConfig }));
    }
  }, [securityConfig]);

  const toggle = (key) => setSecurity((prev) => ({ ...prev, [key]: !prev[key] }));
  const handleChange = (field, value) => setPolicy((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    const result = await saveSecurityConfig({ ...policy, ...security });
    if (result.meta.requestStatus === 'fulfilled') toast.success('Security configuration saved.');
  };

  if (error) return <ErrorState description={error} onRetry={fetchSecurityConfig} />;
  if (loading && !securityConfig) return <Skeleton className="h-96 rounded-2xl" />;

  return (
    <div className="flex flex-col gap-6">
      <Header title="Security Configuration" description="Password policy, sessions, and authentication settings" />

      <ConfigSectionCard icon={<FiLock size={18} />} title="Password Policy" description="Requirements for new passwords">
        <Input label="Minimum length" type="number" value={policy.minLength} onChange={(e) => handleChange('minLength', e.target.value)} />
        <ConfigToggleRow title="Require uppercase letter" checked={security.requireUppercase} onChange={() => toggle('requireUppercase')} />
        <ConfigToggleRow title="Require number" checked={security.requireNumber} onChange={() => toggle('requireNumber')} />
        <ConfigToggleRow title="Require special character" checked={security.requireSymbol} onChange={() => toggle('requireSymbol')} />
      </ConfigSectionCard>

      <ConfigSectionCard icon={<FiClock size={18} />} title="Session Settings" description="Idle timeout and login attempt limits">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Session timeout (minutes)" type="number" value={policy.sessionTimeoutMinutes} onChange={(e) => handleChange('sessionTimeoutMinutes', e.target.value)} />
          <Input label="Max login attempts" type="number" value={policy.maxLoginAttempts} onChange={(e) => handleChange('maxLoginAttempts', e.target.value)} />
        </div>
      </ConfigSectionCard>

      <ConfigSectionCard icon={<FiShield size={18} />} title="Two-Factor Authentication" description="Require a second verification step at login">
        <ConfigToggleRow title="Enable two-factor authentication" checked={security.twoFactorAuth} onChange={() => toggle('twoFactorAuth')} />
      </ConfigSectionCard>

      <Button onClick={handleSave} loading={loading} className="self-end">
        Save Configuration
      </Button>
    </div>
  );
};

export default SecurityConfiguration;
