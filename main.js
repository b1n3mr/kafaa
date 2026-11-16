const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Single instance lock
const gotTheLock = app.requestSingleInstanceLock();
let mainWindow = null;

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  function createWindow() {
    mainWindow = new BrowserWindow({
      width: 1380,
      height: 880,
      minWidth: 1100,
      minHeight: 700,
      title: 'كِفَاءَة | Kafaa Desktop',
      frame: false, // Custom Apple-style frameless titlebar
      titleBarStyle: 'hidden',
      backgroundColor: '#0a0a0c',
      show: false,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: false,
        contextIsolation: true,
        spellcheck: false
      }
    });

    // Load local HTML file
    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    // Graceful show once ready
    mainWindow.once('ready-to-show', () => {
      mainWindow.show();
    });

    // Track maximize state
    mainWindow.on('maximize', () => {
      mainWindow.webContents.send('window-maximize-changed', true);
    });
    mainWindow.on('unmaximize', () => {
      mainWindow.webContents.send('window-maximize-changed', false);
    });

    mainWindow.on('closed', () => {
      mainWindow = null;
    });
  }

  // Window control IPC handlers
  ipcMain.on('window-minimize', () => {
    if (mainWindow) mainWindow.minimize();
  });

  ipcMain.on('window-maximize', () => {
    if (mainWindow) {
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
      } else {
        mainWindow.maximize();
      }
    }
  });

  ipcMain.on('window-close', () => {
    if (mainWindow) mainWindow.close();
  });

  ipcMain.on('window-print', () => {
    if (mainWindow) {
      mainWindow.webContents.print({ silent: false, printBackground: true });
    }
  });

  ipcMain.handle('get-app-version', () => {
    return app.getVersion();
  });

  app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
}
