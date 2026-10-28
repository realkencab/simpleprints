'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import PriorityBadge from '@/components/PriorityBadge';

export default function PrintQueueView({printQueue = []}) {
  const [jobsOpen, setJobsOpen] = useState(true);

  return (

    <section className="bg-white rounded-lg shadow-sm border border-brand-border overflow-hidden">
      {/* Shows 10 latest items in Print Queue */}
      <button
        type="button"
        onClick={() => setJobsOpen(!jobsOpen)}
        className="w-full flex items-center justify-between p-4 bg-brand-surface hover:bg-brand-subtle transition-colors border-b border-brand-border text-left"
      >
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-bold text-brand-text">Print Queue (Temp Dummy Data)</h2>
          <span className="text-xs text-gray-500">(latest 10)</span>
        </div>
        <ChevronDownIcon
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
            jobsOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          jobsOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-brand-subtle text-gray-700 uppercase text-xs font-semibold border-b border-brand-border">
                <tr>
                  <th className="px-4 py-3">Date Started</th>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3">Job Name</th>
                  <th className="px-4 py-3">Printer</th>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {printQueue.map((job) => (
                  <tr key={job.id} className="hover:bg-brand-surface transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-gray-500 text-xs font-mono">
                      {job.dateStarted}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <PriorityBadge priority={job.priority} />
                    </td>
                    <td className="px-4 py-3 font-medium text-brand-text">
                      {job.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700 font-medium">
                      {job.printer}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-brand-primary font-medium">
                      {job.orderId}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          job.status === 'Printing'
                            ? 'bg-amber-100 text-amber-800 animate-pulse'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

  );
}
