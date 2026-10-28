'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import DesktopNav from './nav-menu-desktop';
import MobileNav from './nav-menu-mobile';
import { getNavItems } from '@/data/navconfig';

export default function NavMenu({ printers = [], role = '' }) {
  const pathname = usePathname();
  const router = useRouter();
  const navItems = getNavItems(printers, role);

  // Dynamic state map tracking open sections: { orders: boolean, queue: boolean, ... }
  const [openSections, setOpenSections] = useState({});

  // Auto-expand the active route section on initial load or URL change
  useEffect(() => {
    const activeItem = navItems.find(
      (item) => item.isAccordion && item.hrefPrefix && pathname.startsWith(item.hrefPrefix)
    );

    if (activeItem) {
      setOpenSections((prev) => ({
        ...prev,
        [activeItem.id]: true,
      }));
    }
  }, [pathname, printers]);

  // #region DESKTOP NAVBAR BEHAVIOR HANDLERS
  // Rule: Opening an accordion closes all other submenus EXCEPT if the current page is under that submenu
  const handleDesktopToggle = (itemId) => {
    if (itemId === 'queue' && pathname !== '/admin/queue') {
      router.push('/admin/queue');
    }

    setOpenSections((prev) => {
      const willOpen = !prev[itemId];

      // If collapsing manually, just set target item to false
      if (!willOpen) {
        return { ...prev, [itemId]: false };
      }

      // Opening new item: close others EXCEPT the currently active route section
      const nextState = {};
      navItems.forEach((item) => {
        if (!item.isAccordion) return;
        const isCurrentActive = item.hrefPrefix && pathname.startsWith(item.hrefPrefix);
        nextState[item.id] = item.id === itemId || isCurrentActive;
      });

      return nextState;
    });
  };
  // #endregion

  // #region MOBILE NAVBAR BEHAVIOR HANDLERS
  // Rule: Strict exclusive — opening any accordion closes all others unconditionally
  const handleMobileToggle = (itemId) => {
    if (itemId === 'queue' && pathname !== '/admin/queue') {
      router.push('/admin/queue');
    }

    setOpenSections((prev) => {
      const willOpen = !prev[itemId];

      if (!willOpen) {
        return { ...prev, [itemId]: false };
      }

      // Strict exclusive: only target item is set to true
      const nextState = {};
      navItems.forEach((item) => {
        if (item.isAccordion) {
          nextState[item.id] = item.id === itemId;
        }
      });

      return nextState;
    });
  };
  // #endregion

  // #region ACCORDION STATE PROPS MAPPING
  // Build helper accordion state objects to pass down to sub-components
  const desktopAccordionState = {};
  const mobileAccordionState = {};

  navItems.forEach((item) => {
    if (item.isAccordion) {
      desktopAccordionState[item.id] = {
        isOpen: !!openSections[item.id],
        onToggle: () => handleDesktopToggle(item.id),
      };
      mobileAccordionState[item.id] = {
        isOpen: !!openSections[item.id],
        onToggle: () => handleMobileToggle(item.id),
      };
    }
  });
  // #endregion

  return (
    <aside className="fixed top-0 left-0 z-20 w-full bg-aside-canvas text-canvas-aside shadow-lg md:h-screen md:w-64">
      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block h-full">
        <DesktopNav
          pathname={pathname}
          accordionState={desktopAccordionState}
          role={role}
          printers={printers}
        />
      </div>

      {/* MOBILE TOPBAR */}
      <div className="block md:hidden w-full">
        <MobileNav
          pathname={pathname}
          accordionState={mobileAccordionState}
          role={role}
          printers={printers}
        />
      </div>
    </aside>
  );
}