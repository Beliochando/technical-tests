[Español](/README.es.md) | [English](/README.en.md) | [Galego]()

# 🧭 Pokémon Explorer

**Pokémon Explorer** is an interactive web application to explore and compare Pokémon based on their moves, stats, special badges, and more. Perfect for casual fans and competitive players who need a dynamic and visual tool.

---

## ✅ Implemented Features

### Basic

- [x] **Select a Move** and see all Pokémon that learn it.
- [x] **View detailed Pokémon profile** including:
  - Official artwork.
  - Base stats (HP, Attack, Defense, etc.).
  - The moves that Pokémon can learn.
  - Special badges (Legendary, Mythical, Hidden Ability).
  - Internal filter to search among its moves.

### Intermediate

- [x] **Contextual navigation**:
  - From a Pokémon’s profile, click a move to see Pokémon that learn that move.
  - View and navigate directly to evolutions (if any).
  - Browse between Pokémon profiles without leaving the current view.
- [x] **List sorting and filtering**:
  - Alphabetical order A → Z / Z → A / no sorting.
  - Filters by badges:
    - Legendary
    - Mythical
    - Has Hidden Ability
  - Filters are visually indicated on Pokémon cards.
- [x] **Smart scrolling**:
  - When selecting a Pokémon anywhere in the app, the list auto-scrolls and centers the card for better visual orientation.

### Advanced

- [x] **Compare two Pokémon**:
  - Select a Pokémon and then another to compare their base stats visually.
  - Bar chart showing 5 key stats.
  - Retains previously selected Pokémon to return to after comparison.

### Very Advanced

- [x] **Compare two Moves**:
  - Activate move comparison from the move filter.
  - Bar chart showing number of Pokémon by primary type that can learn each move.

---

## 🧪 Technologies Used

| Technology             | Purpose                                       |
| ---------------------- | --------------------------------------------- |
| **React + TypeScript** | Robust, typed UI development                  |
| **TailwindCSS**        | Utility-first styling for fast custom design  |
| **DaisyUI**            | Accessible UI components built on TailwindCSS |
| **React Icons**        | Icons from `react-icons/tb`, `lia`, `bi`      |
| **Chart.js**           | Data visualization with bar charts            |
| **Context API**        | Global state management for selected moves    |
| **Custom Hooks**       | Reusable logic such as alphabetical sorting   |

---

## 🚀 Installation and Running

### Requirements

- Node.js >= 18
- pnpm (recommended)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/Beliochando/technical-tests.git
cd pokemon-explorer

# 2. Install dependencies
pnpm install

# 3. Run in development mode
pnpm dev
```
