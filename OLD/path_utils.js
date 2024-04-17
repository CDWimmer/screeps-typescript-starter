/// <reference path="screeps.d.ts">
const utils = require('./utils');

/**
 * @param {RoomPosition} A 
 * @param {RoomPosition} B 
 */
function getPathFromAToB(A, B) {
    r = PathFinder.search(A, B);
    if (r["incomplete"]) {
        console.log("Incomplete path from spawn!");
    }
    return r["path"];
}

/**
 * 
 * @param {PathStep[]} path 
 */
function buildRoadsOnPath(path) {
    path.forEach(element => {
        element.createConstructionSite(STRUCTURE_ROAD);
    });
}

/**
 * @param {RoomPosition} A 
 * @param {RoomPosition} B 
 * @param {boolean} ignoreIncomplete 
 */
function buildRoadsBetween(A, B, ignoreIncomplete = true) {
    r = PathFinder.search(A, B);
    if (r.incomplete && !ignoreIncomplete) {
        return -1;
    } else {
        r.path.forEach(element => {
            element.createConstructionSite(STRUCTURE_ROAD);
        });
    }
}

module.exports = { getPathFromAToB, buildRoadsOnPath, buildRoadsBetween };

// A = Game.getObjectById("ebdd0774017409d"); B = Game.getObjectById("bcd207740170d6a"); require('path_utils').buildPathBetween(A.pos, B.pos);