const { app, BrowserWindow } = require('electron');
const url = require("url");
const path = require("path");

let mainWindow
process.env.NODE_ENV = 'production'

const isDev = process.env.NODE_ENV !== 'production'
const isMac = process.platform === 'darwin'
console.log(process.platform)


const createMainWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    backgroundColor: "#ffffff",
    icon: path.join(__dirname, `/dist/assets/logo.png`),
    resizable: isDev
  });

  // and load the index.html of the app.
  mainWindow.loadFile(`./dist/index.html`);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Event when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
  })

};


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// Create window on electron initial
app.on('ready', createMainWindow);

// Quit when all windows are closed.

app.on('window-all-closed', function () {
  // On macOS specific close process
  if (!isMac) {
    app.quit()
  }
});

app.on('activate', function() {

  // On macOS specific close process
  if(mainWindow === null) {
    createMainWindow()
  }
})






























