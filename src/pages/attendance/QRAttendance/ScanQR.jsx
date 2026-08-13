import { Link } from 'react-router-dom';
import { FiInfo, FiClock } from 'react-icons/fi';
import { useQRAttendance } from '@/hooks/useQRAttendance';
import Header from '@/components/common/Header';
import QRScannerCard from '@/components/attendance/QRScannerCard';
import Alert from '@/components/common/Alert';
import { isValidQRPayload } from '@/utils/qrHelpers';

const INSTRUCTIONS = [
  'Point your camera at the QR code displayed by your instructor.',
  'Hold steady until the code is recognized.',
  'Each code is valid for a limited time and can only be used once.',
];

/**
 * QR scan screen — dispatches qrAttendanceSlice's verifyQRCode thunk
 * via useQRAttendance, including the distinct duplicate-scan outcome.
 */
const ScanQR = () => {
  const { scanResult, loading, verify, resetScanResult } = useQRAttendance();

  // Placeholder for the real scanner's decode callback — in this
  // phase there's no camera/QR-decode library wired up, so "scanning"
  // just verifies a stand-in payload to exercise the full outcome flow.
  const handleToggleScan = () => {
    if (loading) return;
    const simulatedPayload = 'CS301-A-simulated';
    if (!isValidQRPayload(simulatedPayload)) return;
    verify({ qrValue: simulatedPayload });
  };

  const status = loading ? 'scanning' : scanResult?.status || 'idle';

  return (
    <div className="flex flex-col gap-6">
      <Header title="Scan QR Code" description="Scan the session QR code to mark your attendance" />

      {status === 'duplicate' && (
        <Alert type="warning" title="Already scanned" onDismiss={resetScanResult}>
          {scanResult?.message || "You've already been marked present for this session."}
        </Alert>
      )}
      {status === 'error' && scanResult?.message && (
        <Alert type="error" title="Scan failed" onDismiss={resetScanResult}>
          {scanResult.message}
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <QRScannerCard
          status={status}
          message={status === 'success' ? 'You have been marked present.' : undefined}
          onToggleScan={handleToggleScan}
          className="lg:col-span-2"
        />

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
            to="/attendance/qr/history"
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
