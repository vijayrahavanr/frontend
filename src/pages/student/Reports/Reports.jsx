import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useReports } from '@/hooks/useReports';
import StudentTopbar from '@/components/student/StudentTopbar';
import ReportCard from '@/components/student/ReportCard';
import BarChart from '@/components/charts/BarChart';
import ChartContainer from '@/components/common/ChartContainer';
import Section from '@/components/common/Section';
import { COLORS } from '@/constants/theme.constants';

const REPORTS = [
  { title: 'Attendance Report', description: 'Full attendance record for this semester', id: 'attendance' },
  { title: 'Performance Report', description: 'Grades and assessment summary', id: 'performance' },
  { title: 'Leave Report', description: 'History of all leave applications', id: 'leave' },
  { title: 'Activity Report', description: 'QR & face recognition attendance log', id: 'activity' },
];

/**
 * Downloadable report placeholders plus a subject-wise performance
 * chart — backed by reportSlice via useReports.
 */
const Reports = () => {
  const { performanceReport, loading, fetchPerformanceReport, download } = useReports();

  useEffect(() => {
    fetchPerformanceReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDownload = async (reportId) => {
    const result = await download({ reportId, format: 'pdf' });
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Report download started.');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <StudentTopbar title="Reports" subtitle="Download attendance and performance summaries" />

      <Section title="Available Reports" spacing="sm">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {REPORTS.map((report) => (
            <ReportCard key={report.id} {...report} onDownload={() => handleDownload(report.id)} />
          ))}
        </div>
      </Section>

      <ChartContainer
        title="Subject-wise Performance"
        subtitle="Average score by subject"
        loading={loading}
        isEmpty={!performanceReport?.labels?.length}
      >
        <BarChart
          labels={performanceReport?.labels ?? []}
          datasets={[
            { label: 'Score', data: performanceReport?.scores ?? [], backgroundColor: COLORS.primary },
          ]}
          height={260}
        />
      </ChartContainer>
    </div>
  );
};

export default Reports;
