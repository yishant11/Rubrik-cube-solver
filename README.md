# Rubik's Cube Solver

A comprehensive **Object-Oriented Rubik's Cube Solver** built with React, Material-UI, and Tailwind CSS. This project implements a complete cube representation, manual rotation controls, scrambling functionality, and an automated solving algorithm.

# LIVE LINK
Live Link ->  https://rubrik-cube-solver.vercel.app/

## 🎯 Features

### Core Functionality

- **Object-Oriented Design**: Complete `RubiksCube` class with state management
- **Manual Controls**: All 12 basic moves (F, R, U, L, D, B and their inverses)
- **Cube Scrambling**: Generate random solvable cube states
- **Automated Solving**: Layer-by-layer solving algorithm implementation
- **Visual Representation**: SVG-based cube display in standard net format
- **Step-by-Step Solution**: Track and display each solving step
- **Real-time Updates**: Instant visual feedback for all moves

### Technical Implementation

- **Pure JavaScript/JSX**: No TypeScript dependencies required
- **Material-UI Components**: Modern, responsive UI design
- **Tailwind CSS**: Utility-first styling approach
- **React Hooks**: State management with useState
- **Modular Architecture**: Clean separation of cube logic and UI components

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yishant11/rubiks-cube-solver.git
   cd rubiks-cube-solver
   \`\`\`

2. **Install dependencies**
   \`\`\`bash

   # Core React dependencies

   npm install react react-dom

   # Material-UI dependencies

   npm install @mui/material @emotion/react @emotion/styled

   # Tailwind CSS

   npm install -D tailwindcss postcss autoprefixer

   # Initialize Tailwind CSS

   npx tailwindcss init -p
   \`\`\`

3. **Configure Tailwind CSS**

   Update your `tailwind.config.js`:
   \`\`\`javascript
   module.exports = {
   content: [
   "./src/**/*.{js,jsx,ts,tsx}",
   ],
   theme: {
   extend: {},
   },
   plugins: [],
   }
   \`\`\`

4. **Add Tailwind directives to your CSS**

   Create or update `src/index.css`:
   \`\`\`css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   \`\`\`

5. **Start the development server**
   \`\`\`bash
   npm start
   \`\`\`

## 🎮 How to Use

### Basic Operations

1. **Scramble**: Click "Scramble Cube" to generate a random cube state
2. **Solve**: Click "Solve Cube" to automatically solve the scrambled cube
3. **Manual Moves**: Use the move buttons (F, R, U, L, D, B, F', R', U', L', D', B') for manual control
4. **Reset**: Return to the solved state at any time

### Understanding the Display

- **Cube Visualization**: Standard cube net format showing all 6 faces
- **Color Scheme**:
  - White (W) - Bottom face
  - Yellow (Y) - Top face
  - Red (R) - Right face
  - Orange (O) - Left face
  - Blue (B) - Back face
  - Green (G) - Front face
- **Status Indicator**: Shows whether the cube is solved or not
- **Move History**: Displays scramble sequence and solution steps

## 🔧 Technical Details

### Cube Representation

The cube is represented as a JavaScript class with six faces, each containing 9 squares:

\`\`\`javascript
class RubiksCube {
constructor() {
this.state = {
front: Array(9).fill("g"), // Green
back: Array(9).fill("b"), // Blue  
 left: Array(9).fill("o"), // Orange
right: Array(9).fill("r"), // Red
up: Array(9).fill("w"), // White
down: Array(9).fill("y"), // Yellow
}
}
}
\`\`\`

### Move Implementation

Each move is implemented as a method that:

1. Rotates the target face (clockwise or counterclockwise)
2. Updates the adjacent edge pieces accordingly

Example of the F (Front) move:
\`\`\`javascript
F() {
// Rotate front face clockwise
this.state.front = this.rotateFaceClockwise(this.state.front)

// Update adjacent edges
// ... edge rotation logic
}
\`\`\`

### Solving Algorithm

The solver uses a **layer-by-layer approach** (beginner's method):

1. **White Cross**: Form a cross on the bottom layer
2. **White Corners**: Complete the bottom layer
3. **Middle Layer**: Position middle layer edges
4. **Yellow Cross**: Form a cross on the top layer
5. **Final Layer**: Orient and position remaining pieces

### Performance Considerations

- **Simplified Algorithm**: Prioritizes finding any solution over optimal moves
- **Attempt Limits**: Prevents infinite loops with maximum attempt counters
- **Random Move Generation**: Uses probabilistic approaches for complex steps
- **State Cloning**: Efficient cube state management for undo/redo operations

**Built with ❤️ using React, Material-UI, and Tailwind CSS**
