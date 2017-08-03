function LunarRover({
  x = 0,
  y = 0,
  facing = 'N',
  instructions = '',
  MapGrid = {}
}) {
  this.x = x;
  this.y = y;
  this.facing = facing;
  this.instructions = instructions;
  this.compass = ['N', 'E', 'S', 'W'];
  this.MapGrid = MapGrid;
  this.location = {
    x, y, facing: this.getDirection() || 0
  };
};

LunarRover.prototype.getDirection = function(alpha) {
  const index = this.compass.findIndex(point => point === this.facing);

  if (alpha) {
    return this.compass[index];
  }

  return index;
};

LunarRover.prototype.executeInstructions = function() {
  const instructions = this.instructions.split('');
  let lost = false;

  if (instructions.length >= 100) {
    throw new Error('Exceeded instruction length. Only 100 characters allowed');
  }

  instructions.forEach(instruction => {
    switch(instruction.toLowerCase()) {
      case 'l':
        this.orientation(-1);
      break;

      case 'r':
        this.orientation(1);
      break;

      case 'f':
        !this.move() ? lost = true : lost = false;
      break;

      default:
        throw new Error('invalid instruction')
    }
  });

  return this.formatLocation(this.location, lost);
};

LunarRover.prototype.formatLocation = function(location, lost) {
  return !lost
    ? `${ location.x } ${ location.y } ${ this.getDirection(true) }`
    : `${ location.x } ${ location.y } ${ this.getDirection(true) } LOST`
};

LunarRover.prototype.move = function() {
  switch(this.compass[this.location.facing].toLowerCase()) {
    case 'n':
      this.location.y = this.location.y + 1;
    break;

    case 'e':
      this.location.x = this.location.x + 1;
    break;

    case 's':
      this.location.y = this.location.y + -1;
    break;

    case 'w':
      this.location.x = this.location.x + -1;
    break;
  };

  return this.MapGrid.isWithInWorldBoundaries(this.location) ? true : false
}

LunarRover.prototype.orientation = function(deg) {
  this.location.facing += deg;

  if (this.location.facing > this.compass.length - 1) {
    this.location.facing = 0;
  }

  if (this.location.facing < 0) {
    this.location.facing = this.compass.length - 1;
  }

  this.facing = this.compass[this.location.facing];
};

module.exports = LunarRover;
