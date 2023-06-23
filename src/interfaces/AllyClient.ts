import { Client } from "discord.js";
import { Collection } from "@discordjs/collection";

export class AllyClient extends Client {
    public commands: Collection<string | undefined, any> = new Collection;
}