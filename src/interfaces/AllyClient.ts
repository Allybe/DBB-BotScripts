import { Client } from "discord.js";
import { Collection } from "@discordjs/collection";
import { Command } from "./Commands";

export class AllyClient extends Client {
    public commands: Collection<String, Command> = new Collection;
}