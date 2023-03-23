export const MoveColors = {
    Red: "Red",
    Green: "Green",
    Blue: "Blue",
    Yellow: "Yellow",
} as const;

export type MoveColors = keyof typeof MoveColors;

export const PlayerRoles = {
    playing: "playing",
    waiting: "waiting",
} as const;

export type PlayerRoles = keyof typeof PlayerRoles;
