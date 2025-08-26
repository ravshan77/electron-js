/// <reference types="vite/client" />

interface Window {
  // expose in the `electron/preload/index.ts`
  ipcRenderer: import('electron').IpcRenderer
}


declare global {
  interface Window {
    electronAPI: {
      printReceipt: (order: any) => void;
    };
  }
}