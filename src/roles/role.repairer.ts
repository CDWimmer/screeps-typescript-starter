import { BaseRole } from "./role.base";


export const RepairerTemplates = [
    [WORK, WORK, CARRY, MOVE, MOVE],
    [WORK, WORK, CARRY, MOVE],
    [WORK, CARRY, MOVE],
];

export class RepairerRole extends BaseRole{

    public override run(): void {

    }
}
