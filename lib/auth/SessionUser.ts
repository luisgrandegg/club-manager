import { UserRole } from "./roles";

export type SessionUser = {
  id: string;
  role: UserRole;
  name?: string | null;
  email?: string | null;
  picture?: string | null;
};
