import { BaseRole } from "./role.base";


export const GuardTemplates = [
    [ATTACK, ATTACK, TOUGH, TOUGH, MOVE, MOVE],
    [ATTACK, TOUGH, TOUGH, MOVE],
    [ATTACK, TOUGH, MOVE],
];

export class GuardRole extends BaseRole{

    public override run(): void {
        console.log("Guard role not implemented!");
    }
}
