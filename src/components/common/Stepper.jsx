import { FiCheck } from 'react-icons/fi';
import { cn } from '@/utils/helpers';

/**
 * Horizontal step indicator for multi-step forms/wizards.
 *
 * @param {object} props
 * @param {{label: string, description?: string}[]} props.steps
 * @param {number} props.activeStep - 0-indexed current step
 */
const Stepper = ({ steps = [], activeStep = 0, className }) => {
  return (
    <ol className={cn('flex w-full items-start', className)}>
      {steps.map((step, index) => {
        const isCompleted = index < activeStep;
        const isActive = index === activeStep;
        const isLast = index === steps.length - 1;

        return (
          <li key={step.label} className={cn('flex flex-1 items-center', isLast && 'flex-none')}>
            <div className="flex flex-col items-center gap-1.5">
              <span
                aria-current={isActive ? 'step' : undefined}
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors',
                  isCompleted && 'border-primary bg-primary text-white',
                  isActive && !isCompleted && 'border-primary text-primary',
                  !isActive && !isCompleted && 'border-slate-300 text-slate-400 dark:border-slate-600'
                )}
              >
                {isCompleted ? <FiCheck size={16} /> : index + 1}
              </span>
              <div className="text-center">
                <p
                  className={cn(
                    'text-xs font-medium',
                    isActive || isCompleted
                      ? 'text-slate-800 dark:text-slate-100'
                      : 'text-slate-400'
                  )}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-[11px] text-slate-400">{step.description}</p>
                )}
              </div>
            </div>

            {!isLast && (
              <span
                className={cn(
                  'mx-2 h-0.5 flex-1 rounded-full transition-colors',
                  isCompleted ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
};

export default Stepper;
