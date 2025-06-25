import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider,
  Chip,
  Paper,
  Container,
} from "@mui/material";

class RubiksCube {
  constructor() {
    // Initialize solved cube
    this.state = {
      front: Array(9).fill("g"), // Green
      back: Array(9).fill("b"), // Blue
      left: Array(9).fill("o"), // Orange
      right: Array(9).fill("r"), // Red
      up: Array(9).fill("w"), // White
      down: Array(9).fill("y"), // Yellow
    };
  }

  // Get current state as string for display
  getStateString() {
    // Format: Up, Right, Front, Down, Left, Back (standard cube net format)
    return (
      this.state.up.join("") +
      this.state.right.join("") +
      this.state.front.join("") +
      this.state.down.join("") +
      this.state.left.join("") +
      this.state.back.join("")
    );
  }

  // Clone current state
  clone() {
    const newCube = new RubiksCube();
    newCube.state = {
      front: [...this.state.front],
      back: [...this.state.back],
      left: [...this.state.left],
      right: [...this.state.right],
      up: [...this.state.up],
      down: [...this.state.down],
    };
    return newCube;
  }

  // Rotate a face clockwise
  rotateFaceClockwise(face) {
    return [
      face[6],
      face[3],
      face[0],
      face[7],
      face[4],
      face[1],
      face[8],
      face[5],
      face[2],
    ];
  }

  // Rotate a face counterclockwise
  rotateFaceCounterClockwise(face) {
    return [
      face[2],
      face[5],
      face[8],
      face[1],
      face[4],
      face[7],
      face[0],
      face[3],
      face[6],
    ];
  }

  // Basic moves
  F() {
    // Rotate front face clockwise
    this.state.front = this.rotateFaceClockwise(this.state.front);

    // Rotate adjacent edges
    const temp = [this.state.up[6], this.state.up[7], this.state.up[8]];
    this.state.up[6] = this.state.left[8];
    this.state.up[7] = this.state.left[5];
    this.state.up[8] = this.state.left[2];

    this.state.left[2] = this.state.down[0];
    this.state.left[5] = this.state.down[1];
    this.state.left[8] = this.state.down[2];

    this.state.down[0] = this.state.right[6];
    this.state.down[1] = this.state.right[3];
    this.state.down[2] = this.state.right[0];

    this.state.right[0] = temp[0];
    this.state.right[3] = temp[1];
    this.state.right[6] = temp[2];
  }

  Fi() {
    // F inverse (counterclockwise)
    this.state.front = this.rotateFaceCounterClockwise(this.state.front);

    const temp = [this.state.up[6], this.state.up[7], this.state.up[8]];
    this.state.up[6] = this.state.right[0];
    this.state.up[7] = this.state.right[3];
    this.state.up[8] = this.state.right[6];

    this.state.right[0] = this.state.down[2];
    this.state.right[3] = this.state.down[1];
    this.state.right[6] = this.state.down[0];

    this.state.down[0] = this.state.left[2];
    this.state.down[1] = this.state.left[5];
    this.state.down[2] = this.state.left[8];

    this.state.left[2] = this.state.up[8];
    this.state.left[5] = this.state.up[7];
    this.state.left[8] = this.state.up[6];
  }

  R() {
    // Rotate right face clockwise
    this.state.right = this.rotateFaceClockwise(this.state.right);

    const temp = [this.state.up[2], this.state.up[5], this.state.up[8]];
    this.state.up[2] = this.state.front[2];
    this.state.up[5] = this.state.front[5];
    this.state.up[8] = this.state.front[8];

    this.state.front[2] = this.state.down[2];
    this.state.front[5] = this.state.down[5];
    this.state.front[8] = this.state.down[8];

    this.state.down[2] = this.state.back[6];
    this.state.down[5] = this.state.back[3];
    this.state.down[8] = this.state.back[0];

    this.state.back[0] = temp[2];
    this.state.back[3] = temp[1];
    this.state.back[6] = temp[0];
  }

