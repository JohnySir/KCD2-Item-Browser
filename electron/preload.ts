import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  searchItems: (query: string) => ipcRenderer.invoke('search-items', query),
  initializeData: () => ipcRenderer.invoke('initialize-data'),
  onIndexingProgress: (callback: (progress: any) => void) => {
    const listener = (_event: any, progress: any) => callback(progress)
    ipcRenderer.on('indexing-progress', listener)
    return () => ipcRenderer.off('indexing-progress', listener)
  }
})
