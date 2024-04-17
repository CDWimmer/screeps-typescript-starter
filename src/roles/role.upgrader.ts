import { BaseRole } from "./role.base";


export const UpgraderTemplates = [
    [WORK, WORK, CARRY, MOVE, MOVE],
    [WORK, WORK, CARRY, MOVE],
    [WORK, CARRY, MOVE],
];

export class UpgraderRole extends BaseRole{

    public override run(): void {

    }
}
