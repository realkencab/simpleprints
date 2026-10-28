'use client';

import Link from 'next/link';
import LogoutButton from './logout-button';
import { getNavItems } from '@/data/navconfig';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function MobileNav({ pathname, accordionState = {}, role = {}, printers = [] }) {
  const navItems = getNavItems(printers, role);

  return (
    <div className="flex flex-col w-full">
      {/* MAIN TOP BAR */}
      <nav className="flex flex-row justify-center items-center gap-2 p-3">
        {navItems.map((item) => {
          if (!item.isAccordion) {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`px-3 py-1.5 rounded-md transition-colors text-xs font-medium ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          }

          const isSectionActive = item.hrefPrefix && pathname.startsWith(item.hrefPrefix);
          const state = accordionState[item.id] || { isOpen: false, onToggle: () => {} };

          return (
            <button
              key={item.id}
              type="button"
              onClick={state.onToggle}
              className={`flex items-center px-3 py-1.5 rounded-md transition-colors text-xs font-medium ${
                isSectionActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span>{item.label}</span>
              <ChevronDownIcon
                className={`w-3.5 h-3.5 ml-1 transition-transform duration-300 ${
                  state.isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          );
        })}

        <LogoutButton />
      </nav>

      {/* MOBILE SLIDE-DOWN SUBMENUS */}
      {navItems.map((item) => {
        if (!item.isAccordion) return null;
        const state = accordionState[item.id] || { isOpen: false };

        return (
          <div
            key={`mobile-sub-${item.id}`}
            className={`grid transition-all duration-300 ease-in-out bg-gray-900 ${
              state.isOpen
                ? 'grid-rows-[1fr] opacity-100 border-t border-gray-700'
                : 'grid-rows-[0fr] opacity-0 border-t-0'
            }`}
          >
            <div className="overflow-hidden">
              <div className="flex justify-center flex-wrap gap-2 text-xs py-2 px-3">
                {item.subItems?.map((sub) => {
                  const isSubActive = pathname === sub.href;
                  return (
                    <Link
                      key={`${item.id}-${sub.label}`}
                      href={sub.href}
                      className={`font-medium py-1 px-2.5 rounded-md transition-colors ${
                        isSubActive
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      {sub.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}