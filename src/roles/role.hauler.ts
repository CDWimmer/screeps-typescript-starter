import { BaseRole } from "./role.base";


export const HaulerTemplates = [
    // [CARRY, CARRY, MOVE, MOVE],
    [MOVE, CARRY],
];

export class HaulerRole extends BaseRole{

    public override run(): void {

    }
}
