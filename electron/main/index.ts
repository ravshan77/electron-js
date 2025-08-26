import { app, BrowserWindow, shell, ipcMain } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import os from 'node:os'
import { update } from './update'

import pkg from "electron-pos-printer";
const { PosPrinter } = pkg;

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs   > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.APP_ROOT = path.join(__dirname, '../..')

export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win: BrowserWindow | null = null
const preload = path.join(__dirname, '../preload/index.mjs')
const indexHtml = path.join(RENDERER_DIST, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // nodeIntegration: true,

      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      // contextIsolation: false,
    },
  })

  if (VITE_DEV_SERVER_URL) { // #298
    win.loadURL(VITE_DEV_SERVER_URL)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })

  // Auto update
  update(win)
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})

// Get available printers
ipcMain.handle("get-printers", async () => {
  try {
    // Use Electron's built-in API to get system printers
    const printers = win?.webContents.getPrintersAsync() || [];
    return printers;
  } catch (error) {
    console.error("Error getting printers: ", error);
    return [];
  }
});

// POS printer
ipcMain.on("print-receipt", async (event, order) => {
  console.log(order);

  const items = order.items.map((item: any) => ({
    type: "text",
    value: `${item.name}  x${item.qty}  = ${item.price * item.qty} so'm`,
    style: { fontSize: "14px", margin: "5px 0" },
  }));

  const data = [
    {
      type: "text",
      value: "GARANT SAVDO MARKAZI",
      style: { fontWeight: "700", textAlign: "center", fontSize: "20px" },
    },
    {
      type: "text",
      value: `Buyurtma ID: ${order.id}`,
      style: { margin: "10px 0" },
    },
    {
      type: "text",
      value: `Sana: ${order.date}`,
      style: { margin: "10px 0" },
    },
    {
      type: "text",
      value: `Mijoz: ${order.customer}`,
      style: { margin: "10px 0" },
    },
    { type: "text", value: "------------------------------------", style:{margin:"10px 0"} },

    ...items, // 🔥 Dinamik tovarlar shu yerga qo‘shiladi

    { type: "text", value: "------------------------------------", style:{margin:"10px 0"} },
    {
      type: "text",
      value: `Jami: ${order.total} so'm`,
      style: { fontWeight: "700", textAlign: "right", fontSize: "16px" },
    },
    {
      type: "qrCode",
      value: order.id,
      height: 80,
      width: 80,
      style: { margin: "20px auto 0 auto" },
    },
    {
        type: 'barCode',
        value: '023456789010',
        height: 40,                     // height of barcode, applicable only to bar and QR codes
        width: 2,                       // width of barcode, applicable only to bar and QR codes
        displayValue: true,             // Display value below barcode
        fontsize: 12,
    },
    {
      type: "text",
      value: "Rahmat! 😊",
      style: { textAlign: "center", margin: "10px 0", fontSize: "16px" },
    },
  ];
  

  try {
    // Get available printers
    const printers = await win?.webContents.getPrintersAsync() || [];
    console.log(printers);
    
    
    // Find XP-80C or XP-80 printer
    let targetPrinter = null;
    for (const printer of printers) {
      if (printer.name === "XP-80C (copy 1)" || printer.name === "XP-80C" || printer.name === "XP-80") {
        targetPrinter = printer.name;
        break;
      }
    }
    
    // If no XP-80C or XP-80 found, use the first available printer
    if (!targetPrinter && printers.length > 0) {
      targetPrinter = printers[0].name;
      console.log(`XP-80C/XP-80 printer not found. Using: ${targetPrinter}`);
    }
    
    if (!targetPrinter) {
      throw new Error("No printers available");
    }
    
    console.log(`Printing to printer: ${targetPrinter}`);

    const options = {
      printerName: targetPrinter,
      silent: true,// tanlash oynasini ko'rsatmasdan ovozsiz chop etish
      preview: false,
      margin: '0 0 0 0',
      copies: 1,
      boolean: false, // Add this property as required by PosPrintOptions
      // pageSize: '80mm', // page size
      width: "80mm",
    };

    await PosPrinter.print(data, options);
    
    console.log("Print job sent successfully");
    // Send success message back to renderer
    event.sender.send("print-success");
  } catch (error) {
    console.error("Print error: ", error);
    // Send error message back to renderer
    event.sender.send("print-error", error instanceof Error ? error.message : error);
  }
});