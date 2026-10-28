'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function PrinterListView({printers = []}) {
  const [fleetOpen, setFleetOpen] = useState(true);

  return (

    <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    {/*  contains cards with the following info:
    * thumbnail
    * Printer name
    * Printer Status
    * Current Print job start date/time    
    */}
      <button
        type="button"
        onClick={() => setFleetOpen(!fleetOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors border-b border-gray-200 text-left"
      >
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-bold text-gray-800">Printers Status</h2>
          {/* shows how many printers are in the fleet in a text bubble */}
          <span className="text-xs font-semibold px-2.5 py-0.5 bg-blue-100 text-blue-700 rounded-full">
            {printers.length} Printers
          </span>
        </div>
        <ChevronDownIcon
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
            fleetOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          fleetOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
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
                  className="group border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all flex flex-col items-center text-center bg-white"
                >
                  <div className="w-full h-32 bg-gray-50 rounded-md mb-3 flex items-center justify-center overflow-hidden border border-gray-100">
                    <img
                      src={imagePath}
                      alt={printer.model}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>

                  <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-1 text-base">
                    {printer.name}
                  </h3>

                  <div className="mb-2">
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${
                        printer.status === 'printing'
                          ? 'bg-amber-100 text-amber-800'
                          : printer.status === 'idle'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {printer.status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mt-auto pt-2 border-t border-gray-100 w-full">
                    <span className="font-medium text-gray-600">Started:</span>{' '}
                    {startTimeFormatted}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>

  );
}
