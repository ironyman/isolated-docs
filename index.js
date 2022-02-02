const { BrowserWindow, app, Menu, MenuItem  } = require('electron')
const { exec } = require("child_process");

let windows = new Set();

// session is stored automatically here
// %APPDATA%\isolated-docs
//  const remote = require('electron').remote;
//  remote.app.getPath('userData');

// const ses = win.webContents.session
// console.log(ses.getUserAgent())

// in spirit of privacy like this
// https://addons.mozilla.org/en-US/firefox/addon/google-container/

const createWindow = (url) => {
    let window = new BrowserWindow({
      autoHideMenuBar: true,
      width: 800,
      height: 600,
      icon: `${__dirname}/icon.png`,
      webPreferences: {
        nodeIntegration: true,
        preload:`${__dirname}/scripts/googleWindow.js`,
      }
    })
    windows.add(window)
    window.loadURL(url);
    
    window.webContents.on('new-window', (event, url) => {
      event.preventDefault()
      if (url.match(/^https:\/\/docs.google.com\/document/)) {
        createWindow(url);
      } else {
        exec(`start ${url}`)
      }
    })
    
    // window.webContents.openDevTools();

    window.on("closed", () => {
      windows.delete(window);
      window = null;
    });
}


function main() {
  const menu = new Menu()
  menu.append(new MenuItem({
    label: 'Electron',
    submenu: [{
      role: 'help',
      accelerator: process.platform === 'darwin' ? 'Alt+P' : 'Alt+P',
      click: (ev) => {
        // console.log(ev);
        BrowserWindow.getFocusedWindow().loadURL('https://docs.google.com/document/u/0/');
      }
    }]
  }))

  Menu.setApplicationMenu(menu)
  createWindow('https://docs.google.com/document/u/0/');
}

app.on('ready', main)
// for os x
app.on("activate", () => {
    if (windows.size === 0) {
        createWindow();
    }
});


