// setting for browser window
const {app,BrowserWindow,ipcMain} = require("electron");


const createWindow=()=>{
    const win = new BrowserWindow({   //it will open brower in a new window.
        height:400,
        width:350,
        frame:false,
        backgroundColor: "#ffe6ee",
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }


    });

    win.loadFile("index.html");   // index.html file will open
};

// ✅ Listen for minimize
  ipcMain.on("minimize-app", () => {
    win.minimize();
  });

  // ✅ Listen for close
  ipcMain.on("close-app", () => {
    win.close();
  });

app.whenReady().then(()=>{       
    createWindow();

    app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

 
mainWindow.setMenu(null);