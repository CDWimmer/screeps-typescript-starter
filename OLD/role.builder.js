/// <reference path="screeps.d.ts">
const utils = require('./utils');

function buildOrMoveToBuildSite(creep, build_site) {

}

// var source_target_id = 1;
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
		if (!Game.getObjectById(creep.memory.building_target)) {
			delete creep.memory.building_target;
			creep.say("honk")
          var build_sites = creep.room.find(FIND_CONSTRUCTION_SITES)
          if(build_sites[0]) {
            creep.memory.building_target = build_sites[0].id;
            } else {
              creep.say("no bsites");
          }

			
		
          }
          
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
			
	    }
	    if(creep.memory.building) {
	        var target = Game.getObjectById(creep.memory.building_target);
			if(creep.build(target) == ERR_NOT_IN_RANGE) {
				creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
			}
	    }
	    else {
			// find some energy!
			utils.moveToOrHarvestNearestEnergySource(creep);
	    }
	}
}

module.exports = roleBuilder;