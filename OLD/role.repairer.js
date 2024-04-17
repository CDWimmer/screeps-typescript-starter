/// <reference path="screeps.d.ts">
const utils = require('./utils');

HIGH_PRIORITY_CONSTRUCTION = []

// var source_target_id = 1;
var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // memory update
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 fixin\'');
	    }

        // actions
	    if(creep.memory.building) {
            // repair mode
	        var targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => structure.hits < structure.hitsMax});
            if(targets.length) {
                targets.sort((a, b) => a.hits - b.hits);
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.say("on way");
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                // creep.say("zzzz");
                if (creep.transfer(utils.getNearestSpawn(creep), RESOURCE_ENERGY) < 0) {  // if any error
                    utils.moveToNearestSpawn(creep);
                }
            }
	    }
	    else {
            // not repair mode
            creep.say("zucc");
			// find some energy!
	        var source = utils.getNearestEnergyStorage(creep, true, false);
            if (!source) {
                var source = utils.getNearestEnergySource(creep);
            }
            utils.fetchFromEnergySupply(creep, source);

	    }
	}
};

module.exports = roleRepairer;