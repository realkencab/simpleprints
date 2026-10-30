export function generateJobOrderNumber(dateInput = null) {
  const CHARSET = "346789ABCDEFGHJKMNPQRTUVWXY";
  const BASE = CHARSET.length;

  const targetDate = dateInput ? new Date(dateInput) : new Date();
  
  if (isNaN(targetDate.getTime())) {
    throw new Error("Invalid date format provided.");
  }

  let timeValue = Math.floor(targetDate.getTime() / 10);
  let orderString = "";

  for (let i = 0; i < 8; i++) {
    const remainder = timeValue % BASE;
    orderString = CHARSET[remainder] + orderString;
    timeValue = Math.floor(timeValue / BASE);
  }

  return `SCPM-${orderString}`;
}