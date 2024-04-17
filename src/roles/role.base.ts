
export class BaseRole {
    creep: Creep;
    target: string;

    public constructor(creep: Creep) {
        this.creep = creep;
        this.target = creep.memory.targetId;
    }

    public run() {
        console.log("Run method in a role not overridden...");
    }

    public getNearestSpawn(has_free_space: boolean) {
        return this.creep.pos.findClosestByPath(
            FIND_MY_SPAWNS,
            { filter: (spn) => (!has_free_space || spn.store.getFreeCapacity(RESOURCE_ENERGY) > 0)}
        );
    }

    public moveToNearestSpawn(has_free_space: boolean) {
        let spn = this.getNearestSpawn(has_free_space);
        if (spn) {
            this.creep.moveTo(spn);
        }
    }

    public depositEnergy() {
        this.creep
    }

    public getNearestExtension(check_has_energy: boolean, check_energy_full: boolean)
    // todos:
    // get extension
    // get
}
