import { getPrinters,getPrintQueue } from '@/data-service';
import PrinterHistoryView from './printer-history-view';

export const metadata = {
  title: 'Printer View', 
}

export default async function PrinterPage({ params }) {
  // Resolve dynamic URL parameter
  const resolvedParams = await params;

  // #region Get data from source
  // 1. Get Raw Data
    // Get printerID based on dynamic URL
    const rawID = 
      resolvedParams?.printerID || 
      resolvedParams?.printerId || 
      resolvedParams?.printerid || 
      'unknown-printer';
    const printerID = String(rawID);

    // Get Printer list data, and full queue data.
    /* Get raw data from:
    *   dev env   - JSON
    *   build env - Google Sheets
    */
    const printers = await getPrinters();
    const fullQueue = await getPrintQueue();

  // 2. Filter the Data
    // Filter <printers> data to only get printer with id = <printerID>
    const printer = printers.find((p) => p.id === printerID);

    // Filter <fullQueue> data to only get print jobs assigned to <printer> 
    const filteredQueue = fullQueue.filter(
      (printjob) => printjob.printerID === printerID || printjob.printer === printer?.name
    );
  // #endregion

  
  // Get printer Name by searching for printerID
  const printerRawName = printer 
    ? printer.name 
    : printerID?.replace(/-/g, ' ').toUpperCase()
  const printerFormattedName = printerRawName.toUpperCase();

  return (
    <PrinterHistoryView 
      printerID={printerID}
      printer={printerFormattedName}
      queue={filteredQueue}
    />
  );
}