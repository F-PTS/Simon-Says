export type Player = {
    socketID: string;
    customNick?: string;
};

export const PlayerRoles = {
    playing: "playing",
    waiting: "waiting",
} as const;

export type PlayerRoles = keyof typeof PlayerRoles;
