import { useEffect, useState } from 'react';
import { useAttendanceAnalytics } from '@/hooks/useAttendanceAnalytics';
import AdminTopbar from '@/components/admin/AdminTopbar';
import Select from '@/components/common/Select';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import DoughnutChart from '@/components/charts/DoughnutChart';
import ChartContainer from '@/components/common/ChartContainer';
import { COLORS } from '@/constants/theme.constants';
import { formatChartData } from '@/utils/dashboardHelpers';

const DEPARTMENT_OPTIONS = [
  { label: 'All departments', value: 'all' },
  { label: 'Computer Science', value: 'CSE' },
  { label: 'Electronics', value: 'ECE' },
];

/**
 * Deeper attendance analytics — backed by attendanceSlice's
 * institution-wide analytics via useAttendanceAnalytics.
 */
const AttendanceAnalytics = () => {
  const { analytics, loading, fetchAnalytics } = useAttendanceAnalytics();
  const [department, setDepartment] = useState('all');

  useEffect(() => {
    fetchAnalytics({ department: department === 'all' ? undefined : department });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [department]);

  const trend = formatChartData(analytics?.trend ?? []);
  const subjectWise = formatChartData(analytics?.subjectWise ?? []);
  const statusBreakdown = analytics?.statusBreakdown ?? { labels: [], data: [] };

  return (
    <div className="flex flex-col gap-6">
      <AdminTopbar title="Attendance Analytics" subtitle="Deeper breakdown by department, class, and subject" />

      <div className="max-w-xs">
        <Select label="Department" options={DEPARTMENT_OPTIONS} value={department} onChange={(e) => setDepartment(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ChartContainer title="Attendance Trend" subtitle="Last 6 months" className="lg:col-span-2" loading={loading} isEmpty={!trend.labels.length}>
          <LineChart labels={trend.labels} datasets={[{ label: 'Attendance %', data: trend.data, borderColor: COLORS.primary }]} height={280} />
        </ChartContainer>

        <ChartContainer title="Status Breakdown" subtitle="Today" loading={loading} isEmpty={!statusBreakdown.labels?.length}>
          <div className="flex h-full flex-col items-center justify-center">
            <DoughnutChart labels={statusBreakdown.labels} data={statusBreakdown.data} height={220} />
          </div>
        </ChartContainer>
      </div>

      <ChartContainer title="Subject-wise Attendance" subtitle="Current semester average" loading={loading} isEmpty={!subjectWise.labels.length}>
        <BarChart labels={subjectWise.labels} datasets={[{ label: 'Attendance %', data: subjectWise.data, backgroundColor: COLORS.secondary }]} height={280} />
      </ChartContainer>
    </div>
  );
};

export default AttendanceAnalytics;
