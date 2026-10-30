'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from "@/utils/clsx";
import {InfoBadge} from '@/components/ui/badges';

export default function PrinterListView({printers = []}) {
  const [fleetOpen, setFleetOpen] = useState(true);

  return (  
  <div
    className={`grid transition-all duration-300 ease-in-out ${
      fleetOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
    }`}
  >
    {/*  contains cards, each with the following info:
    * thumbnail
    * Printer name
    * Printer Status
    * Current Print job start date/time    
    */}
    <div className="overflow-hidden p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {printers.map((printer) => {
          const imageName = `${printer.model.replace(/\s+/g, '_')}.png`;
          const imagePath = `/images/printers/${imageName}`;
          const startTimeFormatted = printer.startTime || (printer.status === 'idle' ? 'N/A' : 'N/A');

          return (
            <Link
              key={printer.id}
              href={`/admin/queue/${printer.id}`}
              className={cn(
                "bg-main-card-primary",
                "group", 
                "border border-lines-subtle hover:border-blue-500",
                "p-4 rounded-lg",
                "hover:shadow-md",
                "transition-all",
                "flex flex-col items-center text-center",

              )}
            >
              <div className="w-full h-32 bg-main-card-secondary rounded-md mb-3 flex items-center justify-center overflow-hidden border border-gray-100">
                <img
                  src={imagePath}
                  alt={printer.model}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              <h3 className="font-bold text-on-sruface-primary group-hover:text-on-brand-secondary transition-colors mb-1 text-base">
                {printer.name}
              </h3>

              <div className="mb-2">
                <InfoBadge className={cn(
                  "capitalize",
                  printer.status === 'printing'
                    ? 'bg-terracotta-primary text-on-terracotta-primary'
                    : printer.status === 'idle'
                    ? 'bg-sage-secondary text-on-sage-secondary'
                    : 'bg-taupe-secondary text-on-taupe-secondary',
                )}>
                  {printer.status}
                </InfoBadge>
              </div>

              <p className="text-xs text-gray-500 mt-auto pt-2 border-t border-lines-subtle w-full">
                <span className="font-medium text-gray-600">Started:</span>{' '}
                {startTimeFormatted}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  </div>

  );
}
