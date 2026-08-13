import { forwardRef, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Input from './Input';

/**
 * Password field with a show/hide toggle. Wraps Input so it inherits
 * label, error, helper text, and RHF-ref-forwarding behavior.
 */
const PasswordInput = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      ref={ref}
      type={visible ? 'text' : 'password'}
      suffixIcon={
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="pointer-events-auto flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          tabIndex={0}
        >
          {visible ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      }
      {...props}
    />
  );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
