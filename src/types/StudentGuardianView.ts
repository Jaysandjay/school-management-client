import { GuardianRelationship } from "./GuardianRelationship";

export interface StudentGuardianView {
    studentId: number,
    guardianId: number,
    firstName: string,
    lastName: string,
    relationship: GuardianRelationship,
    isPrimary?: boolean
}