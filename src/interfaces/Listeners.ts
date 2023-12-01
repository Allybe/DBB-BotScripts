import {AllyClient} from "./AllyClient";
import {Awaitable, ClientEvents} from "discord.js";

export interface Listeners<Event extends keyof ClientEvents> {
    event: Event;
    purpose: String;
    run: (client: AllyClient, ...args: ClientEvents[Event]) => Awaitable<void>;
}