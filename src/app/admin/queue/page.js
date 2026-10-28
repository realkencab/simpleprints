import { getPrinters, getPrintQueue } from '@/data-service';
import PrintQueueView from './print-queue-view';
import PrinterListView from './printer-list-view';

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
      
      <PrinterListView
        printers={printers}
      />

      <PrintQueueView 
        printQueue={latestQueue}
      />
    </div>
  );
}