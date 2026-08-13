import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiClock } from 'react-icons/fi';
import { useQRAttendance } from '@/hooks/useQRAttendance';
import Header from '@/components/common/Header';
import QRCodeCard from '@/components/attendance/QRCodeCard';
import Select from '@/components/common/Select';
import Button from '@/components/common/Button';
import Alert from '@/components/common/Alert';
import { getSecondsUntilExpiry } from '@/utils/qrHelpers';

const SUBJECT_OPTIONS = [
  { label: 'Data Structures', value: 'CS301' },
  { label: 'Operating Systems', value: 'CS302' },
];
const SECTION_OPTIONS = [
  { label: 'Section A', value: 'A' },
  { label: 'Section B', value: 'B' },
];

/**
 * QR generation screen — dispatches qrAttendanceSlice's
 * generateQRCode/downloadQRCode thunks via useQRAttendance.
 */
const GenerateQR = () => {
  const [subject, setSubject] = useState(SUBJECT_OPTIONS[0].value);
  const [section, setSection] = useState(SECTION_OPTIONS[0].value);
  const [expired, setExpired] = useState(false);
  const { generatedQR, loading, error, generate, download } = useQRAttendance();

  const handleGenerate = async () => {
    setExpired(false);
    await generate({ subjectId: subject, section, expiresInSeconds: 60 });
  };

  const handleDownload = () => {
    if (generatedQR?.qrValue) download(generatedQR.qrValue);
  };

  const expiresInSeconds = generatedQR?.expiresAt
    ? getSecondsUntilExpiry(generatedQR.expiresAt)
    : 60;

  return (
    <div className="flex flex-col gap-6">
      <Header title="Generate QR Code" description="Create a session QR code for students to scan" />

      {error && <Alert type="error" title="Couldn't generate QR code">{error}</Alert>}
      {expired && (
        <Alert type="warning" title="QR code expired" onDismiss={() => setExpired(false)}>
          Generate a new code to keep accepting attendance for this session.
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-surface-dark-elevated lg:col-span-1">
          <Select label="Subject" options={SUBJECT_OPTIONS} value={subject} onChange={(e) => setSubject(e.target.value)} />
          <Select label="Section" options={SECTION_OPTIONS} value={section} onChange={(e) => setSection(e.target.value)} />
          <Button onClick={handleGenerate} startIcon={<FiClock size={15} />} loading={loading}>
            Generate QR Code
          </Button>
          <Link
            to="/attendance/qr/history"
            className="text-center text-xs font-medium text-slate-500 hover:text-primary dark:text-slate-400"
          >
            View QR history
          </Link>
        </div>

        <div className="lg:col-span-2">
          <QRCodeCard
            qrValue={generatedQR?.qrValue}
            expiresInSeconds={expiresInSeconds}
            onExpire={() => setExpired(true)}
            onDownload={handleDownload}
            onShare={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default GenerateQR;