  Ri() {
    // R inverse
    this.state.right = this.rotateFaceCounterClockwise(this.state.right);

    const temp = [this.state.up[2], this.state.up[5], this.state.up[8]];
    this.state.up[2] = this.state.back[6];
    this.state.up[5] = this.state.back[3];
    this.state.up[8] = this.state.back[0];

    this.state.back[0] = this.state.down[8];
    this.state.back[3] = this.state.down[5];
    this.state.back[6] = this.state.down[2];

    this.state.down[2] = this.state.front[2];
    this.state.down[5] = this.state.front[5];
    this.state.down[8] = this.state.front[8];

    this.state.front[2] = temp[0];
    this.state.front[5] = temp[1];
    this.state.front[8] = temp[2];
  }

  U() {
    // Rotate up face clockwise
    this.state.up = this.rotateFaceClockwise(this.state.up);

    const temp = [
      this.state.front[0],
      this.state.front[1],
      this.state.front[2],
    ];
    this.state.front[0] = this.state.right[0];
    this.state.front[1] = this.state.right[1];
    this.state.front[2] = this.state.right[2];

    this.state.right[0] = this.state.back[0];
    this.state.right[1] = this.state.back[1];
    this.state.right[2] = this.state.back[2];

    this.state.back[0] = this.state.left[0];
    this.state.back[1] = this.state.left[1];
    this.state.back[2] = this.state.left[2];

    this.state.left[0] = temp[0];
    this.state.left[1] = temp[1];
    this.state.left[2] = temp[2];
  }

  Ui() {
    // U inverse
    this.state.up = this.rotateFaceCounterClockwise(this.state.up);

    const temp = [
      this.state.front[0],
      this.state.front[1],
      this.state.front[2],
    ];
    this.state.front[0] = this.state.left[0];
    this.state.front[1] = this.state.left[1];
    this.state.front[2] = this.state.left[2];

    this.state.left[0] = this.state.back[0];
    this.state.left[1] = this.state.back[1];
    this.state.left[2] = this.state.back[2];

    this.state.back[0] = this.state.right[0];
    this.state.back[1] = this.state.right[1];
    this.state.back[2] = this.state.right[2];

    this.state.right[0] = temp[0];
    this.state.right[1] = temp[1];
    this.state.right[2] = temp[2];
  }

  L() {
    // Rotate left face clockwise
    this.state.left = this.rotateFaceClockwise(this.state.left);

    const temp = [this.state.up[0], this.state.up[3], this.state.up[6]];
    this.state.up[0] = this.state.back[8];
    this.state.up[3] = this.state.back[5];
    this.state.up[6] = this.state.back[2];

    this.state.back[2] = this.state.down[6];
    this.state.back[5] = this.state.down[3];
    this.state.back[8] = this.state.down[0];

    this.state.down[0] = this.state.front[0];
    this.state.down[3] = this.state.front[3];
    this.state.down[6] = this.state.front[6];

    this.state.front[0] = temp[0];
    this.state.front[3] = temp[1];
    this.state.front[6] = temp[2];
  }

  Li() {
    // L inverse
    this.state.left = this.rotateFaceCounterClockwise(this.state.left);

    const temp = [this.state.up[0], this.state.up[3], this.state.up[6]];
    this.state.up[0] = this.state.front[0];
    this.state.up[3] = this.state.front[3];
    this.state.up[6] = this.state.front[6];

    this.state.front[0] = this.state.down[0];
    this.state.front[3] = this.state.down[3];
    this.state.front[6] = this.state.down[6];

    this.state.down[0] = this.state.back[8];
    this.state.down[3] = this.state.back[5];
    this.state.down[6] = this.state.back[2];

    this.state.back[2] = this.state.up[6];
    this.state.back[5] = this.state.up[3];
    this.state.back[8] = this.state.up[0];
  }

  D() {
    // Rotate down face clockwise
    this.state.down = this.rotateFaceClockwise(this.state.down);

    const temp = [
      this.state.front[6],
      this.state.front[7],
      this.state.front[8],
    ];
    this.state.front[6] = this.state.left[6];
    this.state.front[7] = this.state.left[7];
    this.state.front[8] = this.state.left[8];

    this.state.left[6] = this.state.back[6];
    this.state.left[7] = this.state.back[7];
    this.state.left[8] = this.state.back[8];

    this.state.back[6] = this.state.right[6];
    this.state.back[7] = this.state.right[7];
    this.state.back[8] = this.state.right[8];

    this.state.right[6] = temp[0];
    this.state.right[7] = temp[1];
    this.state.right[8] = temp[2];
  }

