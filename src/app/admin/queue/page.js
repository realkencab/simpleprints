import { getPrinters, getPrintQueue } from '@/lib/data-service';
import PrintQueueViewTable from './print-queue-view-table';
import PrintQueueViewCards from './print-queue-view-cards';
import PrinterListView from './printer-list-view';
import { ExpansionPanel } from '@/components/ui/panels'
import { InfoBadge } from '@/components/ui/badges';

export const metadata = {
  title: 'Print Queue', 
}

export default async function QueueOverviewPage() {
  // #region CONFIG
    /* Get raw data from:
    *   dev env   - JSON
    *   build env - Google Sheets
    */
    const printers = await getPrinters();
    const printQueue = await getPrintQueue();

    // Filter <printQueue> to just get 10 latest jobs
    const latestQueue = printQueue.slice(0, 10);
  // #endregion

  return (
    <div className="w-full max-w-7xl mx-auto min-h-screen flex flex-col justify-start pt-16 md:pt-6 px-4 pb-10 space-y-6">
      <ExpansionPanel
        title={
          <>
            <h2 className="text-lg font-bold text-gray-800">Printers Status</h2>
            {/* shows how many printers are in the fleet in a text badge */}
            <InfoBadge className="bg-brand-secondary text-on-brand-secondary ">
              {printers.length} Printers
            </InfoBadge>
          </>
        }
      >
        <PrinterListView
          printers={printers}
        />  
      </ExpansionPanel>
      
      <ExpansionPanel
        title={
          <>
            <h2 className="text-lg font-bold text-on-main-panel-primary">Print Queue (Temp Dummy Data)</h2>
            <span className="text-xs text-on-main-panel-secondary">(last 10)</span>
          </>
        }
      >
        <div className="hidden md:block h-full">
          <PrintQueueViewTable 
            printQueue={latestQueue}
          />
        </div>

        <div className="block md:hidden w-full">
          {/* put PrintQueueViewCards here */}
        </div>
      </ExpansionPanel>
      
    </div>
  );
}