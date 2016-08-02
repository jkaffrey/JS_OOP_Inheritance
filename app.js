'use strict';

var Vehicle = function(name, nPass, mSpeed) {

  this.name = name;
  this.nPass = new Array(nPass).fill('');
  this.mSpeed = mSpeed;
  this.distanceTraveled = 0;
  this.isTraveling = false;
};

Vehicle.prototype.loadPassenger =  function(name) {

  for (var i = 0; i < this.nPass.length; i++) {
    if (this.nPass[i] === '') {

      this.nPass[i] = name;
      break;
    }
  }
};

Vehicle.prototype.getPassengers = function() {

  return this.nPass;
};

Vehicle.prototype.getSpeed = function() {

  return this.mSpeed;
};

Vehicle.prototype.travel = function(time, newSpeed) {

  this.isTraveling = true;
  if (arguments.length === 2) this.mSpeed = (+arguments[1]);
  this.distanceTraveled = (+arguments[0]) * (arguments.length === 2 ? (+arguments[1]) : this.mSpeed);
  return this.distanceTraveled;
};

Vehicle.prototype.stop = function() {

  this.isTraveling = false;
};

var Bicycle = function(gears) {

  Vehicle.call(this, 'Bicycle', 1, 2);
  this.cGear = 0;
  this.mGear = gears;
};

Bicycle.prototype = Object.create(Vehicle.prototype);
Bicycle.prototype.constructor = Bicycle;

Bicycle.prototype.upShift = function() {

  if (this.isTraveling && this.cGear < this.mGear) {

    this.mSpeed += 2;
    this.cGear++;
  }
};

Bicycle.prototype.downShift = function() {

  if (this.isTraveling && this.cGear > 0) {

    this.mSpeed -= 2;
    this.cGear--;
  }
};

var Wagon = function(colour, pulledBy) {

  Vehicle.call(this, 'Wagon', 2, 1);
  this.pulledBy = pulledBy;
  this.isCrashed = false;
  this.colour = colour;
};

Wagon.prototype = Object.create(Vehicle.prototype);
Wagon.prototype.constructor = Wagon;

Wagon.prototype.travel = function() {

  if (this.isCrashed) {

    console.log('The little', this.colour ,'wagon has crashed and is now broken.');
    return;
  }

  this.pulledBy.travel(1);
  this.isTraveling = true;
  if (this.pulledBy)
    this.mSpeed = this.pulledBy.getSpeed();

  if (this.mSpeed > 5) {

    this.isCrashed = true;
    this.pulledBy.stop();
    this.stop();
    console.log('The wagon has crashed');
  }
};

module.exports = {

  Vehicle: Vehicle,
  Bicycle: Bicycle,
  Wagon: Wagon
};
