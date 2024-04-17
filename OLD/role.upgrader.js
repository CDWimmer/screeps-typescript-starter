/// <reference path="screeps.d.ts">
const utils = require('./utils');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            // find the nearest storage/container or fallback to a source. 
            var supply = utils.getNearestEnergyStorage(creep, true, false);
            // creep.say(supply.pos.x + "," + supply.pos.y);
            if(!supply) {
                creep.say("Harvesting")
                supply = utils.getNearestEnergySource(creep);
            }
            utils.fetchFromEnergySupply(creep, supply);
        }
	}
};

module.exports = roleUpgrader;