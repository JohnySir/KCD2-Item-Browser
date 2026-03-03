import React from 'react'
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box,
  Divider,
  IconButton
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

interface Item {
  id: number
  name: string
  itemId: string
  category: string
  stats: string
}

interface ItemDetailDialogProps {
  item: Item | null
  open: boolean
  onClose: () => void
  onCopyId: (id: string) => void
}

const ItemDetailDialog: React.FC<ItemDetailDialogProps> = ({ item, open, onClose, onCopyId }) => {
  if (!item) return null

  // Helper to parse stats string Price=55877 Defense=299 ...
  const parseStats = (statsStr: string) => {
    if (!statsStr) return []
    return statsStr.split(/\s+/).filter(s => s.includes('=')).map(s => {
      const [key, value] = s.split('=')
      return { key, value }
    })
  }

  const stats = parseStats(item.stats)

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="span">{item.name}</Typography>
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">Category</Typography>
          <Typography variant="body1" gutterBottom>{item.category}</Typography>

          <Typography variant="subtitle2" color="text.secondary">Item ID</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{item.itemId}</Typography>    
            <IconButton size="small" onClick={() => onCopyId(item.itemId)} title="Copy ID">
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        
        <Divider sx={{ my: 2 }}>Stats</Divider>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
          {stats.map(({ key, value }) => (
            <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between', pr: 2 }}>
              <Typography variant="body2" fontWeight="bold">{key}:</Typography>
              <Typography variant="body2">{value}</Typography>
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button 
          variant="contained" 
          startIcon={<ContentCopyIcon />} 
          onClick={() => onCopyId(item.itemId)}
        >
          Copy ID
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ItemDetailDialog
