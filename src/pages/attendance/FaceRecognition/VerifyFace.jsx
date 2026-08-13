import { Link } from 'react-router-dom';
import { FiClock } from 'react-icons/fi';
import { useFaceRecognition } from '@/hooks/useFaceRecognition';
import Header from '@/components/common/Header';
import CameraPreviewCard from '@/components/attendance/CameraPreviewCard';
import RecognitionStatusCard from '@/components/attendance/RecognitionStatusCard';
import Button from '@/components/common/Button';

/**
 * Face verification screen — dispatches faceRecognitionSlice's
 * verifyFace thunk via useFaceRecognition, including the distinct
 * no-match outcome.
 */
const VerifyFace = () => {
  const { cameraStatus, verificationResult, loading, updateCameraStatus, verify } =
    useFaceRecognition();

  const handleVerify = () => {
    updateCameraStatus('active');
    // Placeholder payload — a real capture would post the actual frame.
    verify({ image: 'captured-frame-placeholder' });
  };

  const status = loading ? 'verifying' : verificationResult?.status || 'idle';

  return (
    <div className="flex flex-col gap-6">
      <Header title="Verify Face" description="Verify your identity to mark attendance" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <CameraPreviewCard state={cameraStatus} onRequestAccess={() => updateCameraStatus('active')} />
          <Button onClick={handleVerify} fullWidth loading={loading}>
            Start Verification
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <RecognitionStatusCard
            status={status}
            confidence={verificationResult?.confidence}
            studentName={verificationResult?.studentName}
          />
          <Link
            to="/attendance/face/history"
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

export default VerifyFace;
