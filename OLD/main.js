/// <reference path="screeps.d.ts">
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleHauler = require('role.hauler');
var roleDefender = require('role.defender');
var spawnRespawns = require('spawn.respawns');
var towerActions = require('tower');

var utils = require('utils');
var path_utils = require('path_utils');


module.exports.loop = function () {

    // wipe old memories
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            { align: 'left', opacity: 0.8 });
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        } else
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        } else
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        } else
        if (creep.memory.role == "repairer") {
            roleRepairer.run(creep);
        } else
        if (creep.memory.role == "hauler") {
            roleHauler.run(creep);
        }
        if (creep.memory.role == "defender") {
            roleDefender.run(creep);
        }
    }

    // for all my spawns
    for (var name in Game.spawns) {
        var spawn = Game.spawns[name];
        spawnRespawns.run(spawn);
        // if (spawn.room.find(FIND_MY_CONSTRUCTION_SITES).length < 5) {  // todo auto build paths to sources ocasionally! 
        //     path_utils
        // }
    }

    for (var name in Game.structures) {
        var struct = Game.structures[name];
        if (struct.structureType == 'STRUCTURE_TOWER') {
            towerActions.run(struct)
        }
    }
    // kill a bunch of dudes
    // for (var name in Game.creeps) {
    // var creep = Game.creeps[name];
    // if (creep.memory.role == 'builer') {
    //     creep.suicide();
    // }}
}