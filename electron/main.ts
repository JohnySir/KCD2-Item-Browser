import { app, BrowserWindow, ipcMain, Menu } from 'electron'
import path from 'node:path'
import { searchItems } from './services/search'
import { indexFiles } from './services/indexer'

// In CJS, __dirname is already available.
// But when bundled by Vite, we might need to handle it.

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin -beware-
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  Menu.setApplicationMenu(null)

  win = new BrowserWindow({
    width: 997,
    height: 831,
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

// IPC Handlers
ipcMain.handle('search-items', async (_event, query: string) => {
  return await searchItems(query)
})

ipcMain.handle('initialize-data', async (event) => {
  const txtFilesDir = path.join(process.cwd(), 'txt files')
  await indexFiles(txtFilesDir, (progress) => {
    event.sender.send('indexing-progress', progress)
  })
  return { success: true }
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
