import {Listeners} from "../../../interfaces/Listeners";
import {AllyClient} from "../../../interfaces/AllyClient";

export const Listener: Listeners = {
    event: "guildMemberAdd",
    purpose: "Welcome message",
    run(client: AllyClient, listener: any): void {

    }
};