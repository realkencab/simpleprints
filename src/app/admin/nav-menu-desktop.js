'use client';

import Link from 'next/link';
import LogoutButton from './logout-button';
import { getNavItems } from '@/data/navconfig';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function DesktopNav({ pathname, accordionState = {}, role = {}, printers = [] }) {
  const navItems = getNavItems(printers, role);

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-brand-border flex-shrink-0">
        <h2 className="text-xl font-bold text-brand-primary">Simpl3 Prints</h2>
      </div>

      <nav className="flex-1 flex flex-col p-4 gap-2 overflow-y-auto">
        {navItems.map((item) => {
          const IconComponent = item.icon;

          // 1. Simple Single Link
          if (!item.isAccordion) {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                  isActive
                    ? 'bg-brand-primary text-white'
                    : 'text-gray-300 hover:bg-brand-hover hover:text-white'
                }`}
              >
                <IconComponent className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            );
          }

          // 2. Accordion Item
          const isSectionActive = item.hrefPrefix && pathname.startsWith(item.hrefPrefix);
          const state = accordionState[item.id] || { isOpen: false, onToggle: () => {} };

          return (
            <div key={item.id} className="space-y-1">
              <button
                type="button"
                onClick={state.onToggle}
                className={`flex items-center justify-between px-4 py-2 rounded-md transition-colors text-sm font-medium w-full ${
                  isSectionActive
                    ? 'bg-brand-primary text-white'
                    : 'text-gray-300 hover:bg-brand-hover hover:text-white'
                }`}
              >
                <div className="flex items-center">
                  <IconComponent className="w-5 h-5 mr-3" />
                  <span>{item.label}</span>
                </div>
                <ChevronDownIcon
                  className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                    state.isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Accordion expansion container */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  state.isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden flex flex-col pl-8 space-y-1 pt-1">
                  {item.subItems?.map((sub) => {
                    const isSubActive = pathname === sub.href;
                    return (
                      <Link
                        key={`${item.id}-${sub.label}`}
                        href={sub.href}
                        className={`px-3 py-2 rounded-md text-sm transition-colors ${
                          isSubActive
                            ? 'bg-brand-subtle text-brand-primary font-semibold'
                            : 'text-gray-400 hover:text-white hover:bg-brand-hover'
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

        <div className="mt-auto pt-4 border-t border-brand-border">
          <LogoutButton />
        </div>
      </nav>
    </div>
  );
}