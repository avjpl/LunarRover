var merge = require('lodash/merge');

function MapGrid(options) {
  this.default = {
    min: { x: 0, y: 0 },
    max: { x: 50, y: 50 },
  };

  this.boundaries = merge(this.default, options);
}

MapGrid.prototype.isWithInWorldBoundaries = function(location) {
  return (
    (
      location.x >= this.boundaries.min.x &&
      location.x <= this.boundaries.max.x
    ) &&
    (
      location.y >= this.boundaries.min.y &&
      location.y <= this.boundaries.max.y
    )
  );
}

module.exports = MapGrid;
