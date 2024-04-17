/// <reference path="screeps.d.ts">
const utils = require('./utils');

var roleHauler = {

    /**
     @param {Creep} creep
     */
    run: function(creep) {
        creep.say("awooga")
        if (creep.store.getFreeCapacity() > 0) {
            // go collect energy! 
            var supply = utils.getNearestDroppedEnergy(creep);
            if (supply) {
                utils.fetchFromEnergySupply(creep, supply);
                return;
            } else {
                var source = utils.getNearestEnergyStorage(creep, true, false);
                utils.fetchFromEnergySupply(creep, source);
            }
        } else {
            // drop stuff off at spawn or an extension!
            target = utils.getNearestSpawn(creep, true);
            if (!target) {
                target = utils.getNearestExtension(creep, true);
            }
            if (target) {
                utils.putIntoEnergyStorage(creep, target);
            }
            creep.say(target)
        }
    }
}
//     /** @param {Creep} creep **/
//     run: function(creep) {
    
//         if(creep.memory.hauling && creep.store[RESOURCE_ENERGY] == 0) {
//             creep.memory.hauling = false;
//             creep.say("1")
//             // creep.say('🔄 collecting');
// 	    }
// 	    if(!creep.memory.hauling && creep.store.getFreeCapacity() == 0) {
// 	        creep.memory.hauling = true;
// 	        creep.say('⚡ hauling');
// 	    } else

// 	    if(creep.memory.hauling) {
//             spawn = utils.getNearestSpawn(creep);
//             if(creep.transfer(spawn) == ERR_NOT_IN_RANGE) {
//                 creep.moveTo(spawn, {visualizePathStyle: {stroke: '#FFFF00'}});
//             }
//         }

//         // if (dropped_resources != null) {
//         //     // pick up dropped resources!
//         //     if (creep.pickup(dropped_resources) == ERR_NOT_IN_RANGE) {
//         //         creep.say("🔼 Collect")
//         //         creep.moveTo(dropped_resources, { visualizePathStyle: { stroke: '#3333ff' } });
//         //     }

//         else {
//             // var dropped_energy = utils
//             var supply = utils.getNearestEnergyStorage(creep, true, false);
//             if(!supply) {
//                 creep.say("bollocks!")
//                 supply = utils.getNearestEnergySource(creep);
//             }
//             utils.getFromEnergySupply(creep, supply);
//         }
// 	}
// };

module.exports = roleHauler;