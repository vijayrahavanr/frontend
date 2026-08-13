import PageTitle from '@/components/common/PageTitle';
import Breadcrumb from '@/components/common/Breadcrumb';
import { cn } from '@/utils/helpers';

/**
 * Page header title block: breadcrumb trail above a PageTitle.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {{label: string, href?: string}[]} [props.breadcrumbItems]
 */
const HeaderTitle = ({ title, description, breadcrumbItems, action, className }) => (
  <div className={cn('flex flex-col gap-1.5', className)}>
    <Breadcrumb items={breadcrumbItems} />
    <PageTitle title={title} description={description} action={action} />
  </div>
);

export default HeaderTitle;
