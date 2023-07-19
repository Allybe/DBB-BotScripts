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

/*export const config: Config = {
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
}*/

export const config: Config = {
    token: "MTEzMTIzNzM2ODA2Njc0MDMyNA.GmhXNp.QDL3j9SdZGRP98WIPzz0JlBqa6RC0ZXJeJzplE",
    prefix: "!",
    applicationID: "1131237368066740324",
    clientID: "1131237368066740324",
    botName: "TestBot",
    botAuthor: "Allison",

    status: "online",
    intents: ["Guilds"],
    partials: [],
    RESTVersion: "9",
    production: false,
    guildID: "926369143186403329"
}