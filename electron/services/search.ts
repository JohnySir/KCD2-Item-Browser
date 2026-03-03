import { db } from '../db'
import { items, Item } from '../db/schema'
import { like, or } from 'drizzle-orm'
import Fuse from 'fuse.js'

let fuse: Fuse<Item> | null = null
let lastItemCount = 0

async function getFuse() {
  const allItems = await db.select().from(items).all()
  
  // Re-initialize if item count changed (e.g. after re-indexing)
  if (!fuse || allItems.length !== lastItemCount) {
    fuse = new Fuse(allItems, {
      keys: ['name', 'itemId'],
      threshold: 0.2, // Stricter threshold to avoid too many false positives
      ignoreLocation: true,
      minMatchCharLength: 2,
      useExtendedSearch: true // Allows for more precise query syntax if needed
    })
    lastItemCount = allItems.length
  }
  return fuse
}

export async function searchItems(query: string) {
  if (!query) {
    return await db.select().from(items).limit(100).all()
  }

  const fuseInstance = await getFuse()
  const results = fuseInstance.search(query)
  
  // Fuse results are wrapped in { item, refIndex, score }
  return results.slice(0, 100).map(r => r.item)
}
