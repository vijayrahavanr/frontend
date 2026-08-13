import Checkbox from '@/components/common/Checkbox';

/**
 * "Remember me" checkbox, thin semantic wrapper over the shared
 * Checkbox component so LoginForm reads clearly and the label
 * copy lives in exactly one place.
 *
 * @param {object} props
 * @param {boolean} props.checked
 * @param {(e) => void} props.onChange
 */
const RememberMe = ({ checked, onChange, ...rest }) => (
  <Checkbox label="Remember me" checked={checked} onChange={onChange} {...rest} />
);

export default RememberMe;
