import { useEffect, useState } from 'react';
import { useHelp } from '@/hooks/useHelp';
import Header from '@/components/common/Header';
import SearchInput from '@/components/common/SearchInput';
import FAQAccordionItem from '@/components/system/FAQAccordionItem';
import Tabs from '@/components/common/Tabs';
import EmptyState from '@/components/empty-state/EmptyState';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';
import useDebounce from '@/hooks/useDebounce';

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Attendance', value: 'attendance' },
  { label: 'Account', value: 'account' },
  { label: 'Reports', value: 'reports' },
];

/**
 * FAQ page — backed by helpSlice's faqs via useHelp.
 */
const FAQ = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const debouncedQuery = useDebounce(query, 300);
  const { faqs, loading, error, fetchFAQs } = useHelp();

  useEffect(() => {
    fetchFAQs({ query: debouncedQuery || undefined, category: category === 'all' ? undefined : category });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, category]);

  if (error) return <ErrorState description={error} onRetry={() => fetchFAQs({ query: debouncedQuery, category })} />;

  return (
    <div className="flex flex-col gap-6">
      <Header title="Frequently Asked Questions" description="Quick answers to common questions" />

      <SearchInput value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search FAQs..." className="max-w-lg" />

      <Tabs tabs={CATEGORIES} value={category} onChange={setCategory} />

      {loading && !faqs.length ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-12 rounded-xl" />
          ))}
        </div>
      ) : faqs.length === 0 ? (
        <EmptyState title="No matching questions" compact />
      ) : (
        <div className="flex flex-col gap-2">
          {faqs.map((faq) => (
            <FAQAccordionItem key={faq.question} faq={faq} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FAQ;
