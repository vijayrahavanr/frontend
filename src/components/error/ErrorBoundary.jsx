import { Component } from 'react';
import { FiAlertOctagon, FiRefreshCw, FiHome } from 'react-icons/fi';
import Button from '../common/Button';

/**
 * Top-level (and section-level) crash guard. React error boundaries
 * must be class components — there is no hook equivalent — so this
 * stays a class even though the rest of the app is functional.
 *
 * Usage:
 *   <ErrorBoundary><AppRoutes /></ErrorBoundary>
 *   <ErrorBoundary fallbackTitle="This widget failed to load"><Chart /></ErrorBoundary>
 *
 * In production this swallows the crash and shows a recovery screen
 * instead of an unmounted white page. In development it also logs the
 * component stack to the console so the underlying error is still
 * easy to find.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.MODE !== 'production') {
      // eslint-disable-next-line no-console
      console.error('ErrorBoundary caught:', error, errorInfo?.componentStack);
    }
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    if (this.props.fallback) {
      return typeof this.props.fallback === 'function'
        ? this.props.fallback({ error: this.state.error, reset: this.handleReset })
        : this.props.fallback;
    }

    return (
      <div
        role="alert"
        className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 py-16 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-danger/10 text-danger">
          <FiAlertOctagon size={26} />
        </span>
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            {this.props.fallbackTitle || 'Something went wrong'}
          </h2>
          <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            {this.props.fallbackDescription ||
              "This part of the app hit an unexpected error. You can try again, or head back to the dashboard."}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outlined" startIcon={<FiRefreshCw size={15} />} onClick={this.handleReset}>
            Try again
          </Button>
          <Button startIcon={<FiHome size={15} />} onClick={() => window.location.assign('/')}>
            Go to dashboard
          </Button>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
