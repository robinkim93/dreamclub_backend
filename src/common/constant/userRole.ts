type TUserRoleMappingObj = {
  [key: string]: number;
};

export const USER_ROLE = {
  STAFF: "staff",
  PLAYER: "player",
  PARENT: "parent",
  ETC: "etc",
} as const;

export type userRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export const userRoleMappingObj: TUserRoleMappingObj = Object.values(
  USER_ROLE,
).reduce((acc, value, index) => {
  return { ...acc, [value]: index };
}, {});
