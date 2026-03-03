# ⚔️ KCD2 Item Browser

[![Electron](https://img.shields.io/badge/Electron-4B3262?style=for-the-badge&logo=electron&logoColor=white)](https://www.electronjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)

A high-performance, minimalistic desktop companion for **Kingdom Come: Deliverance 2**. Instantly find any Item ID for the game's cheat system (`wh_cheat_addItem`) with lightning-fast fuzzy search.

---

## ✨ Features

- ⚡ **Zero-Latency Search:** Real-time results as you type, powered by `Fuse.js`.
- 🔍 **Fuzzy Matching:** Finds what you need even with typos or missing punctuation (e.g., "Arankas" matches "Aranka's").
- 📑 **Detailed Stats:** Full attribute breakdown for every item in the game.
- 📋 **One-Click Copy:** Instant copy-to-clipboard for item IDs.
- 📦 **Automated Indexing:** Processes raw game data dumps into a structured local database on first run.

---

## 🚀 Getting Started

Follow these steps to get the app running on your local machine.

### 📋 Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (recommended) or **npm**

### 🛠️ Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/yourusername/kcd2-item-browser.git
    cd kcd2-item-browser
    ```

2.  **Install Dependencies:**
    ```bash
    pnpm install
    ```

3.  **Rebuild Native Modules:**
    Since the app uses a native SQLite driver, you need to compile it for your Electron version:
    ```bash
    pnpm run rebuild:electron
    ```

### 🎮 Running the App

Start the development environment:
```bash
pnpm run dev
```

---

## 📜 Credits & Acknowledgments

🙌 Special thanks to **ExistingRaccoon** on Nexus Mods for providing the comprehensive item list data.  
🔗 [KCD2 Item List on Nexus Mods](https://www.nexusmods.com/kingdomcomedeliverance2/mods/87)

---

## 🛠️ Built With

- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Material UI](https://mui.com/) - React component library
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM for SQLite
- [Fuse.js](https://fusejs.io/) - Powerful fuzzy search library

---

<div align="center">
  <sub>Built with ❤️ for the KCD2 Community</sub>
</div>
