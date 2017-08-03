const MapGrid = require('./MapGrid');

describe('MapGrid', () => {
  describe('grid layout', () => {
    it('should produce a defualt grid size', () => {
      mapGrid = new MapGrid;

      const expecting = {
        min: { x: 0, y: 0 },
        max: { x: 50, y: 50}
      }

      expect(mapGrid.boundaries).to.deep.equal(expecting);
    });

    it('should produce a specific grid size', () => {
      const options = { max: { x: 25, y: 25} };
      mapGrid = new MapGrid(options);

      const expecting = {
        min: { x: 0, y: 0 },
        max: { x: 25, y: 25 }
      }

      expect(mapGrid.boundaries).to.deep.equal(expecting);
    });
  });

  describe('grid boundaries', () => {
    let mapGrid;

    beforeEach(() => {
      mapGrid = new MapGrid();
    });

    it('should report if rover is within grid bounds and return true', () => {
      const location = { x: 25, y: 20, facing: 'N' };
      expect(mapGrid.isWithInWorldBoundaries(location)).to.be.true;
    });

    it('should report if rover is out of grid bounds and return false', () => {
      const location = { x: 25, y: 51, facing: 'N' };
      expect(mapGrid.isWithInWorldBoundaries(location)).to.be.false;
    });
  });
});
