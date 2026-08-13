import SidebarItem from './SidebarItem';
import SidebarGroup from './SidebarGroup';

/**
 * Renders a full sidebar menu tree from a declarative config array.
 * Each entry is either a leaf link ({label, to, icon}) or a group
 * ({label, icon, items: [...]}).
 *
 * @param {object} props
 * @param {object[]} props.items
 * @param {boolean} [props.collapsed]
 */
const SidebarMenu = ({ items = [], collapsed = false }) => (
  <nav className="flex flex-col gap-1 px-2">
    {items.map((item) =>
      item.items ? (
        <SidebarGroup key={item.label} {...item} collapsed={collapsed} />
      ) : (
        <SidebarItem key={item.to} {...item} collapsed={collapsed} />
      )
    )}
  </nav>
);

export default SidebarMenu;
