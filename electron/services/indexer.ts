import fs from 'node:fs/promises'
import path from 'node:path'
import { db } from '../db'
import { items, NewItem } from '../db/schema'
import { sql } from 'drizzle-orm'

export interface IndexerProgress {
  currentFile: string
  processedFiles: number
  totalFiles: number
  percent: number
}

export function parseItemLine(line: string): NewItem | null {
  // Regex to match: Name [ID] Stats
  // Example: Reforged Radzig Kobyla's sword [25366cab-ddf2-4657-94a5-0fcf06a8dabb] Price=...
  const match = line.match(/^(.+?)\s+\[([^\]]+)\]\s+(.*)$/)
  
  if (!match) return null

  const name = match[1].trim()
  const itemId = match[2].trim()
  const stats = match[3].trim()

  return {
    name,
    itemId,
    stats,
  }
}

export async function indexFiles(
  filesDir: string,
  onProgress?: (progress: IndexerProgress) => void
) {
  const allFiles = await fs.readdir(filesDir)
  const txtFiles = allFiles.filter(f => f.endsWith('.txt'))
  
  let processedFiles = 0
  
  for (const file of txtFiles) {
    const category = file.replace('item__', '').replace('.txt', '')
    const filePath = path.join(filesDir, file)
    const content = await fs.readFile(filePath, 'utf8')
    const lines = content.split('\n')
    
    const itemsToInsert: NewItem[] = []
    
    for (const line of lines) {
      const parsed = parseItemLine(line.trim())
      if (parsed) {
        itemsToInsert.push({
          ...parsed,
          category
        })
      }
    }
    
    if (itemsToInsert.length > 0) {
      try {
        await db.insert(items).values(itemsToInsert).onConflictDoNothing({ target: items.itemId }).run()
      } catch (e) {
        console.error(`Error inserting items from ${file}:`, e)
      }
    }
    
    processedFiles++
    if (onProgress) {
      onProgress({
        currentFile: file,
        processedFiles,
        totalFiles: txtFiles.length,
        percent: Math.round((processedFiles / txtFiles.length) * 100)
      })
    }
  }
}
