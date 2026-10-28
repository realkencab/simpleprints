
import { 
  CubeIcon, 
  ClipboardDocumentListIcon, 
  QueueListIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

/**
 * Returns the unified navigation configuration.
 * Dynamically injects the printer fleet list into the Queue submenu.
 */
export function getNavItems(printers = [], role = '') {
  const normalizedRole = role ? role.trim().toLowerCase() : '';
  const allNavItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      href: '/admin',
      icon: CubeIcon,
      isAccordion: false,
    },
    {
      id: 'orders',
      label: 'Orders',
      hrefPrefix: '/admin/orders',
      icon: ClipboardDocumentListIcon,
      isAccordion: true,
      subItems: [
        { label: 'Order List', href: '/admin/orders/list' },
        { label: 'Create Order', href: '/admin/orders/new' },
      ],
    },
    {
      id: 'queue',
      label: 'Queue',
      hrefPrefix: '/admin/queue',
      icon: QueueListIcon,
      isAccordion: true,
      subItems: [
        { label: 'Overview', href: '/admin/queue' },
        ...printers.map((printer) => ({
          label: printer.name,
          href: `/admin/queue/${printer.id}`,
        })),
      ],
    },
    {
      id: 'finances',
      label: 'Finances',
      hrefPrefix: '/admin/finances',
      icon: BanknotesIcon,
      isAccordion: true,
      requiredRoles: ['admin'],
      subItems: [
        { label: 'General Ledger', href: '#' },
        { label: 'CapEx', href: '#' },
        { label: 'OpEx', href: '#' },
      ],
    },
  ];

  return allNavItems.filter((item) => {
    // 1. If no role array is defined on the item, show it to everyone
    if (!item.requiredRoles || item.requiredRoles.length === 0) return true;

    // 2. Normalize array roles and check if user's role is included
    const allowedRoles = item.requiredRoles.map((r) => r.trim().toLowerCase());
    return allowedRoles.includes(normalizedRole);
  });
}