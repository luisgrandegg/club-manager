export enum UserRole {
  ADMIN = "admin",
  CLUB_ADMIN = "club_admin",
  SECTION_ADMIN = "section_admin",
  COACH = "coach",
  MEMBER = "member",
  PARENT = "parent",
}

export const DEFAULT_SIGN_UP_ROLE = UserRole.CLUB_ADMIN;

export function isValidRole(value: string): value is UserRole {
  return Object.values(UserRole).includes(value as UserRole);
}

export function isInternalRole(role: UserRole) {
  return role === UserRole.ADMIN;
}

export function canManageWholeClub(role: UserRole) {
  return role === UserRole.ADMIN || role === UserRole.CLUB_ADMIN;
}
