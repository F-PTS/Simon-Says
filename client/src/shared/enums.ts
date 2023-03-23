export const MoveColors = {
    Red: "Red",
    Green: "Green",
    Blue: "Blue",
    Yellow: "Yellow",
} as const;

export type MoveColors = keyof typeof MoveColors;

export const GameRoomState = {
    Loading: "Loading",
    Waiting: "Waiting",
    Playing: "Playing",
    Full: "Full",
    Left: "Left",
    Error: "Error",
} as const;

export type GameRoomState = keyof typeof GameRoomState;

export const GameResult = {
    Win: "Win",
    Lose: "Lose",
    Playing: "Playing",
} as const;

export type GameResult = keyof typeof GameResult;
