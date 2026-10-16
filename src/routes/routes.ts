import { NavItem } from '@/types';

export const adminRoutes: NavItem[] = [
  {
    title: 'Overview',
    href: '/admin/dashboard',
    iconName: 'LayoutDashboard',
  },
  {
    title: 'Manage Users',
    href: '/admin/dashboard/manage-users',
    iconName: 'Users',
    badge: 'Admin',
  },
  {
    title: "All Users' Notes",
    href: '/admin/dashboard/all-notes',
    iconName: 'ShieldCheck',
    badge: 'Vault',
  },
  {
    title: 'Interests Analytics',
    href: '/admin/dashboard/interests-analytics',
    iconName: 'BarChart3',
    badge: '$unwind',
  },
  {
    title: 'My Notes',
    href: '/admin/dashboard/my-notes',
    iconName: 'FileText',
  },
  {
    title: 'Public Posts & $lookup',
    href: '/admin/dashboard/posts',
    iconName: 'Globe',
    badge: '$lookup',
  },
];

export const userRoutes: NavItem[] = [
  {
    title: 'Overview',
    href: '/dashboard',
    iconName: 'LayoutDashboard',
  },
  {
    title: 'My Notes',
    href: '/dashboard/my-notes',
    iconName: 'FileText',
    badge: 'Private',
  },
  {
    title: 'My Posts',
    href: '/dashboard/my-posts',
    iconName: 'PenSquare',
    badge: '$lookup',
  },
  {
    title: 'Public Feed',
    href: '/dashboard/posts',
    iconName: 'Globe',
    badge: 'All',
  },
];

export const commonRoutes: NavItem[] = [
  {
    title: 'Landing Page',
    href: '/',
    iconName: 'Home',
  },
  {
    title: 'Community Feed',
    href: '/#feed',
    iconName: 'Globe',
  },
];

export const getRoutesByRole = (role?: string | null): NavItem[] => {
  switch (role?.toUpperCase()) {
    case 'ADMIN':
      return adminRoutes;
    case 'USER':
      return userRoutes;
    default:
      return [];
  }
};
