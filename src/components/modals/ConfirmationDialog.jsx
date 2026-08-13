import { FiAlertTriangle, FiCheckCircle, FiXCircle, FiTrash2, FiHelpCircle } from 'react-icons/fi';
import { cn } from '@/utils/helpers';
import Modal from './Modal';
import Button from '../common/Button';

const VARIANTS = {
  confirm: { icon: FiHelpCircle, iconClass: 'bg-primary-50 text-primary', confirmVariant: 'primary' },
  delete: { icon: FiTrash2, iconClass: 'bg-danger/10 text-danger', confirmVariant: 'danger' },
  warning: { icon: FiAlertTriangle, iconClass: 'bg-warning/10 text-warning', confirmVariant: 'warning' },
  success: { icon: FiCheckCircle, iconClass: 'bg-success/10 text-success', confirmVariant: 'success' },
  error: { icon: FiXCircle, iconClass: 'bg-danger/10 text-danger', confirmVariant: 'danger' },
};

/**
 * Preconfigured confirmation dialog for common flows: generic confirm,
 * delete, warning, success acknowledgement, and error acknowledgement.
 *
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {() => void} [props.onConfirm]
 * @param {'confirm'|'delete'|'warning'|'success'|'error'} [props.variant]
 * @param {string} [props.confirmLabel]
 * @param {boolean} [props.loading]
 */
const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  variant = 'confirm',
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  loading = false,
  hideCancel = false,
}) => {
  const { icon: Icon, iconClass, confirmVariant } = VARIANTS[variant];

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      footer={
        <>
          {!hideCancel && (
            <Button variant="outlined" onClick={onClose} disabled={loading}>
              {cancelLabel}
            </Button>
          )}
          <Button variant={confirmVariant} onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <span className={cn('flex h-12 w-12 items-center justify-center rounded-full', iconClass)}>
          <Icon size={22} />
        </span>
        {title && <p className="text-base font-semibold text-slate-800 dark:text-slate-100">{title}</p>}
        {description && (
          <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
        )}
      </div>
    </Modal>
  );
};

export default ConfirmationDialog;
