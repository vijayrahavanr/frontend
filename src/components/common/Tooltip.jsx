import { Tooltip as MuiTooltip } from '@mui/material';

/**
 * Thin wrapper around MUI's Tooltip so the whole app shares one
 * consistent tooltip look, delay, and accessibility behavior
 * (MUI handles ARIA + keyboard focus triggering out of the box).
 *
 * @param {object} props
 * @param {React.ReactNode} props.title
 * @param {React.ReactElement} props.children - single focusable/hoverable element
 * @param {'top'|'bottom'|'left'|'right'} [props.placement]
 */
const Tooltip = ({ title, children, placement = 'top', ...rest }) => {
  if (!title) return children;

  return (
    <MuiTooltip
      title={title}
      placement={placement}
      arrow
      enterDelay={300}
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: '#0F172A',
            fontSize: '0.75rem',
            borderRadius: '0.5rem',
            px: 1.5,
            py: 0.75,
          },
        },
        arrow: { sx: { color: '#0F172A' } },
      }}
      {...rest}
    >
      {children}
    </MuiTooltip>
  );
};

export default Tooltip;