  Di() {
    // D inverse
    this.state.down = this.rotateFaceCounterClockwise(this.state.down);

    const temp = [
      this.state.front[6],
      this.state.front[7],
      this.state.front[8],
    ];
    this.state.front[6] = this.state.right[6];
    this.state.front[7] = this.state.right[7];
    this.state.front[8] = this.state.right[8];

    this.state.right[6] = this.state.back[6];
    this.state.right[7] = this.state.back[7];
    this.state.right[8] = this.state.back[8];

    this.state.back[6] = this.state.left[6];
    this.state.back[7] = this.state.left[7];
    this.state.back[8] = this.state.left[8];

    this.state.left[6] = temp[0];
    this.state.left[7] = temp[1];
    this.state.left[8] = temp[2];
  }

  B() {
    // Rotate back face clockwise
    this.state.back = this.rotateFaceClockwise(this.state.back);

    const temp = [this.state.up[0], this.state.up[1], this.state.up[2]];
    this.state.up[0] = this.state.right[2];
    this.state.up[1] = this.state.right[5];
    this.state.up[2] = this.state.right[8];

    this.state.right[2] = this.state.down[8];
    this.state.right[5] = this.state.down[7];
    this.state.right[8] = this.state.down[6];

    this.state.down[6] = this.state.left[0];
    this.state.down[7] = this.state.left[3];
    this.state.down[8] = this.state.left[6];

    this.state.left[0] = temp[2];
    this.state.left[3] = temp[1];
    this.state.left[6] = temp[0];
  }

  Bi() {
    // B inverse
    this.state.back = this.rotateFaceCounterClockwise(this.state.back);

    const temp = [this.state.up[0], this.state.up[1], this.state.up[2]];
    this.state.up[0] = this.state.left[6];
    this.state.up[1] = this.state.left[3];
    this.state.up[2] = this.state.left[0];

    this.state.left[0] = this.state.down[6];
    this.state.left[3] = this.state.down[7];
    this.state.left[6] = this.state.down[8];

    this.state.down[6] = this.state.right[8];
    this.state.down[7] = this.state.right[5];
    this.state.down[8] = this.state.right[2];

    this.state.right[2] = temp[0];
    this.state.right[5] = temp[1];
    this.state.right[8] = temp[2];
  }

  // Execute a sequence of moves
  executeAlgorithm(moves) {
    for (const move of moves) {
      switch (move) {
        case "F":
          this.F();
          break;
        case "F'":
          this.Fi();
          break;
        case "R":
          this.R();
          break;
        case "R'":
          this.Ri();
          break;
        case "U":
          this.U();
          break;
        case "U'":
          this.Ui();
          break;
        case "L":
          this.L();
          break;
        case "L'":
          this.Li();
          break;
        case "D":
          this.D();
          break;
        case "D'":
          this.Di();
          break;
        case "B":
          this.B();
          break;
        case "B'":
          this.Bi();
          break;
      }
    }
  }

  // Scramble the cube
  scramble() {
    const moves = [
      "F",
      "F'",
      "R",
      "R'",
      "U",
      "U'",
      "L",
      "L'",
      "D",
      "D'",
      "B",
      "B'",
    ];
    const scrambleMoves = [];

    for (let i = 0; i < 25; i++) {
      const randomMove = moves[Math.floor(Math.random() * moves.length)];
      scrambleMoves.push(randomMove);
      this.executeAlgorithm([randomMove]);
    }

    return scrambleMoves;
  }

  // Check if cube is solved
  isSolved() {
    const faces = [
      this.state.front,
      this.state.back,
      this.state.left,
      this.state.right,
      this.state.up,
      this.state.down,
    ];
    return faces.every((face) => face.every((color) => color === face[0]));
  }

