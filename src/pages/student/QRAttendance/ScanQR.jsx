import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiInfo, FiClock } from 'react-icons/fi';
import { useAttendance } from '@/hooks/useAttendance';
import StudentTopbar from '@/components/student/StudentTopbar';
import QRScannerCard from '@/components/student/QRScannerCard';
import Alert from '@/components/common/Alert';

const INSTRUCTIONS = [
  'Open the scanner and point your camera at the QR code displayed by your faculty.',
  'Hold steady until the code is recognized — this usually takes a second or two.',
  'A confirmation will appear once your attendance has been recorded.',
  'Each QR code is valid only for the current class session.',
];

/**
 * QR Attendance scan flow. The actual camera/decode pipeline is out
 * of scope for this frontend module — this wires the resulting scan
 * outcome into attendanceSlice via useAttendance so a successful scan
 * refreshes the student's attendance summary.
 */
const ScanQR = () => {
  const { fetchSummary } = useAttendance();
  const [status, setStatus] = useState('idle');
  const [scanError, setScanError] = useState(null);

  const handleToggleScan = () => {
    if (status === 'scanning') {
      setStatus('idle');
      return;
    }
    setStatus('scanning');
    setScanError(null);
    // Placeholder for the real QR decode result — on success this
    // would receive a session token from the scanner and call a
    // "markQrAttendance" thunk; for now it just refreshes the summary.
    fetchSummary().then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        setStatus('success');
      } else {
        setStatus('error');
        setScanError(result.payload || 'Could not verify attendance. Please try again.');
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <StudentTopbar title="QR Attendance" subtitle="Scan the class QR code to mark your attendance" />

      {status === 'success' && (
        <Alert type="success" title="Attendance marked" onDismiss={() => setStatus('idle')}>
          You've been marked present for the current session.
        </Alert>
      )}
      {status === 'error' && scanError && (
        <Alert type="error" title="Scan failed" onDismiss={() => setStatus('idle')}>
          {scanError}
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <QRScannerCard status={status} onToggleScan={handleToggleScan} className="lg:col-span-2" />

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-surface-dark-elevated">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
              <FiInfo size={15} className="text-primary" />
              How it works
            </p>
            <ol className="flex flex-col gap-2.5 text-xs text-slate-500 dark:text-slate-400">
              {INSTRUCTIONS.map((step, i) => (
                <li key={step} className="flex gap-2">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary-50 text-[10px] font-semibold text-primary dark:bg-primary-900/20">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <Link
            to="/student/qr-attendance/history"
            className="flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-300 p-3 text-xs font-medium text-slate-500 hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-400"
          >
            <FiClock size={13} />
            View scan history
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScanQR;
