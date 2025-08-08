export interface MenuItem {
  href: string;
  label: string;
  submenu?: MenuItem[];
}

export const MENU_ITEMS: MenuItem[] = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/events', label: 'Events' },
  {
    href: '/help',
    label: 'Help',
    submenu: [
      { href: '/help/faq', label: 'FAQ' },
    ]
  },
];
