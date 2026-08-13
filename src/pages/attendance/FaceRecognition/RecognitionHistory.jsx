import { useEffect, useState } from 'react';
import { useFaceRecognition } from '@/hooks/useFaceRecognition';
import Header from '@/components/common/Header';
import RecognitionHistoryCard from '@/components/attendance/RecognitionHistoryCard';
import AttendanceSearch from '@/components/attendance/AttendanceSearch';
import AttendanceExportCard from '@/components/attendance/AttendanceExportCard';
import EmptyState from '@/components/empty-state/EmptyState';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';

/**
 * Face-recognition attempt history — backed by faceRecognitionSlice
 * via useFaceRecognition.
 */
const RecognitionHistory = () => {
  const { recognitionHistory, loading, error, fetchHistory } = useFaceRecognition();
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = recognitionHistory.filter((e) => e.name?.toLowerCase().includes(query.toLowerCase()));

  if (error) return <ErrorState description={error} onRetry={fetchHistory} />;

  return (
    <div className="flex flex-col gap-6">
      <Header title="Recognition History" description="Every face verification attempt on record" />

      <AttendanceSearch value={query} onChange={(e) => setQuery(e.target.value)} className="max-w-xs" />

      {loading && !recognitionHistory.length ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState title="No matching records" compact />
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((entry) => (
            <RecognitionHistoryCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}

      <AttendanceExportCard title="Export recognition history" description="Download this history as CSV or PDF." />
    </div>
  );
};

export default RecognitionHistory;
