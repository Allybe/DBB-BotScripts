import {AllyClient} from "./AllyClient";

export interface Listeners {
    event: String;
    purpose: String;
    run: (client: AllyClient, listener: any) => void;
}