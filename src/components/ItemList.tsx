import React from 'react'
import { ListItem, ListItemButton, ListItemText, Paper, Typography, Box, List } from '@mui/material'

interface Item {
  id: number
  name: string
  itemId: string
  category: string
  stats: string
}

interface ItemListProps {
  items: Item[]
  onItemClick: (item: Item) => void
}

const ItemList: React.FC<ItemListProps> = ({ items, onItemClick }) => {
  if (items.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="text.secondary">No items found</Typography>
      </Box>
    )
  }

  return (
    <Paper elevation={2} sx={{ mt: 2, maxHeight: 500, overflow: 'auto' }}>
      <List>
        {items.map((item) => (
          <ListItem key={item.itemId} disablePadding divider>
            <ListItemButton onClick={() => onItemClick(item)}>
              <ListItemText 
                primary={item.name} 
                secondary={item.itemId} 
                primaryTypographyProps={{ noWrap: true }}
                secondaryTypographyProps={{ noWrap: true, variant: 'caption' }}
              />
              <Box sx={{ ml: 'auto' }}>
                <Typography variant="caption" color="text.secondary">
                  {item.category}
                </Typography>
              </Box>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default ItemList
