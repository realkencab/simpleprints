import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import fs from 'fs';
import path from 'path';

import { generateJobOrderNumber } from '@/utils/order-generator';

// #region CONFIGURATION 
// Path pointing to src/data/ folder on the server's local storage
  const DATA_DIR = path.join(process.cwd(), 'src', 'data');
  const ORDERS_PATH = path.join(DATA_DIR, 'orders.json');
  const QUEUE_PATH = path.join(DATA_DIR, 'queue.json');
  const PRINTERS_PATH = path.join(DATA_DIR, 'printers.json');
  const MATERIALS_PATH = path.join(DATA_DIR, 'materials.json');
// #endregion

// #region universal helper functions for JSON
  function readJsonFile(filePath) {
    try {
      if (!fs.existsSync(filePath)) return [];
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data || '[]');
    } catch (error) {
      console.error(`Error reading ${filePath}:`, error);
      return [];
    }
  }

  function writeJsonFile(filePath, data) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
      console.error(`Error writing to ${filePath}:`, error);
      throw new Error('Failed to update local JSON file.');
    }
  }
// #endregion

// #region LOGIN CREDENTIALS LIST 
  // Getter Function for Credential list (from Google Sheet)
  export async function getUserFromSheet(username) {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo(); 

    const sheet = doc.sheetsByTitle['Users']; 
    const rows = await sheet.getRows();

    const userRow = rows.find(row => row.get('username') === username);
    const rawRole = userRow.get('role') || '';
    const normalizedRole = rawRole.trim().toLowerCase();
    
    if (!userRow) return null;

    return {
      username: userRow.get('username'),
      passwordHash: userRow.get('passwordHash'),
      role: normalizedRole,
      requiresPasswordChange: userRow.get('requiresPasswordChange') === 'TRUE'
    };
  }
// #endregion

// #region ORDERS DATA SERVICE 
  /*  Dev Testing - local json
      Public - Google Sheets
  */
  // Getter Function for Order list
  export async function getOrders() {
    return readJsonFile(ORDERS_PATH);
  }

  // Creates and appends a new order to local JSON file (or Google Sheets in production)
  export async function createOrder(orderPayload) {
    const orders = await getOrders();

    const newOrder = {
      orderNumber: generateJobOrderNumber(),
      createdAt: new Date().toISOString(),
      ...orderPayload,
    };

    orders.unshift(newOrder); // Add new order to top of list
    await writeJsonFile(ORDERS_PATH, orders);
    return newOrder;
  }

// #endregion

// #region QUEUE DATA SERVICE 
  /*  Dev Testing - local json
      Public - Google Sheets
  */
  // Getter Function for Order list
  export async function getPrintQueue() {
    return readJsonFile(QUEUE_PATH);
  }

  // Creates and appends a new order to local JSON file (or Google Sheets in production)
  export async function createPrintQueueJob(jobPayload) {
    const queue = await getPrintQueue();

    const newJob = {
      id: `JOB-${Date.now().toString().slice(-4)}`,
      dateStarted: new Date().toISOString(),
      status: 'Pending',
      ...jobPayload,
    };

    queue.unshift(newJob);
    writeJsonFile(QUEUE_PATH, queue);
    return newJob;
  }

// #endregion

// #region PRINTER LIST DATA SERVICE 
  /*  Dev Testing - local json
      Public - Google Sheets
  */
  // Getter Function for Order list
  export async function getPrinters() {
    return readJsonFile(PRINTERS_PATH);
  }

// #endregion

// #region MATERIAL LIST DATA SERVICE 
  /*  Dev Testing - local json
      Public - Google Sheets
  */
  // Getter Function for Order list
  export async function getMaterials() {
    return readJsonFile(MATERIALS_PATH);
  }

// #endregion