import { useCallback } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { useAppSelector } from '../redux/hooks';
import {
  registerFace,
  verifyFace,
  getRecognitionHistory,
  getRecognitionAnalytics,
  clearError,
  clearVerificationResult,
  setCameraStatus,
  resetFaceRecognitionState,
  selectRegisteredFaces,
  selectVerificationResult,
  selectRecognitionHistory,
  selectRecognitionAnalytics,
  selectCameraStatus,
  selectFaceRecognitionLoading,
  selectFaceRecognitionError,
  selectFaceRecognitionSuccess,
} from '@/redux/slices/faceRecognitionSlice';

/**
 * Encapsulates face-recognition state + actions behind one hook —
 * registration, verification (including the no-match outcome),
 * history, analytics, and camera permission status.
 */
export const useFaceRecognition = () => {
  const dispatch = useAppDispatch();

  const registeredFaces = useAppSelector(selectRegisteredFaces);
  const verificationResult = useAppSelector(selectVerificationResult);
  const recognitionHistory = useAppSelector(selectRecognitionHistory);
  const recognitionAnalytics = useAppSelector(selectRecognitionAnalytics);
  const cameraStatus = useAppSelector(selectCameraStatus);
  const loading = useAppSelector(selectFaceRecognitionLoading);
  const error = useAppSelector(selectFaceRecognitionError);
  const success = useAppSelector(selectFaceRecognitionSuccess);

  const register = useCallback((payload) => dispatch(registerFace(payload)), [dispatch]);
  const verify = useCallback((payload) => dispatch(verifyFace(payload)), [dispatch]);
  const fetchHistory = useCallback(
    (params) => dispatch(getRecognitionHistory(params)),
    [dispatch]
  );
  const fetchAnalytics = useCallback(
    (params) => dispatch(getRecognitionAnalytics(params)),
    [dispatch]
  );
  const updateCameraStatus = useCallback(
    (status) => dispatch(setCameraStatus(status)),
    [dispatch]
  );
  const resetVerificationResult = useCallback(
    () => dispatch(clearVerificationResult()),
    [dispatch]
  );
  const resetError = useCallback(() => dispatch(clearError()), [dispatch]);
  const reset = useCallback(() => dispatch(resetFaceRecognitionState()), [dispatch]);

  return {
    // state
    registeredFaces,
    verificationResult,
    recognitionHistory,
    recognitionAnalytics,
    cameraStatus,
    loading,
    error,
    success,
    // actions
    register,
    verify,
    fetchHistory,
    fetchAnalytics,
    updateCameraStatus,
    resetVerificationResult,
    resetError,
    reset,
  };
};

export default useFaceRecognition;
