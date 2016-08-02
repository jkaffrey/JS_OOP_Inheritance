'use strict';

var VInfo = require('../../app');

describe('Vehicle', function() {

  it('Basic vehicle functions', function() {

    var vehicle = new VInfo.Vehicle('Toyota', 5, 25);
    expect(vehicle.getSpeed()).toEqual(25);
    expect(vehicle.getPassengers().length).toEqual(5);
    expect(vehicle.getPassengers()).toEqual(['','','','','']);
  });

  it('Load passengers into a vehicle', function() {

    var vehicle = new VInfo.Vehicle('Toyota', 5, 25);

    vehicle.loadPassenger('Bill');
    expect(vehicle.getPassengers()).toEqual(['Bill','','','','']);

    vehicle.loadPassenger('Thomas');
    vehicle.loadPassenger('Steve');
    vehicle.loadPassenger('Roger');
    vehicle.loadPassenger('Val');
    vehicle.loadPassenger('Logan');
    expect(vehicle.getPassengers()).toEqual(['Bill','Thomas','Steve','Roger','Val']);
  });

  var vehicle = new VInfo.Vehicle('Toyota', 5, 25);
  it('Vehicle can travel, with default speed', function() {

    expect(vehicle.travel(1)).toEqual(25);
    expect(vehicle.isTraveling).toEqual(true);
    vehicle.stop();
  });

  it('Vehicle can travel, and change speed', function() {

    vehicle.travel(1, 50);
    expect(vehicle.getSpeed()).toEqual(50);
    expect(vehicle.isTraveling).toEqual(true);
  });

  it('Vehicle can stop', function() {

    vehicle.stop();
    expect(vehicle.isTraveling).toEqual(false);
  });
});

describe('Bicycle', function() {

  it('Basic bicycle functions', function() {

    var bicycle = new VInfo.Bicycle(3);
    expect(bicycle.getSpeed()).toEqual(2);
    expect(bicycle.getPassengers()).toEqual(['']);
  });

  it('Bicycle shifts only when traveling', function() {

    var bicycle = new VInfo.Bicycle(5);
    bicycle.upShift();
    expect(bicycle.getSpeed()).toEqual(2);
    expect(bicycle.isTraveling).toEqual(false);

    bicycle.travel(1);
    bicycle.upShift();
    bicycle.upShift();
    expect(bicycle.getSpeed()).toEqual(6);
    expect(bicycle.isTraveling).toEqual(true);

    bicycle.downShift();
    expect(bicycle.getSpeed()).toEqual(4);

    bicycle.stop();
    bicycle.downShift();
    expect(bicycle.getSpeed()).toEqual(4);

  });
});

describe('Wagon', function() {

  it('Basic wagon functions', function() {

    var bicycle = new VInfo.Bicycle(3);
    var wagon = new VInfo.Wagon('blue', bicycle);
    expect(wagon.getSpeed()).toEqual(1);
    expect(wagon.getPassengers()).toEqual(['','']);
  });

  it('Basic wagon travel', function() {

    var bicycle = new VInfo.Bicycle(5);
    var wagon = new VInfo.Wagon('blue', bicycle);
    wagon.travel();
    expect(wagon.getSpeed()).toEqual(2);

    wagon.stop();
    bicycle.travel();
    bicycle.upShift();
    bicycle.upShift();
    bicycle.upShift();
    wagon.travel();
    expect(wagon.isCrashed).toEqual(true);
    expect(wagon.isTraveling).toEqual(false);
    wagon.travel();
    expect(wagon.isTraveling).toEqual(false);
  });
});
