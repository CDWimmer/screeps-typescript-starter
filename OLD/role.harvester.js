/// <reference path="screeps.d.ts">
const utils = require('./utils');

var roleHarvester = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.store.getFreeCapacity() > 0) {
            // go harvest a source! 
            var source = utils.getNearestEnergySource(creep);
            utils.fetchFromEnergySupply(creep, source);
        }
        else {
            // go put it away somewhere!
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER ||
                        structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (targets.length > 0) {

                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                utils.moveToNearestSpawn(creep);
            }
        }
    }
};

module.exports = roleHarvester;
