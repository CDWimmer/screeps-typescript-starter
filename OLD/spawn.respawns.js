/// <reference path="screeps.d.ts">
/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawn.respawns');
 * mod.thing == 'a thing'; // true
 */

var NUM_BUILDERS = 2;
var NUM_HARVESTERS = 6;
var NUM_UPGRADERS = 2;
var NUM_REPAIRER = 2;  // acts as basic harvester if no repairs to do
var NUM_HAULER = 1;
var NUM_DEFENDER = 1;

var BODY_BASIC = [MOVE, WORK, CARRY];
var BODY_HAULER_2 = [MOVE, CARRY];
var BODY_WORKER_4 = [MOVE, WORK, WORK, CARRY];
var BODY_WORKER_4_FAST = [MOVE, MOVE, WORK, CARRY];
var BODY_WORKER_5 = [MOVE, MOVE, WORK, WORK, CARRY];
var BODY_DEFENDER_4 = [MOVE, ATTACK, TOUGH, TOUGH];
// var body_costs = {
//     BODY_BASIC: 1,
//     BODY_WORKER_4: 1,
//     BODY_WORKER_5: 1
// }

// var BODY_BUILDER_1 = [MOVE, WORK, CARRY];
// [MOVE, WORK, WORK, CARRY]

spawnRespawns = {

    /** @param {Spawn} spawn **/
    run: function (spawn) {

        // harvesters
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        if (harvesters.length < NUM_HARVESTERS) {
            var newName = 'Harvester' + Game.time;
            if (spawn.room.energyAvailable < 300) {
                spawn.spawnCreep(BODY_BASIC, newName,
                    { memory: { role: 'harvester' } });
            } else {
                spawn.spawnCreep(BODY_WORKER_4, newName,
                    { memory: { role: 'harvester' } });
            }
        }
        if (NUM_HARVESTERS - harvesters.length > 2) {
            return;  // do nothing else, only make harvesters >:(
        }
        // builders
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        if (builders.length < NUM_BUILDERS) {
            var newName = 'Builder' + Game.time;
            spawn.spawnCreep(BODY_BASIC, newName,
                { memory: { role: 'builder' } });
        }

        // upgraders
        var type_name = "upgrader";
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == type_name);
        if (upgraders.length < NUM_UPGRADERS) {
            var newName = type_name + Game.time;
            spawn.spawnCreep(BODY_WORKER_4, newName,
                { memory: { role: type_name } });
        }
        
        // repairer
        var type_name = "repairer"
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == type_name);
        if (upgraders.length < NUM_REPAIRER) {
            var newName = type_name + Game.time;
            spawn.spawnCreep(BODY_BASIC, newName,
                { memory: { role: type_name } });
        }

        // hauler
        var type_name = "hauler"
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == type_name);
        if (upgraders.length < NUM_HAULER) {
            var newName = type_name + Game.time;
            spawn.spawnCreep(BODY_HAULER_2, newName,
                { memory: { role: type_name } });
        }

        // hauler
        var type_name = "defender"
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == type_name);
        if (upgraders.length < NUM_DEFENDER) {
            var newName = type_name + Game.time;
            spawn.spawnCreep(BODY_DEFENDER_4, newName,
                { memory: { role: type_name } });
        }
    }
};

module.exports = spawnRespawns;