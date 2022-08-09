const { app, BrowserWindow } = require("electron");
const electron = require("electron");
const path = require("path");
const ipc = electron.ipcMain;

let mainWin;
let secondWin;

function createWindow() {
  let display = electron.screen.getPrimaryDisplay();
  let width = display.bounds.width;
  let height = display.bounds.height;

  mainWin = new BrowserWindow({
    width: 388,
    height: 453,
    resizable: false,
    movable: true,
    frame: false,
    x: (width - 388) / 2,
    y: (height - 453) / 2,
    alwaysOnTop: false,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWin.loadFile("index.html");
  mainWin.once("ready-to-show", function () {
    mainWin.show();
  });

  secondWin = new BrowserWindow({
    width: 300,
    height: 50,
    resizable: false,
    transparent: true,
    movable: true,
    frame: false,
    alwaysOnTop: true,
    show: false,
    x: (width - 300) / 2,
    y: 0,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  secondWin.loadFile("hello.html");

  ipc.on("changeColor", function (event, arg) {
    console.log(arg);
    secondWin.show();
    mainWin.minimize();
    secondWin.webContents.send("color", arg);
  });

  mainWin.on("closed", () => {
    mainWin = null;
    secondWin = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWin === null) {
    createWindow();
  }
});
