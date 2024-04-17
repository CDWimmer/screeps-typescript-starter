import { spawn } from "child_process";


function calc_body_cost(template: BodyPartConstant[]) {
    let cost = 0;
    template.forEach(body_part => {
        cost += BODYPART_COST[body_part];
    });
    return cost;
}

export function spawn_creep(spawn: StructureSpawn, roleName: string, templates: BodyPartConstant[][]) {
    const available_energy = spawn.room.energyAvailable
    templates.forEach(element => {
        if(calc_body_cost(element) < available_energy) {
            spawn.spawnCreep(element, element + (Math.floor(Math.random()*10000)).toString())
            return;
        }
    });
}
