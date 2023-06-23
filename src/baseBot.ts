import { AllyClient } from "./interfaces/AllyClient.js";
import { config } from "./config.js"; // Not ready to do this yet 

import { GatewayIntentBits, Partials, Collection } from "discord.js";
import * as fs from "fs";

const client = new AllyClient({
    intents: config.intents as GatewayIntentBits[],
    partials: config.partials as Partials[],
});

client.commands = new Collection();

fs.readdir("./dist/commands", async (err: NodeJS.ErrnoException | null, files: string[]) => {
    if (err) throw err;
    var fileName = files.filter((files) => files.split(".").pop() === "js");
    console.log("Started loading commands into memory");

    //Add commands to the collection
    await fileName.forEach((fileName, index, array) => {
        import(`./commands/${fileName}`).then((properties) => {
            let commandName = properties.SlashCommand.name.toLowerCase();

            client.commands.set(commandName, properties.SlashCommand);

            console.log(`${fileName} command loaded`);

            if (index === array.length - 1) {
                console.log("Successfully loaded all commands to memory");
            }
        });
    });
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});

client.login();
