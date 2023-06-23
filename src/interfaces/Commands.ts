import { AllyClient } from "./AllyClient";
import { Message } from "discord.js";

export interface ChatCommand {
    name: string;
    description: string;
    args?: Map<string, boolean>;
    run: (client: AllyClient, message: Message, args: Array<string>) => void;
}