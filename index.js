const MapGrid = require('./src/MapGrid');
const LunarRover = require('./src/LunarRover');

const lunarRover = [
  new LunarRover({
    x: 1, y: 1, facing: 'E', instructions: 'RFRFRFRF', MapGrid: new MapGrid()
  }),
  new LunarRover({
    x: 3, y: 2, facing: 'N', instructions: 'FRRFLLFFRRFLL', MapGrid: new MapGrid()
  }),
  new LunarRover({
    x: 0, y: 3, facing: 'W', instructions: 'LLFFFLFLFL', MapGrid: new MapGrid()
  }),
  new LunarRover({
    x: 5, y: 5, instructions: 'ffffff', MapGrid: new MapGrid({
      max: { x: 10, y: 10 }
    })
  }),
];

lunarRover.forEach(rover => {
  console.log(`${ rover.executeInstructions() }`);
});
