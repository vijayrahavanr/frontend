import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHelpCircle, FiMessageSquare, FiLifeBuoy } from 'react-icons/fi';
import { useHelp } from '@/hooks/useHelp';
import Header from '@/components/common/Header';
import SearchInput from '@/components/common/SearchInput';
import HelpArticleCard from '@/components/system/HelpArticleCard';
import Button from '@/components/common/Button';
import EmptyState from '@/components/empty-state/EmptyState';
import ErrorState from '@/components/error/ErrorState';
import Skeleton from '@/components/common/Skeleton';
import useDebounce from '@/hooks/useDebounce';

/**
 * Help Center landing page — backed by helpSlice's articles via
 * useHelp.
 */
const HelpCenter = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const { articles, loading, error, fetchArticles } = useHelp();

  useEffect(() => {
    fetchArticles({ query: debouncedQuery || undefined });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  if (error) return <ErrorState description={error} onRetry={() => fetchArticles({ query: debouncedQuery })} />;

  return (
    <div className="flex flex-col gap-6">
      <Header title="Help Center" description="Find answers, get support, or share feedback" />

      <SearchInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search help articles..."
        className="max-w-lg"
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Link to="/help/faq">
          <Button variant="outlined" fullWidth startIcon={<FiHelpCircle size={16} />} className="justify-start">
            Frequently Asked Questions
          </Button>
        </Link>
        <Link to="/help/tickets">
          <Button variant="outlined" fullWidth startIcon={<FiLifeBuoy size={16} />} className="justify-start">
            Support Tickets
          </Button>
        </Link>
        <Link to="/help/feedback">
          <Button variant="outlined" fullWidth startIcon={<FiMessageSquare size={16} />} className="justify-start">
            Share Feedback
          </Button>
        </Link>
      </div>

      {loading && !articles.length ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      ) : articles.length === 0 ? (
        <EmptyState title="No articles found" description="Try a different search term." compact />
      ) : (
        <div className="flex flex-col gap-2">
          {articles.map((article) => (
            <HelpArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HelpCenter;
