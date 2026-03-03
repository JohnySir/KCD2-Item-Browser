import React from 'react'
import { Box, LinearProgress, Typography, Paper } from '@mui/material'

interface InitializationViewProps {
  currentFile: string
  percent: number
}

const InitializationView: React.FC<InitializationViewProps> = ({ currentFile, percent }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: 2,
        p: 4,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h6" gutterBottom align="center">
          Preparing Item Data
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Processing: {currentFile}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" value={percent} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(
              percent
            )}%`}</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default InitializationView
