import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { Container, Typography, TextField, Box, IconButton, InputAdornment } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import debounce from 'lodash.debounce'
import ItemList from './ItemList'
import ItemDetailDialog from './ItemDetailDialog'
import { Snackbar, Alert } from '@mui/material'

const MainView: React.FC = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [selectedItem, setSelectedItem] = useState<any | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const handleItemClick = (item: any) => {
    setSelectedItem(item)
    setIsDialogOpen(true)
  }

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id)
    setSnackbarOpen(true)
  }

  const performSearch = useCallback(async (q: string) => {
    const items = await window.ipcRenderer.searchItems(q)
    setResults(items)
  }, [])

  const debouncedSearch = useMemo(
    () => debounce(performSearch, 300),
    [performSearch]
  )

  useEffect(() => {
    debouncedSearch(query)
    return () => debouncedSearch.cancel()
  }, [query, debouncedSearch])

  const handleClear = () => {
    setQuery('')
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        KCD2 Item Browser
      </Typography>
      
      <Box sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search items by name or ID..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            endAdornment: query && (
              <InputAdornment position="end">
                <IconButton aria-label="clear search" onClick={handleClear}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 600 }}
        />
      </Box>
      
      <Box id="item-list">
        <Typography variant="body2" color="text.secondary">
          Found {results.length} items
        </Typography>
        <ItemList items={results} onItemClick={handleItemClick} />
      </Box>

      <ItemDetailDialog
        item={selectedItem}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCopyId={handleCopyId}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          Item ID copied to clipboard!
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default MainView
