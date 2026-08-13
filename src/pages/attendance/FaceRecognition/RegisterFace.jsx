import { useState } from 'react';
import { FiInfo } from 'react-icons/fi';
import { useFaceRecognition } from '@/hooks/useFaceRecognition';
import Header from '@/components/common/Header';
import FaceCaptureCard from '@/components/attendance/FaceCaptureCard';
import FacePreviewCard from '@/components/attendance/FacePreviewCard';
import Alert from '@/components/common/Alert';

const TIPS = [
  'Ensure your face is well-lit and clearly visible.',
  'Remove masks, sunglasses, or anything covering your face.',
  'Look directly at the camera and stay still while capturing.',
];

/**
 * Face registration screen — dispatches faceRecognitionSlice's
 * registerFace thunk via useFaceRecognition. Camera capture itself is
 * a placeholder in this phase; `handleCapture` simulates a captured
 * frame so the full register flow can be exercised end to end.
 */
const RegisterFace = () => {
  const { cameraStatus, loading, error, success, updateCameraStatus, register, resetError } =
    useFaceRecognition();
  const [captured, setCaptured] = useState(false);

  const handleStartCamera = () => updateCameraStatus('active');
  const handleCapture = () => setCaptured(true);
  const handleRetake = () => {
    setCaptured(false);
    updateCameraStatus('active');
  };
  const handleConfirm = () => {
    // Placeholder payload — a real capture would post the actual frame.
    register({ image: 'captured-frame-placeholder' });
  };

  return (
    <div className="flex flex-col gap-6">
      <Header title="Register Face" description="Set up face recognition for attendance verification" />

      {error && (
        <Alert type="error" title="Registration failed" onDismiss={resetError}>
          {error}
        </Alert>
      )}
      {success && <Alert type="success" title="Face registered">{success}</Alert>}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {!captured ? (
            <FaceCaptureCard
              cameraActive={cameraStatus === 'active'}
              onStartCamera={handleStartCamera}
              onCapture={handleCapture}
            />
          ) : (
            <FacePreviewCard
              imageSrc={null}
              onRetake={handleRetake}
              onConfirm={handleConfirm}
              confirming={loading}
            />
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-surface-dark-elevated">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
            <FiInfo size={15} className="text-primary" />
            Tips for a good photo
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
      </div>
    </div>
  );
};

export default RegisterFace;
