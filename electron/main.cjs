'use strict';

const path = require('node:path');
const { app, BrowserWindow, shell, session } = require('electron');

const APP_ID = 'cm.grosoeuvre.pro';
const APP_NAME = 'GROS ŒUVRE PRO';

app.setName(APP_NAME);
app.setAppUserModelId(APP_ID);

// Évite d'ouvrir plusieurs instances sur les mêmes données locales.
const gotSingleInstanceLock = app.requestSingleInstanceLock();
if (!gotSingleInstanceLock) app.quit();

let mainWindow = null;

function isTrustedLocalUrl(url) {
  try {
    return new URL(url).protocol === 'file:';
  } catch {
    return false;
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    title: APP_NAME,
    width: 1440,
    height: 920,
    minWidth: 1024,
    minHeight: 700,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '#0b1f3a',
    icon: path.join(__dirname, '..', 'build', 'icon.png'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
      devTools: !app.isPackaged,
      spellcheck: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, '..', 'index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  // La calculatrice n'a besoin d'aucune nouvelle fenêtre.
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });

  // Empêche la page locale d'être remplacée par un contenu distant.
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!isTrustedLocalUrl(url)) event.preventDefault();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

if (gotSingleInstanceLock) {
  app.on('second-instance', () => {
    if (!mainWindow) return;
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
  });

  app.whenReady().then(() => {
    session.defaultSession.setPermissionRequestHandler((_webContents, _permission, callback) => callback(false));
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
