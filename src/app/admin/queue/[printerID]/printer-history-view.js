'use client';

export default function PrinterHistoryView({printerID, printer, queue = []}) {
  return(
    <div className="p-8 bg-white rounded-lg shadow-sm border border-gray-200 text-center w-full max-w-xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Printer Queue: {printer}
      </h1>
      <p className="text-sm text-gray-500 mb-4">
        Unique Printer ID: <code className="bg-slate-100 px-2 py-1 rounded text-blue-600">{printerID}</code>
      </p>
      <div className="border-t border-gray-100 pt-4 text-gray-600 text-sm">
        This single page dynamically handles job history and active status for printer <strong>{printer}</strong>.
      </div>
    </div>
  );
}