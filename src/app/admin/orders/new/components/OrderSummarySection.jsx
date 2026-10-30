'use client';

import { useRouter } from 'next/navigation';
import SubPanel from '@/components/ui/panels/SubPanel';
import { cn } from '@/utils/clsx';

export default function OrderSummarySection({
  notes,
  setNotes,
  totalCost,
  isSubmitting,
}) {
  const router = useRouter();

  return (
    <>
      <SubPanel
        title={
          <div className={cn(
            "flex justify-between items-center",
            "border-b border-lines-secondary pb-2",
            "w-full"
          )}>
            <h2 className="text-2xl font-bold text-gray-800">
              3. Notes
            </h2>
          </div>
        }
      >
        <div className="md:col-span-2">
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Infill %, layer height, post-processing notes, target delivery date, etc."
            className="w-full px-3 py-2 border border-lines-secondary rounded-md focus:ring-2 focus:ring-terracotta-border focus:outline-none text-sm text-gray-900 bg-white"
          />
        </div>

        <div className="bg-white p-4 rounded-md border border-gray-200 text-right space-y-1 shadow-sm">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
            Total Order Cost
          </span>
          <div className="text-2xl font-bold text-on-panel-emph">
            ₱{totalCost.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
      </SubPanel>

      {/* SUBMIT BUTTONS */}
      <div className="flex justify-end space-x-3 border-t border-gray-200 pt-4">
        <button
          type="button"
          onClick={() => router.push('/admin/orders/list')}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-lines-secondary rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 text-sm font-medium text-white bg-brand-primary rounded-md hover:bg-brand-primary-hover disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? 'Saving Order...' : 'Create Order'}
        </button>
      </div>
    </>
  );
}