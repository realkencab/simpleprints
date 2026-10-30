'use client';

import { useState } from 'react';
import PriorityBadge from '@/components/ui/badges/PriorityBadge';

export default function PrintQueueViewCards({printQueue = []}) {
  const [jobsOpen, setJobsOpen] = useState(true);

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold border-b border-gray-200">
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
              <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap text-gray-500 text-xs font-mono">
                  {job.dateStarted}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <PriorityBadge priority={job.priority} />
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {job.name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700 font-medium">
                  {job.printer}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-on-panel-link font-medium">
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

  );
}
