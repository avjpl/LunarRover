const LunarRover = require('./LunarRover');
const MapGrid = require('./MapGrid');

describe('LunarRover', () => {
  describe('just deployed rover', () => {
    it('should have default values', () => {
      lunarRover = new LunarRover({});

      const expecting = {
        x: 0,
        y: 0,
        facing: 'N',
        instructions: '',
        compass: [ 'N', 'E', 'S', 'W' ],
        MapGrid: {},
        location: { x: 0, y: 0, facing: 0 }
      };

      expect(lunarRover.x).to.equal(0);
      expect(lunarRover.y).to.equal(0);
      expect(lunarRover.facing).to.equal('N');
      expect(lunarRover.instructions).to.equal('');
      expect(lunarRover.compass).to.deep.equal(['N', 'E', 'S', 'W']);
      expect(lunarRover.MapGrid).to.deep.equal({});
      expect(lunarRover.location).to.deep.equal({ x:0, y:0, facing: 0});
    });

    it('should call getDirection function', () => {
      sinon.spy(LunarRover.prototype, 'getDirection');
      const lunarRover = new LunarRover({});
      expect(lunarRover.getDirection.calledOnce).to.be.true;
    });
  });

  describe('executeInstructions method', () => {
    before(() => {
      sinon.spy(MapGrid.prototype, 'isWithInWorldBoundaries');
    });

    it('should throw an error if instructions are not less than 100 characters', () => {
      const lunarRover = new LunarRover({
        instructions: 'flrlrrfflrf'.repeat(10),
        MapGrid: {
          isWithInWorldBoundaries: sinon.stub()
        }
      });

      const fn = () => lunarRover.executeInstructions()

      expect(fn).to.throw();
    });

    it('should execute instructions', () => {
      const mapGrid = new MapGrid();
      const lunarRover = new LunarRover({
        instructions: 'rlf',
        MapGrid: mapGrid
      });

      expect(lunarRover.executeInstructions()).to.equal('0 1 N');
    });

    it('shoud throw error for invalid instruction(s)', () => {
      const mapGrid = new MapGrid();
      const lunarRover = new LunarRover({
        instructions: 'b',
        MapGrid: mapGrid
      });

      const fn = () => lunarRover.executeInstructions();
      expect(fn).to.throw();
    });

    describe('facing North', () => {
      it('should be facing West if a left turn is issued',  () => {
        const mapGrid = new MapGrid();
        const lunarRover = new LunarRover({
          instructions: 'l',
          MapGrid: mapGrid
        });

        expect(lunarRover.executeInstructions()).to.equal('0 0 W');
      });

      it('should be facing East if a right turn is issued',  () => {
        const mapGrid = new MapGrid();
        const lunarRover = new LunarRover({
          instructions: 'r',
          MapGrid: mapGrid
        });

        expect(lunarRover.executeInstructions()).to.equal('0 0 E');
      });
    });

    describe('facing East', () => {
      it('should be facing North if a left turn is issued',  () => {
        const mapGrid = new MapGrid();
        const lunarRover = new LunarRover({
          instructions: 'l',
          MapGrid: mapGrid,
          facing: 'E'
        });

        expect(lunarRover.executeInstructions()).to.equal('0 0 N');
      });

      it('should be facing South if a right turn is issued',  () => {
        const mapGrid = new MapGrid();
        const lunarRover = new LunarRover({
          instructions: 'r',
          MapGrid: mapGrid,
          facing: 'E'
        });

        expect(lunarRover.executeInstructions()).to.equal('0 0 S');
      });
    });

    describe('facing South', () => {
      it('should be facing East if a left turn is issued',  () => {
        const mapGrid = new MapGrid();
        const lunarRover = new LunarRover({
          instructions: 'l',
          MapGrid: mapGrid,
          facing: 'S'
        });

        expect(lunarRover.executeInstructions()).to.equal('0 0 E');
      });

      it('should be facing West if a right turn is issued',  () => {
        const mapGrid = new MapGrid();
        const lunarRover = new LunarRover({
          instructions: 'r',
          MapGrid: mapGrid,
          facing: 'S'
        });

        expect(lunarRover.executeInstructions()).to.equal('0 0 W');
      });
    });

    describe('facing West', () => {
      it('should be facing South if a left turn is issued',  () => {
        const mapGrid = new MapGrid();
        const lunarRover = new LunarRover({
          instructions: 'l',
          MapGrid: mapGrid,
          facing: 'W'
        });

        expect(lunarRover.executeInstructions()).to.equal('0 0 S');
      });

      it('should be facing North if a right turn is issued',  () => {
        const mapGrid = new MapGrid();
        const lunarRover = new LunarRover({
          instructions: 'r',
          MapGrid: mapGrid,
          facing: 'W'
        });

        expect(lunarRover.executeInstructions()).to.equal('0 0 N');
      });
    });

    describe('moving left and right', () => {
      it('should if facing East move in that direction', () => {
        const mapGrid = new MapGrid({ max: { x: 20, y: 20 } });
        const lunarRover = new LunarRover({
          x: 10,
          y: 10,
          instructions: 'ff',
          MapGrid: mapGrid,
          facing: 'E'
        });

        expect(lunarRover.executeInstructions()).to.equal('12 10 E');
      });

      it('should if facing West move in that direction', () => {
        const mapGrid = new MapGrid({ max: { x: 20, y: 20 } });
        const lunarRover = new LunarRover({
          x: 10,
          y: 10,
          instructions: 'ff',
          MapGrid: mapGrid,
          facing: 'W'
        });

        expect(lunarRover.executeInstructions()).to.equal('8 10 W');
      });
    });

    describe('moving up and down', () => {
      it('should if facing North move in that direction', () => {
        const mapGrid = new MapGrid({ max: { x: 20, y: 20 } });
        const lunarRover = new LunarRover({
          x: 10,
          y: 10,
          instructions: 'ff',
          MapGrid: mapGrid,
          facing: 'N'
        });

        expect(lunarRover.executeInstructions()).to.equal('10 12 N');
      });

      it('should if facing South move in that direction', () => {
        const mapGrid = new MapGrid({ max: { x: 20, y: 20 } });
        const lunarRover = new LunarRover({
          x: 10,
          y: 10,
          instructions: 'ff',
          MapGrid: mapGrid,
          facing: 'S'
        });

        expect(lunarRover.executeInstructions()).to.equal('10 8 S');
      });
    });

    it('should if facing South move in that direction', () => {
      const mapGrid = new MapGrid({ max: { x: 20, y: 20 } });
      const lunarRover = new LunarRover({
        x: 10,
        y: 15,
        instructions: 'ffffff',
        MapGrid: mapGrid,
        facing: 'N'
      });

      expect(lunarRover.executeInstructions()).to.equal('10 21 N LOST');
    });
  });

  describe('getDirection method', () => {
    it('should return alpha for direction facing',  () => {
      // const mapGrid = new MapGrid({ max: { x: 20, y: 20 } });
      const lunarRover = new LunarRover({
        MapGrid: {
          executeInstructions: sinon.stub()
        },
        facing: 'S'
      });

      expect(lunarRover.getDirection(true)).to.equal('S');
    });

    it('should return a number for direction facing',  () => {
      // const mapGrid = new MapGrid({ max: { x: 20, y: 20 } });
      const lunarRover = new LunarRover({
        MapGrid: {
          executeInstructions: sinon.stub()
        },
        facing: 'W'
      });

      expect(lunarRover.getDirection()).to.equal(3);
    });
  });

  describe('formatLocation method', () => {
    it('should format and print a rover location', () => {
      const lunarRover = new LunarRover({
        facing: 'E'
      });
      const location = { x: 20, y: 12, facing: 1 };

      expect(lunarRover.formatLocation(location)).to.equal('20 12 E');
    });

    it('should format and print a rover lost location', () => {
      const lunarRover = new LunarRover({
        facing: 'W'
      });
      const location = { x: 30, y: 1, facing: 1 };

      expect(lunarRover.formatLocation(location, true)).to.equal('30 1 W LOST');
    });
  });
});
