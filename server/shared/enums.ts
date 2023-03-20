export const MoveColors = {
    Red: "Red",
    Green: "Green",
    Blue: "Blue",
    Yellow: "Yellow",
} as const;

export type MoveColors = keyof typeof MoveColors;
