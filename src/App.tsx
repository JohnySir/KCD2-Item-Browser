import { useState, useEffect, useCallback } from 'react'
import InitializationView from './components/InitializationView'
import MainView from './components/MainView'
import { Container, Typography } from '@mui/material'

// TypeScript definition for window.ipcRenderer
declare global {
  interface Window {
    ipcRenderer: {
      searchItems: (query: string) => Promise<any[]>
      initializeData: () => Promise<{ success: boolean }>
      onIndexingProgress: (callback: (progress: any) => void) => () => void
    }
  }
}

function App() {
  const [isInitializing, setIsInitializing] = useState(true)
  const [progress, setProgress] = useState({ currentFile: '', percent: 0 })

  useEffect(() => {
    // Start real initialization
    const cleanup = window.ipcRenderer.onIndexingProgress((p) => {
      setProgress(p)
    })

    window.ipcRenderer.initializeData().then(() => {
      // Small delay to show 100%
      setTimeout(() => setIsInitializing(false), 500)
    })

    return cleanup
  }, [])

  if (isInitializing) {
    return <InitializationView currentFile={progress.currentFile} percent={progress.percent} />
  }

  return <MainView />
}

export default App
