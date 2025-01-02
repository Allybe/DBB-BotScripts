import {REST, Routes} from 'discord.js';
import { config } from "./config.js"; // Not ready to do this yet
import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
dotenv.config({path: path.join(__dirname, '..', '.env')});


const commands = [];
const commandsDirectory = path.join(__dirname, "commands");

const filterNonJsFiles = (items: string[]) => {
    return items.filter((files) => files.split(".").pop() === "js");
};

if (!fs.existsSync(commandsDirectory)) {
    fs.mkdirSync(commandsDirectory);
}

const items = fs.readdirSync(commandsDirectory);
const baseFiles = filterNonJsFiles(items);
const folders = items.filter((files: string) => files.split(".").pop() != "js");

for (const baseFile of baseFiles) {
    let properties = require(path.join(commandsDirectory, baseFile));
    commands.push(properties.SlashCommand.command.toJSON());
}

for (const folderName of folders) {
    const folderItems = fs.readdirSync(path.join(commandsDirectory, folderName));
    const files = filterNonJsFiles(folderItems);
    for (const file of files) {
        let properties = require(path.join(commandsDirectory, folderName, file));
        commands.push(properties.SlashCommand.command.toJSON());
    }
}

const rest = new REST().setToken(process.env.BOT_TOKEN);

try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);
    const data = rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, "926369143186403329"),
        { body: commands },
    );
    console.log(`Successfully reloaded ${commands.length} application (/) commands.`);
} catch (error) {
    console.error(error);
}