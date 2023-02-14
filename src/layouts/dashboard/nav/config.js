// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'zonals',
    path: '/dashboard/zonals',
    icon: icon('ic_user'),
  },
  // {
  //   title: 'transactions',
  //   path: '/dashboard/transactions',
  //   icon: icon('ic_user'),
  // },
  {
    title: 'consituency',
    path: '/dashboard/consituency',
    icon: icon('ic_user'),
  },
  {
    title: 'agents',
    path: '/dashboard/agents',
    icon: icon('ic_user'),
  },
];

export default navConfig;
