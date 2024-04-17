import { ErrorMapper } from "utils/ErrorMapper";

import { roles } from "roles/roles";
import { spawn_creep } from "utils/utils";

import { HarvesterRole } from "roles/role.harvester";


declare global {
  /*
    Example types, expand on these or remove them and add your own.
    Note: Values, properties defined here do no fully *exist* by this type definiton alone.
          You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

    Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
    Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
  */
  // Memory extension samples
  interface Memory {
    uuid: number;
    log: any;
  }

  interface CreepMemory {
    role: string;
    room: string;
    working: boolean;
    targetId?: string;
  }

  // Syntax for adding proprties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      log: any;
    }
  }
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  for (let creepName in Game.creeps) {
    let creep = Game.creeps[creepName];
    let role = roles[creep.memory.role]?.roleClass;
    if (role === undefined) {
      // creep.suicide();
      continue;
    }
    let creepRole = new role(creep);
    creepRole.run();
  }

  if (Game.spawns['Spawn1'].spawning) {
    var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    Game.spawns['Spawn1'].room.visual.text(
        '🛠️' + spawningCreep.memory.role,
        Game.spawns['Spawn1'].pos.x + 1,
        Game.spawns['Spawn1'].pos.y,
        { align: 'left', opacity: 0.8 });
}

  // spawn creeps
  for (let roleName in roles) {
    if (Memory.roleLimits[roleName] === undefined) Memory.roleLimits[roleName] = roles[roleName].defaultLimit;
    let roleLimit = Memory.roleLimits[roleName]
    let roleCount = _.filter(Game.creeps, (creep: Creep) => creep.memory.role == roleName).length;
    if (roleCount < roleLimit) {
      spawn_creep(Game.spawns["Spawn1"], roleName, roles[roleName].templates)
      continue;
    }
  }
});
