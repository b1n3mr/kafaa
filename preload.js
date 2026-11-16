const { contextBridge, ipcRenderer } = require('electron');

// Expose safe Electron desktop APIs to the renderer
contextBridge.exposeInMainWorld('electronAPI', {
  isDesktop: true,
  platform: process.platform,
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),
  print: () => ipcRenderer.send('window-print'),
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  onMaximizeChange: (callback) => {
    ipcRenderer.on('window-maximize-changed', (_event, isMaximized) => callback(isMaximized));
  }
});
