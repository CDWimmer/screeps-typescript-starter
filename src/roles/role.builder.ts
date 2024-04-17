import { BaseRole } from "./role.base";


export const BuilderTemplates = [
    [WORK, WORK, CARRY, MOVE, MOVE],
    [WORK, WORK, CARRY, MOVE],
    [WORK, CARRY, MOVE],
];

export class BuilderRole extends BaseRole{

    public override run(): void {

    }
}
