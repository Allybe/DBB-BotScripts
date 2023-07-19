import { PresenceStatusData, Partials, BitFieldResolvable, GatewayIntentsString } from "discord.js";

interface Config {
    token: string;
    prefix: string;
    applicationID: string;
    clientID: string;
    botName: string;
    botAuthor: string;

    status: PresenceStatusData;
    intents: BitFieldResolvable<GatewayIntentsString, number>;
    partials: Partials[];
    RESTVersion: string;
    production: boolean;
    guildID: string;
}

export const config: Config = {
    token: "token",
    prefix: "prefix",
    applicationID: "applicationID",
    clientID: "clientID",
    botName: "botName",
    botAuthor: "botAuthor",

    status: "online",
    intents: ["Guilds"],
    partials: [],
    RESTVersion: "9",
    production: false,
    guildID: "926369143186403329"
}