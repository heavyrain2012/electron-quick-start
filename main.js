// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const proto = require('./marswrapper.node')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  console.log('app ready!')
  let userId = 'uiuJuJcc';
  let token = 'czRvxoCnOAdtGxgSnl7C75zZS42wtb7BMNy+2/R/sNXBZBXX3c+GcalcgNTqhhquG0tOgoC5/O9UNHSjJSIGfJdCRN7y1FX4YMtFtZZ0hN8Gf070I+AETN4ZSgKUMvZ+VFlWmEyNJsVgaNxgeqe92a6OPl3ZjEgPKrkbxMtmA9Y='
  //cid = 182DB2AC-6792-4A2F-BDDC-04A57826F3A4
  let cid = proto.getClientId()
  console.log('client id is ', cid)
  proto.setConnectionStatusListener((status) => {
    console.log('---connectStatus changed', status);

    if(status === 1){
        let count = 0;
        setInterval(() => {
            count ++;
            sendConversationMessage(count);
        }, 200)

    }
  });

  proto.connect(userId, token);

  console.log('connect---------');

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

function sendConversationMessage(count) {
    let strConv = '{"type":0,"conversationType":0,"target":"GNMtGtZZ","line":0}'
    let strCont = `{"type":1,"searchableContent":"${count}","mentionedType":0,"mentionedTargets":[]}`;
    proto.sendMessage(strConv, strCont, [], 0, (messageId, timestamp) => {
        console.log('onPrepared', messageId, timestamp);
    },
    (uploaded, total) => {
        console.log('onProgress', uploaded, total);
    },
    (messageUid, timestamp) => {
        console.log('send success', messageUid, timestamp, count);
    }, (err) => {
        console.log('send fail', err);
    }
     );
}


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
