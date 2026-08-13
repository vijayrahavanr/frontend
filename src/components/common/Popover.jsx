import { Popover as MuiPopover } from '@mui/material';

/**
 * Generic floating panel anchored to a trigger element. Thin wrapper
 * around MUI's Popover (which already manages focus trapping, ESC
 * close, and outside-click close) restyled to the app's tokens.
 *
 * @param {object} props
 * @param {HTMLElement|null} props.anchorEl
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 */
const Popover = ({
  anchorEl,
  open,
  onClose,
  children,
  anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
  transformOrigin = { vertical: 'top', horizontal: 'left' },
  className,
  ...rest
}) => {
  return (
    <MuiPopover
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      slotProps={{
        paper: {
          className,
          sx: {
            borderRadius: '0.75rem',
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)',
            mt: 0.5,
          },
        },
      }}
      {...rest}
    >
      {children}
    </MuiPopover>
  );
};

export default Popover;
