const { BrowserWindow, app, Menu, MenuItem  } = require('electron')
const { exec } = require("child_process");

let googleWindow;

// session is stored automatically here
// %APPDATA%\isolated-docs
//  const remote = require('electron').remote;
//  remote.app.getPath('userData');

// const ses = win.webContents.session
// console.log(ses.getUserAgent())

// in spirit of privacy like this
// https://addons.mozilla.org/en-US/firefox/addon/google-container/

function main() {
  googleWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 800,
    height: 600,
    icon: `${__dirname}/icon.png`,
    webPreferences: {
      nodeIntegration: true,
      preload:`${__dirname}/scripts/googleWindow.js`,
    }
  });

  const menu = new Menu()
  menu.append(new MenuItem({
    label: 'Electron',
    submenu: [{
      role: 'help',
      accelerator: process.platform === 'darwin' ? 'Alt+P' : 'Alt+P',
      click: () => { googleWindow.loadURL('https://docs.google.com/document/u/0/') }
    }]
  }))

  Menu.setApplicationMenu(menu)

    // googleWindow.setMenu(null)
    //mainWindow = new BrowserWindow({})
    // mainWindow.setMenuBarVisibility(false)
    
    //googleWindow.webContents.openDevTools();

  googleWindow.loadURL('https://docs.google.com/');
  googleWindow.webContents.on('new-window', (event, url) => {
    if (url.match(/^https:\/\/docs.google.com\/document/)) {
      
    } else {
      // googleWindow.loadURL(url)
      event.preventDefault()
      exec(`start ${url}`)
    }
  })

  //garbage collection handle
  googleWindow.on('close', function(){
      googleWindow=null;
  });
}

app.on('ready', main)
