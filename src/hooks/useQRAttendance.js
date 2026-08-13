import { useCallback } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { useAppSelector } from '../redux/hooks';
import {
  generateQRCode,
  verifyQRCode,
  getQRHistory,
  getQRStatistics,
  downloadQRCode,
  clearError,
  clearScanResult,
  resetQrAttendanceState,
  selectGeneratedQR,
  selectQRHistory,
  selectScanHistory,
  selectScanResult,
  selectQRStatistics,
  selectQRAttendanceLoading,
  selectQRAttendanceError,
} from '@/redux/slices/qrAttendanceSlice';

/**
 * Encapsulates QR-attendance state + actions behind one hook —
 * generating session codes, verifying scans (including the
 * duplicate-scan outcome), history, and statistics.
 */
export const useQRAttendance = () => {
  const dispatch = useAppDispatch();

  const generatedQR = useAppSelector(selectGeneratedQR);
  const history = useAppSelector(selectQRHistory);
  const scanHistory = useAppSelector(selectScanHistory);
  const scanResult = useAppSelector(selectScanResult);
  const statistics = useAppSelector(selectQRStatistics);
  const loading = useAppSelector(selectQRAttendanceLoading);
  const error = useAppSelector(selectQRAttendanceError);

  const generate = useCallback((payload) => dispatch(generateQRCode(payload)), [dispatch]);
  const verify = useCallback((payload) => dispatch(verifyQRCode(payload)), [dispatch]);
  const fetchHistory = useCallback((params) => dispatch(getQRHistory(params)), [dispatch]);
  const fetchStatistics = useCallback((params) => dispatch(getQRStatistics(params)), [dispatch]);
  const download = useCallback((qrValue) => dispatch(downloadQRCode(qrValue)), [dispatch]);
  const resetScanResult = useCallback(() => dispatch(clearScanResult()), [dispatch]);
  const resetError = useCallback(() => dispatch(clearError()), [dispatch]);
  const reset = useCallback(() => dispatch(resetQrAttendanceState()), [dispatch]);

  return {
    // state
    generatedQR,
    history,
    scanHistory,
    scanResult,
    statistics,
    loading,
    error,
    // actions
    generate,
    verify,
    fetchHistory,
    fetchStatistics,
    download,
    resetScanResult,
    resetError,
    reset,
  };
};

export default useQRAttendance;
