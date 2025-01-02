import { AllyClient } from "./interfaces/AllyClient.js";
import { config } from "./config.js"; // Not ready to do this yet
import dotenv from "dotenv";
dotenv.config()


import {
    GatewayIntentBits,
    Partials,
    Collection,
    Interaction
} from "discord.js";
import * as fs from "fs";
import { Sequelize } from "sequelize";
import {Listeners} from "./interfaces/Listeners";
import path from "path";
import {errorHandler} from "./utility/ErrorHandling";

const client = new AllyClient({
  intents: config.intents as GatewayIntentBits[],
  partials: config.partials as Partials[],
});

client.commands = new Collection();
client.DB = new Sequelize('sqlite::memory');

const commandsDirectory = path.join(__dirname, "commands");
if (!fs.existsSync(commandsDirectory)) {
    fs.mkdirSync(commandsDirectory);
}

fs.readdir(commandsDirectory, async (err: NodeJS.ErrnoException | null, items: string[]) => {
    if (err) throw err;
    const baseFiles = filterNonJsFiles(items);
    const folders = items.filter((files) => files.split(".").pop() != "js");

    loadCommands(baseFiles, commandsDirectory);

    folders.forEach((folderName) => {
      fs.readdir(path.join(commandsDirectory, folderName), async (err: NodeJS.ErrnoException | null, subFolderItems: string[]) => {
          if (err) throw err;
          const Files = filterNonJsFiles(subFolderItems);

          loadCommands(Files, path.join(commandsDirectory, folderName));
        }
      );
    });
  }
);

const listenersDirectory = path.join(__dirname, "listeners");
if (!fs.existsSync(listenersDirectory)) {
    fs.mkdirSync(listenersDirectory);
}

fs.readdir(listenersDirectory, async (err: NodeJS.ErrnoException | null, items: string[]) => {
    if (err) throw err;
    const listeners = items.filter((files) => files.split(".").pop() === "js");

    listeners.forEach((fileName: string) => {
        import(path.join(listenersDirectory, fileName)).then((properties) => {
            let listener:Listeners<any> = properties.Listener;

            client.on(listener.event, (args) => {
                listener.run(client, args);
            });
            console.log(`${listener.purpose} listener was loaded`);
        });
    });
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("interactionCreate", (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  let commandFile = client.commands.get(interaction.commandName);

  if (commandFile) commandFile.run(client, interaction);
});

client.on("interactionCreate", (interaction: Interaction) => {
  if (!interaction.isButton()) return;

  let buttonFollowUp = client.commands.get(interaction.customId.split(".")[0]);

  if (buttonFollowUp) buttonFollowUp.followup(client, interaction);
});

process.on("uncaughtException", (error) => {
    console.error(error);

    if (!errorHandler.isTrustedError(error)) {
        process.exit(1);
    }
});

client.login(process.env.BOT_TOKEN);

const loadCommands = (files: string[], location: string) => {
    files.forEach((fileName) => {
        import(path.join(location, fileName)).then((properties) => {
            let commandName = properties.SlashCommand.name.toLowerCase();

            client.commands.set(commandName, properties.SlashCommand);

            console.log(`${fileName} command loaded`);
        });
    });
};

const filterNonJsFiles = (items: string[]) => {
    return items.filter((files) => files.split(".").pop() === "js");
};