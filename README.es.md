[Español](/README.es.md) | [English](/README.en.md)

# 🧭 Pokémon Explorer

**Pokémon Explorer** es una aplicación interactiva para explorar y comparar Pokémon según sus movimientos, estadísticas, badges especiales y más. Ideal tanto para fans casuales como para jugadores competitivos que necesitan una herramienta visual y dinámica.

---

## ✅ Funcionalidades implementadas

### Básicas

- [x] **Seleccionar un Move** y ver todos los Pokémon que lo aprenden.
- [x] **Ver ficha detallada del Pokémon** con:
  - Imagen oficial.
  - Estadísticas base (HP, Ataque, Defensa, etc.).
  - Moves que aprende ese Pokémon.
  - Badges especiales (Legendary, Mythical, Hidden Ability).
  - Filtro interno para buscar entre sus moves.

### Intermedias

- [x] **Navegación contextual**:
  - Desde la ficha de un Pokémon, puedes pulsar en otro Move y ver la lista de Pokémon que lo aprenden.
  - Si tiene evolución, se muestra y puedes acceder directamente a la ficha del Pokémon en el que evoluciona.
  - Puedes navegar entre fichas de Pokémon sin salir de la vista.
- [x] **Orden y filtro en el listado**:
  - Orden alfabético A → Z / Z → A / sin orden.
  - Filtros por badges:
    - Legendary
    - Mythical
    - Has Hidden Ability
  - Los filtros están reflejados visualmente en las tarjetas del listado.
- [x] **Scroll inteligente**:
  - Al seleccionar un Pokémon desde cualquier vista o contexto, la lista se centra automáticamente en su tarjeta para facilitar la orientación visual.

### Avanzadas

- [x] **Comparar dos Pokémon**:
  - Puedes seleccionar un Pokémon desde su ficha y luego otro desde el listado para ver una comparación visual.
  - Gráfico de barras con 5 estadísticas clave.
  - Conserva el Pokémon previamente seleccionado para volver a su ficha tras cerrar la comparación.

### Muy avanzadas

- [x] **Comparar dos Moves**:
  - Desde el filtro de moves puedes activar una comparación.
  - Se muestra un gráfico con el número de Pokémon por tipo principal que pueden aprender cada Move.

---

## 🧪 Tecnologías utilizadas

| Herramienta            | Uso                                                      |
| ---------------------- | -------------------------------------------------------- |
| **React + TypeScript** | Construcción robusta y segura de la interfaz             |
| **TailwindCSS**        | Estilado rápido con clases utilitarias                   |
| **DaisyUI**            | Componentes UI accesibles sobre Tailwind                 |
| **React Icons**        | Iconografía con `react-icons/tb`, `lia`, `bi`            |
| **Chart.js**           | Visualización de datos en gráficos de barras             |
| **Context API**        | Gestión de estado global para Moves seleccionados        |
| **Custom Hooks**       | Lógica desacoplada como el ordenamiento (`useSortOrder`) |

---

## 🚀 Instalación y ejecución

### Requisitos

- Node.js >= 18
- pnpm (recomendado)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/Beliochando/technical-tests.git
cd pokemon-explorer

# 2. Instalar dependencias
pnpm install

# 3. Ejecutar en modo desarrollo
pnpm dev
```