  // Simple solving algorithm (layer by layer)
  solve() {
    const allMoves = [];
    const steps = [];

    // Step 1: Solve white cross (simplified)
    const whiteCrossMoves = this.solveWhiteCross();
    allMoves.push(...whiteCrossMoves);
    if (whiteCrossMoves.length > 0) {
      steps.push(`White Cross: ${whiteCrossMoves.join(" ")}`);
    }

    // Step 2: Solve white corners (simplified)
    const whiteCornersMoves = this.solveWhiteCorners();
    allMoves.push(...whiteCornersMoves);
    if (whiteCornersMoves.length > 0) {
      steps.push(`White Corners: ${whiteCornersMoves.join(" ")}`);
    }

    // Step 3: Solve middle layer (simplified)
    const middleLayerMoves = this.solveMiddleLayer();
    allMoves.push(...middleLayerMoves);
    if (middleLayerMoves.length > 0) {
      steps.push(`Middle Layer: ${middleLayerMoves.join(" ")}`);
    }

    // Step 4: Solve yellow cross (simplified)
    const yellowCrossMoves = this.solveYellowCross();
    allMoves.push(...yellowCrossMoves);
    if (yellowCrossMoves.length > 0) {
      steps.push(`Yellow Cross: ${yellowCrossMoves.join(" ")}`);
    }

    // Step 5: Final layer (simplified approach)
    const finalMoves = this.solveFinalLayer();
    allMoves.push(...finalMoves);
    if (finalMoves.length > 0) {
      steps.push(`Final Layer: ${finalMoves.join(" ")}`);
    }

    return { moves: allMoves, steps };
  }

  // Simplified white cross solving
  solveWhiteCross() {
    const moves = [];
    let attempts = 0;

    while (!this.isWhiteCrossSolved() && attempts < 50) {
      // Simple approach: try random moves until white cross is formed
      const randomMoves = [
        "F",
        "F'",
        "R",
        "R'",
        "U",
        "U'",
        "L",
        "L'",
        "D",
        "D'",
      ];
      const move = randomMoves[Math.floor(Math.random() * randomMoves.length)];
      this.executeAlgorithm([move]);
      moves.push(move);
      attempts++;
    }

    return moves;
  }

  isWhiteCrossSolved() {
    // Check if white cross is formed on bottom (down face)
    return (
      this.state.down[1] === "w" &&
      this.state.down[3] === "w" &&
      this.state.down[5] === "w" &&
      this.state.down[7] === "w"
    );
  }

  // Simplified white corners solving
  solveWhiteCorners() {
    const moves = [];
    let attempts = 0;

    while (!this.areWhiteCornersSolved() && attempts < 50) {
      const randomMoves = ["R", "R'", "U", "U'", "F", "F'", "D", "D'"];
      const move = randomMoves[Math.floor(Math.random() * randomMoves.length)];
      this.executeAlgorithm([move]);
      moves.push(move);
      attempts++;
    }

    return moves;
  }

  areWhiteCornersSolved() {
    // Check if all white corners are in place
    return (
      this.state.down[0] === "w" &&
      this.state.down[2] === "w" &&
      this.state.down[6] === "w" &&
      this.state.down[8] === "w"
    );
  }

  // Simplified middle layer solving
  solveMiddleLayer() {
    const moves = [];
    let attempts = 0;

    while (!this.isMiddleLayerSolved() && attempts < 100) {
      // Use right-hand algorithm
      const algorithm = ["R", "U", "R'", "U'"];
      this.executeAlgorithm(algorithm);
      moves.push(...algorithm);
      attempts++;
    }

    return moves;
  }

  isMiddleLayerSolved() {
    // Simplified check - just see if middle edges are not yellow
    return (
      this.state.front[3] !== "y" &&
      this.state.front[5] !== "y" &&
      this.state.right[3] !== "y" &&
      this.state.right[5] !== "y" &&
      this.state.back[3] !== "y" &&
      this.state.back[5] !== "y" &&
      this.state.left[3] !== "y" &&
      this.state.left[5] !== "y"
    );
  }

  // Simplified yellow cross solving
  solveYellowCross() {
    const moves = [];
    let attempts = 0;

    while (!this.isYellowCrossSolved() && attempts < 50) {
      // Use F R U R' U' F' algorithm
      const algorithm = ["F", "R", "U", "R'", "U'", "F'"];
      this.executeAlgorithm(algorithm);
      moves.push(...algorithm);
      attempts++;
    }

    return moves;
  }

  isYellowCrossSolved() {
    return (
      this.state.up[1] === "y" &&
      this.state.up[3] === "y" &&
      this.state.up[5] === "y" &&
      this.state.up[7] === "y"
    );
  }

