export const USER_ROLE = {
  STAFF: "staff",
  PLAYER: "player",
  PARENT: "parent",
  ETC: "etc",
} as const;

export type userRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
