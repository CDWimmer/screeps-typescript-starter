/// <reference path="screeps.d.ts">
const utils = require('./utils');

var roleDefender = {

    /** @param {Creep} creep **/
    run: function(creep) {
        enemy = creep.pos.findClosestByPath(FIND_HOSTILE_SPAWNS);
        if (enemy) {
            if (creep.attack(enemy) < 0) {
                creep.moveTo(enemy);
            }
        } else {
            utils.moveToNearestSpawn(creep);
        }
	}
};

module.exports = roleDefender;