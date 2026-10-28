export const PRINTERS = [
  { 
    id: 'kobra-x-1', 
    name: 'Kobra X (1)', 
    model: 'Anycubic Kobra X',
    status: 'idle' 
  },
];

/*
 * Helper function to fetch printer list.
 * Currently returns dummy data; will later be updated to fetch from Google Sheets via data-service.js.
 */
export async function getPrinters() {
  // Currently returning local array
  return PRINTERS;
}