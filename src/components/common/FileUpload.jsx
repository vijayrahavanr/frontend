import { forwardRef, useId, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiX, FiFile } from 'react-icons/fi';
import { cn } from '@/utils/helpers';

/**
 * Drag-and-drop / click-to-browse file upload field.
 *
 * Deliberately uncontrolled-friendly: exposes `onChange(fileList)` so it
 * plugs into React Hook Form via `onChange={(files) => field.onChange(files)}`
 * from a Controller render prop.
 *
 * @param {object} props
 * @param {(files: FileList|null) => void} [props.onChange]
 * @param {boolean} [props.multiple]
 * @param {string} [props.accept]
 */
const FileUpload = forwardRef(
  (
    {
      label,
      helperText,
      error,
      required = false,
      disabled = false,
      multiple = false,
      accept,
      onChange,
      className,
      id,
      ...rest
    },
    ref
  ) => {
    const autoId = useId();
    const inputId = id || autoId;
    const errorMessage = typeof error === 'string' ? error : error?.message;
    const inputRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleFiles = (fileList) => {
      const list = Array.from(fileList || []);
      setFiles(list);
      onChange?.(fileList);
    };

    const handleDrop = (event) => {
      event.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      handleFiles(event.dataTransfer.files);
    };

    const removeFile = (index) => {
      const next = files.filter((_, i) => i !== index);
      setFiles(next);
      onChange?.(next.length ? next : null);
    };

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            {label}
            {required && <span className="ml-0.5 text-danger">*</span>}
          </label>
        )}

        <motion.div
          onClick={() => !disabled && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled) setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          aria-disabled={disabled}
          onKeyDown={(e) => {
            if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          animate={{ scale: isDragging ? 1.01 : 1 }}
          className={cn(
            'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-colors',
            isDragging
              ? 'border-primary bg-primary-50 dark:bg-primary-900/10'
              : 'border-slate-300 dark:border-slate-600',
            disabled && 'cursor-not-allowed opacity-60',
            errorMessage && 'border-danger'
          )}
        >
          <FiUploadCloud size={28} className="text-primary" />
          <p className="text-sm text-slate-600 dark:text-slate-300">
            <span className="font-medium text-primary">Click to upload</span> or drag and drop
          </p>
          {accept && (
            <p className="text-xs text-slate-400">
              Accepted: {accept}
            </p>
          )}
          <input
            ref={(node) => {
              inputRef.current = node;
              if (typeof ref === 'function') ref(node);
              else if (ref) ref.current = node;
            }}
            id={inputId}
            type="file"
            multiple={multiple}
            accept={accept}
            disabled={disabled}
            required={required}
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
            {...rest}
          />
        </motion.div>

        {files.length > 0 && (
          <ul className="flex flex-col gap-1.5">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700"
              >
                <span className="flex items-center gap-2 truncate text-slate-600 dark:text-slate-300">
                  <FiFile size={14} />
                  <span className="truncate">{file.name}</span>
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  aria-label={`Remove ${file.name}`}
                  className="text-slate-400 hover:text-danger"
                >
                  <FiX size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}

        {errorMessage ? (
          <p role="alert" className="text-xs text-danger">
            {errorMessage}
          </p>
        ) : (
          helperText && (
            <p className="text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
          )
        )}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

export default FileUpload;
