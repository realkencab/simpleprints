export const MATERIALS = [
  { id: 'pla', name: 'PLA' },
  { id: 'petg', name: 'PETG' },
  { id: 'abs', name: 'ABS' },
  { id: 'tpu', name: 'TPU' },
  { id: 'resin', name: 'Resin' },
];

/**
 * Helper function to fetch available materials.
 * Currently returns local data; will later fetch directly from Google Sheets.
 */
export async function getMaterials() {
  return MATERIALS;
}