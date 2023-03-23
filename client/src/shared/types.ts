export type Player = {
    socketID: string;
    customNick?: string;
};

export type PlayerRoles = "choosingNewColor" | "repeating" | "waiting";
