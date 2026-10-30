import {PriorityBadge, InfoBadge} from '@/components/ui/badges';
import { cn } from "@/utils/clsx";

export default function PrintQueueViewTable({printQueue = []}) {
  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-on-main-panel-primary">
          <thead className={cn(
            "bg-main-panel-secondary-hover",
            "text-on-main-panel-secondary",
            "uppercase text-xs font-semibold",
            
          )}>
            <tr>
              <th className="px-4 py-3">Date Started</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Job Name</th>
              <th className="px-4 py-3">Printer</th>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line-primary">
            {printQueue.map((job) => (
              <tr key={job.id} className="hover:bg-main-panel-primary-hover transition-colors border-lines-subtle">
                <td className="px-4 py-3 whitespace-nowrap text-on-main-panel-secondary text-xs font-mono">
                  {job.dateStarted}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <PriorityBadge priority={job.priority} />
                </td>
                <td className="px-4 py-3 font-medium text-on-main-panel-primary">
                  {job.name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-on-main-panel-primary">
                  {job.printer}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-on-main-panel-emph font-medium">
                  {job.orderId}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {/* <InfoBadge> that shows Print Job Status*/}
                  <InfoBadge
                  className={cn(
                    job.status === 'Printing'
                      ? 'bg-ochre-secondary text-on-ochre-secondary animate-pulse'
                      : 'bg-sage-secondary text-on-sage-secondary',
                  )}>
                    {job.status}
                  </InfoBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
}
