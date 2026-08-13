import { useState } from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText, Divider as MuiDivider } from '@mui/material';

/**
 * Trigger-driven dropdown menu. Pass a `trigger` render function that
 * receives `(openMenu, isOpen)` so callers can style their own
 * trigger button/icon.
 *
 * @param {object} props
 * @param {(open: (e) => void, isOpen: boolean) => React.ReactNode} props.trigger
 * @param {{label: string, icon?: React.ReactNode, onClick?: () => void, divider?: boolean, danger?: boolean}[]} props.items
 */
const Dropdown = ({ trigger, items = [], className }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      {trigger(handleOpen, open)}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className={className}
        slotProps={{
          paper: {
            sx: {
              borderRadius: '0.75rem',
              minWidth: 180,
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)',
              mt: 0.5,
            },
          },
        }}
      >
        {items.map((item, index) =>
          item.divider ? (
            <MuiDivider key={`divider-${index}`} />
          ) : (
            <MenuItem
              key={item.label}
              onClick={() => {
                item.onClick?.();
                handleClose();
              }}
              disabled={item.disabled}
              sx={item.danger ? { color: '#EF4444' } : undefined}
            >
              {item.icon && <ListItemIcon sx={{ minWidth: 32 }}>{item.icon}</ListItemIcon>}
              <ListItemText>{item.label}</ListItemText>
            </MenuItem>
          )
        )}
      </Menu>
    </>
  );
};

export default Dropdown;
