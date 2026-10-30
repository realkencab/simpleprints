/*  To run as CLI script:
    node generate-order.js "2026-10-25 14:30:00"

*/

import { generateJobOrderNumber } from './src/utils/order-generator.js';

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("Usage: node generate-order.js <datetime>");
  console.log("Example: node generate-order.js '2026-10-25 14:30:00'");
  process.exit(0);
}

const inputDateStr = args.join(" ");

try {
  const finalOrderNumber = generateJobOrderNumber(inputDateStr);
  console.log(`Input Date: ${new Date(inputDateStr).toLocaleString()}`);
  console.log(`Generated Order Number: ${finalOrderNumber}`);
} catch (err) {
  console.error(`Error: ${err.message}`);
}