/// <reference path="screeps.d.ts">


/** @param {Creep} creep **/
function moveToNearestSpawn(creep) {
    var target = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
    creep.moveTo(target);
}


/** @param {Creep} creep **/
function getNearestEnergySupply(creep) {
    var nat_source = creep.pos.findClosestByPath(FIND_SOURCES);
    var container = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: (struct) => {
            return (
                struct.structureType == STRUCTURE_CONTAINER &&
                struct.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
        }
    });
    var dropped_energy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
    if (nat_source == null && container == null) {
        creep.say("No ⚡!");
        return -1;
    }
    var ideal_source = nat_source;
    if (container != null && (creep.room.findPath(creep.pos, container.pos).length < creep.room.findPath(creep.pos, ideal_source.pos))) {
        ideal_source = container;
    }
    if (dropped_energy != null && (creep.room.findPath(creep.pos, dropped_energy.pos).length < creep.room.findPath(creep.pos, ideal_source.pos))) {
        ideal_source = dropped_energy;
    }
    return ideal_source;
}

/** @param {Creep} creep **/
function moveToNearestEnergySource(creep) {
    nearest_energy = getNearestEnergySupply(creep);
    creep.moveTo(nearest_energy);
}

/** @param {Creep} creep **/
function moveToOrHarvestNearestEnergySource(creep, allowedTypes = [Source, StructureContainer, StructureStorage, Resource]) {
    var best_source = getNearestEnergySupply(creep, allowedTypes);

    if (
        (best_source instanceof Source && creep.harvest(best_source) == ERR_NOT_IN_RANGE) ||
        ((best_source instanceof StructureContainer || best_source instanceof StructureStorage) && creep.withdraw(best_source) == ERR_NOT_IN_RANGE) ||
        (best_source instanceof Resource && creep.pickup(best_source) == ERR_NOT_IN_RANGE)
    ) { creep.moveTo(best_source, { visualizePathStyle: { stroke: '#ffaa00' } }); }
}


// NEW FUNCTIONS

/**
 *  @param {Creep} creep 
 *  @param {boolean} has_content 
 *  @returns {StructureContainer | StructureStorage | null}
 * **/
function getNearestEnergyStorage(creep, check_has_energy = true, check_has_free_space = false) {

    var container_or_store = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (struct) => {
            return (
                (struct.structureType == STRUCTURE_CONTAINER || struct.structureType == STRUCTURE_STORAGE) &&
                ((!check_has_energy || struct.store.getUsedCapacity(RESOURCE_ENERGY) > 0) &&
                (!check_has_free_space || struct.store.getFreeCapacity(RESOURCE_ENERGY) > 0))
            ); 
        }
    });
    return container_or_store;
}

/**
 * @param {Creep} creep 
 */
function getNearestDroppedEnergy(creep) {
    var dropped_resources = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {filter: (resource) => resource.resourceType == RESOURCE_ENERGY});
    return dropped_resources;
}

/**
 * @param {Creep} creep 
 * @returns {Source}
 */
function getNearestEnergySource(creep) {
    var nat_source = creep.pos.findClosestByPath(FIND_SOURCES);
    return nat_source;
}

/**
 * Generic function for fetching energy from an energy-containing object.
 * @param {Creep} creep 
 * @param {StructureContainer | StructureStorage | Source | Resource} supply 
 */
function fetchFromEnergySupply(creep, supply) {
    // creep.say(supply.pos.x + "," + supply.pos.y);
    if (
        (supply instanceof Source && creep.harvest(supply) == ERR_NOT_IN_RANGE) ||
        ((supply instanceof StructureContainer || supply instanceof StructureStorage) && creep.withdraw(supply, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) ||
        (supply instanceof Resource && creep.pickup(supply) == ERR_NOT_IN_RANGE)
    ) { 
        r = creep.moveTo(supply, { visualizePathStyle: { stroke: '#ffaa00' } }); 
        // console.log(r)
    }
}

/**
 * Generic function for putting energy into a storage structure.
 * @param {Creep} creep 
 * @param {StructureContainer | StructureStorage | Spawn | Extension} storage 
 */
function putIntoEnergyStorage(creep, storage) {
    if (creep.transfer(storage, RESOURCE_ENERGY) < 0) {
        creep.moveTo(storage);
    }
}

/**
 *  @param {Creep} creep 
 *  @param {boolean} check_has_free_space 
 *  @returns {Spawn}
 * **/
function getNearestSpawn(creep, check_has_free_space = false) {
    spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS, {filter: (spn) => {return (!check_has_free_space || spn.store.getFreeCapacity(RESOURCE_ENERGY) > 0)}});
    return spawn;
}

/**
 *  @param {Creep} creep 
 *  @param {boolean} check_has_free_space 
 *  @returns {Spawn}
 * **/
function getNearestExtension(creep, check_has_free_space = false) {

    return creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: (struct) => {return ((struct instanceof StructureExtension) && (!check_has_free_space || struct.store.getFreeCapacity > 0))}});
}

module.exports = { moveToNearestSpawn, getNearestEnergySource: getNearestEnergySupply, moveToNearestEnergySource, getNearestSpawn, moveToOrHarvestNearestEnergySource,
getNearestEnergySource, getNearestEnergyStorage, fetchFromEnergySupply, getNearestDroppedEnergy, getNearestExtension, putIntoEnergyStorage
}