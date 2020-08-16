
const { app, BrowserWindow, Menu } = require('electron');
const url = require("url");
const path = require("path");

let mainWindow
let aboutWindow
process.env.NODE_ENV = 'development'

const isDev = process.env.NODE_ENV !== 'production'
const isMac = process.platform === 'darwin'



const createMainWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: isDev ? 800: 500,
    backgroundColor: "#ffffff",
    icon: path.join(__dirname, `/dist/assets/logo.png`),
    resizable: isDev,
    protocol: 'file:',
    slashes: true,
    webPreferences: {
      nodeIntegration: true,

    }
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // and load the index.html of the app.
  mainWindow.loadFile(`./dist/index.html`);
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Event when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
  })
};

const createAboutWindow = () => {
  aboutWindow = new BrowserWindow({
    height: 300,
    width: 300,
    backgroundColor: "#ffffff",
    icon: path.join(__dirname, `/dist/assets/logo.png`),
    resizable: false
  });

  // and load the index.html of the app.
  aboutWindow.loadFile(`./dist/index.html`);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Event when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
  })
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// Create window on electron initial
app.on('ready', () => {
  createMainWindow()

  const mainMenu = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(mainMenu)

  // No longer needed since we have roles
  // globalShortcut.register('CmdOrCtrl+R', () => mainWindow.reload())
  // globalShortcut.register(isMac ? 'Command+Alt+I' : 'Ctrl+Shift+I', () => mainWindow.toggleDevTools())
  mainWindow.on('closed', () => mainWindow = null)
});

const menu = [
  ...(isMac ? [{
    label: app.name,
    submenu: [{
      label: 'About',
      click: createAboutWindow,
    }]
  }] : []),
  {
    // label: 'File',
    // submenu: [
    //   {
    //   label: 'Quit',
    //     // accelerator: isMac ? 'Command+W' : 'Ctrl+W',
    //     // Same as
    //     accelerator: 'CmdOrCtrl+W',
    //     click: () => app.quit()
    //   }
    // ]

    //Same as
    role: 'fileMenu',
  },
  ...(!isMac ? [
    {
      label: 'Help',
      submenu: [
        {
        label: 'About',
        click: createAboutWindow
      },
      ],
    },
  ] : []),
  ...(isDev ? [
    {
      label: 'Developer',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { type: 'separator' },
        { role: 'toggledevtools' },
      ]
    }
  ] : [])
];

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






