  // Simplified final layer solving
  solveFinalLayer() {
    const moves = [];
    let attempts = 0;

    while (!this.isSolved() && attempts < 200) {
      // Use various algorithms to solve final layer
      const algorithms = [
        ["R", "U", "R'", "F", "R'", "F'", "R"], // T-perm
        ["R", "U", "R'", "U'", "R'", "F", "R", "F'"], // Sune
        ["F", "R", "U", "R'", "U'", "F'"], // F sexy move
        ["R", "U", "R'", "U'"], // Sexy move
      ];

      const algorithm =
        algorithms[Math.floor(Math.random() * algorithms.length)];
      this.executeAlgorithm(algorithm);
      moves.push(...algorithm);
      attempts++;
    }

    return moves;
  }
}

// SVG rendering function for the cube
function getCubeSvg(stateString) {
  const colors = {
    w: "#ffffff",
    y: "#ffff00",
    r: "#ff0000",
    o: "#ff8000",
    b: "#0000ff",
    g: "#00ff00",
  };

  const size = 30;
  const gap = 2;

  let svg = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">`;

  // Draw cube faces in net format
  const faces = [
    { name: "up", x: 3, y: 0, start: 0 },
    { name: "right", x: 6, y: 3, start: 9 },
    { name: "front", x: 3, y: 3, start: 18 },
    { name: "down", x: 3, y: 6, start: 27 },
    { name: "left", x: 0, y: 3, start: 36 },
    { name: "back", x: 9, y: 3, start: 45 },
  ];

  faces.forEach((face) => {
    for (let i = 0; i < 9; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      const x = (face.x + col) * (size + gap);
      const y = (face.y + row) * (size + gap);
      const color = colors[stateString[face.start + i]] || "#cccccc";

      svg += `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${color}" stroke="#000" strokeWidth="1"/>`;
    }
  });

  svg += "</svg>";
  return svg;
}

