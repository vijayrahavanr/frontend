import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiInfo, FiClock } from 'react-icons/fi';
import { useAttendance } from '@/hooks/useAttendance';
import StudentTopbar from '@/components/student/StudentTopbar';
import FaceVerificationCard from '@/components/student/FaceVerificationCard';
import Alert from '@/components/common/Alert';

const TIPS = [
  'Ensure your face is well-lit and clearly visible to the camera.',
  'Remove masks, sunglasses, or anything covering your face.',
  'Look directly at the camera and stay still during verification.',
  'Verification typically completes within a few seconds.',
];

/**
 * Face recognition verification flow. As with QR scanning, the real
 * camera/detection pipeline lives outside this frontend module — this
 * wires the outcome into attendanceSlice via useAttendance so a
 * successful verification refreshes the attendance summary.
 */
const FaceVerification = () => {
  const { fetchSummary } = useAttendance();
  const [status, setStatus] = useState('idle');
  const [verifyError, setVerifyError] = useState(null);

  const handleToggle = () => {
    if (status === 'scanning') {
      setStatus('idle');
      return;
    }
    setStatus('scanning');
    setVerifyError(null);
    fetchSummary().then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        setStatus('success');
      } else {
        setStatus('error');
        setVerifyError(result.payload || 'Could not verify your identity. Please try again.');
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <StudentTopbar title="Face Recognition" subtitle="Verify your identity to mark attendance" />

      {status === 'success' && (
        <Alert type="success" title="Identity verified" onDismiss={() => setStatus('idle')}>
          Your attendance has been recorded via face recognition.
        </Alert>
      )}
      {status === 'error' && verifyError && (
        <Alert type="error" title="Verification failed" onDismiss={() => setStatus('idle')}>
          {verifyError}
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <FaceVerificationCard status={status} onToggleVerification={handleToggle} className="lg:col-span-2" />

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-surface-dark-elevated">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
              <FiInfo size={15} className="text-primary" />
              Tips for a quick scan
            </p>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-500 dark:text-slate-400">
              {TIPS.map((tip) => (
                <li key={tip} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <Link
            to="/student/face-recognition/history"
            className="flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-300 p-3 text-xs font-medium text-slate-500 hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-400"
          >
            <FiClock size={13} />
            View verification history
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FaceVerification;
