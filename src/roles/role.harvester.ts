import { BaseRole } from "./role.base";


export const HarvesterTemplates = [
    [WORK, WORK, WORK, CARRY, MOVE],
    [WORK, WORK, CARRY, MOVE],
    [WORK, CARRY, MOVE],
];

export class HarvesterRole extends BaseRole{

    public override run(): void {
        if(!this.creep.memory.working && this.creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
            this.creep.memory.working = true;
            delete this.creep.memory.targetId;
            this.creep.say("Harvest");
        }else if(this.creep.memory.working && this.creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
            this.creep.memory.working = false;
            delete this.creep.memory.targetId;
            this.creep.say("Deposit");
        }

        if(!this.creep.memory.working){
            if(!this.depositEnergy())
            if(!this.supplyEnergy())
                this.build()

        }else{
            this.harvestEnergy();
        }
    }
}
