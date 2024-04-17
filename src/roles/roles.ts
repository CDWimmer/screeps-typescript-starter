import { BaseRole } from "./role.base";

import { HarvesterRole, HarvesterTemplates } from "./role.harvester";
import { BuilderRole, BuilderTemplates } from "./role.builder";
import { UpgraderRole, UpgraderTemplates } from "./role.upgrader";
import { RepairerRole, RepairerTemplates } from "./role.repairer";
import { HaulerRole, HaulerTemplates } from "./role.hauler";

export interface RoleInfo{
    roleClass: typeof BaseRole,
    templates: BodyPartConstant[][],
    defaultLimit: number
}


export const roles: {[roleName: string]: RoleInfo}= {
    harvester: {
        roleClass: HarvesterRole,
        templates: HarvesterTemplates,
        defaultLimit: 1,
    },
    builder: {
        roleClass: BuilderRole,
        templates: BuilderTemplates,
        defaultLimit: 1
    },
    upgrader: {
        roleClass: UpgraderRole,
        templates: UpgraderTemplates,
        defaultLimit: 1
    },
    repairer: {
        roleClass: RepairerRole,
        templates: RepairerTemplates,
        defaultLimit: 1
    },
    rangedGuard: {
        roleClass: RangedGuardRole,
        templates: RangedGuardTemplates,
        defaultLimit: 0
    },
    hauler: {
        roleClass: HaulerRole,
        templates: HaulerTemplates,
        defaultLimit: 0
    },
}