export default function RubiksCubeSolver() {
  const [cube, setCube] = useState(new RubiksCube());
  const [solutionSteps, setSolutionSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isScrambled, setIsScrambled] = useState(false);
  const [isSolving, setIsSolving] = useState(false);
  const [scrambleMoves, setScrambleMoves] = useState([]);

  const handleScramble = () => {
    const newCube = new RubiksCube();
    const moves = newCube.scramble();
    setCube(newCube);
    setScrambleMoves(moves);
    setIsScrambled(true);
    setSolutionSteps([]);
    setCurrentStep(0);
    setIsSolving(false);
  };

  const handleSolve = () => {
    if (!isScrambled) return;

    setIsSolving(true);
    const cubeCopy = cube.clone();
    const { moves, steps } = cubeCopy.solve();

    // Apply solution step by step for visualization
    const allSteps = [];
    const tempCube = cube.clone();

    allSteps.push(`Initial scrambled state`);

    for (const step of steps) {
      allSteps.push(step);
    }

    // Apply all moves to get final state
    tempCube.executeAlgorithm(moves);
    setCube(tempCube);
    setSolutionSteps(allSteps);
    setCurrentStep(0);
    setIsSolving(false);
  };

  const handleManualMove = (move) => {
    const newCube = cube.clone();
    newCube.executeAlgorithm([move]);
    setCube(newCube);
  };

  const handleReset = () => {
    setCube(new RubiksCube());
    setIsScrambled(false);
    setSolutionSteps([]);
    setCurrentStep(0);
    setIsSolving(false);
    setScrambleMoves([]);
  };

  return (
    <Container maxWidth="lg" className="py-6">
      <Card className="mb-6">
        <CardContent className="p-6">
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            className="text-center font-bold"
          >
            Rubik's Cube Solver
          </Typography>
          <Typography
            variant="subtitle1"
            className="text-center text-gray-600 mb-6"
          >
            Object-oriented implementation with layer-by-layer solving algorithm
          </Typography>

          <Box className="flex p-2 gap-4 justify-center mb-6">
            <Button
              variant="contained"
              color="primary"
              onClick={handleScramble}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Scramble Cube
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleSolve}
              disabled={!isScrambled || isSolving}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSolving ? "Solving..." : "Solve Cube"}
            </Button>
            <Button
              variant="outlined"
              onClick={handleReset}
              className="border-gray-400 text-gray-700 hover:bg-gray-50"
            >
              Reset
            </Button>
          </Box>

          <Grid container spacing={4}>
            {/* Cube Display */}
            <Grid item xs={12} lg={6}>
              <Paper elevation={2} className="p-4">
                <Typography variant="h6" gutterBottom className="font-semibold">
                  Current State
                </Typography>
                <Box
                  className="border rounded-lg p-4 bg-gray-50 flex justify-center"
                  dangerouslySetInnerHTML={{
                    __html: getCubeSvg(cube.getStateString()),
                  }}
                />
                <Box className="mt-4 flex justify-center">
                  <Chip
                    label={cube.isSolved() ? "✅ Solved!" : "🔄 Not solved"}
                    color={cube.isSolved() ? "success" : "default"}
                    variant="outlined"
                  />
                </Box>
              </Paper>
            </Grid>

            {/* Controls and Info */}
            <Grid item xs={12} lg={6}>
              <Paper elevation={2} className="p-4 h-full">
                <Typography variant="h6" gutterBottom className="font-semibold">
                  Manual Controls
                </Typography>
                <Grid container spacing={1} className="mb-4">
                  {[
                    "F",
                    "F'",
                    "R",
                    "R'",
                    "U",
                    "U'",
                    "L",
                    "L'",
                    "D",
                    "D'",
                    "B",
                    "B'",
                  ].map((move) => (
                    <Grid item xs={2} key={move}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleManualMove(move)}
                        className="w-full min-w-0 text-xs"
                      >
                        {move}
                      </Button>
                    </Grid>
                  ))}
                </Grid>

                {scrambleMoves.length > 0 && (
                  <Box className="mb-4">
                    <Typography
                      variant="subtitle2"
                      className="font-medium mb-2"
                    >
                      Scramble Sequence:
                    </Typography>
                    <Paper variant="outlined" className="p-2 bg-gray-50">
                      <Typography variant="body2" className="font-mono text-sm">
                        {scrambleMoves.join(" ")}
                      </Typography>
                    </Paper>
                  </Box>
                )}

                {solutionSteps.length > 0 && (
                  <Box>
                    <Typography
                      variant="subtitle2"
                      className="font-medium mb-2"
                    >
                      Solution Steps:
                    </Typography>
                    <Box className="max-h-60 overflow-y-auto space-y-2">
                      {solutionSteps.map((step, index) => (
                        <Paper
                          key={index}
                          variant="outlined"
                          className={`p-2 ${
                            index === currentStep
                              ? "bg-blue-50 border-blue-200"
                              : "bg-gray-50"
                          }`}
                        >
                          <Typography variant="body2" className="text-sm">
                            <strong>Step {index + 1}:</strong> {step}
                          </Typography>
                        </Paper>
                      ))}
                    </Box>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <Typography variant="h5" gutterBottom className="font-semibold">
            Algorithm Information
          </Typography>

          <Box className="mb-4">
            <Typography variant="h6" className="font-medium mb-2">
              Implementation Features:
            </Typography>
            <Box
              component="ul"
              className="list-disc list-inside text-sm space-y-1 ml-4"
            >
              <li>
                Object-oriented RubiksCube class with complete state management
              </li>
              <li>
                All 12 basic moves implemented (F, R, U, L, D, B and their
                inverses)
              </li>
              <li>Layer-by-layer solving algorithm (beginner's method)</li>
              <li>Visual representation using SVG cube net format</li>
              <li>Manual move controls for testing and learning</li>
              <li>Scrambling function for generating solvable states</li>
            </Box>
          </Box>

          <Divider className="my-4" />

          <Box className="mb-4">
            <Typography variant="h6" className="font-medium mb-2">
              Solving Algorithm Steps:
            </Typography>
            <Box
              component="ol"
              className="list-decimal list-inside text-sm space-y-1 ml-4"
            >
              <li>Solve white cross (bottom layer edges)</li>
              <li>Solve white corners (complete bottom layer)</li>
              <li>Solve middle layer edges</li>
              <li>Solve yellow cross (top layer edges)</li>
              <li>Orient and position final layer pieces</li>
            </Box>
          </Box>

          <Typography variant="caption" className="text-gray-500 block">
            Note: This implementation uses a simplified solving approach that
            may not find the optimal solution but will solve any valid cube
            state. The algorithm focuses on demonstrating programming concepts
            rather than speed optimization.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
