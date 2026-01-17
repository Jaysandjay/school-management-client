import type { GuardianRelationship } from './GuardianRelationship';

export interface StudentGuardian {
  studentId: number;
  guardianId: number;
  relationship: GuardianRelationship;
  isPrimary?: boolean;
}
