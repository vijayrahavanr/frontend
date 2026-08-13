import { CircularProgress } from '@mui/material';

/**
 * Small inline spinner for buttons, cards, or table sections
 * that are individually loading (as opposed to a full route change).
 * @param {{ size?: number }} props
 */
const Spinner = ({ size = 20 }) => <CircularProgress size={size} thickness={4} />;

export default Spinner;
