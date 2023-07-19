import { AllyClient } from "./interfaces/AllyClient.js";
import { config } from "./config.js"; // Not ready to do this yet

import {
  GatewayIntentBits,
  Partials,
  Collection,
  Interaction,
  CacheType,
} from "discord.js";
import * as fs from "fs";
import { Sequelize } from "sequelize";

const client = new AllyClient({
  intents: config.intents as GatewayIntentBits[],
  partials: config.partials as Partials[],
});

client.commands = new Collection();
client.DB = new Sequelize("sqlite::memory");

fs.readdir(
  "./dist/commands",
  async (err: NodeJS.ErrnoException | null, items: string[]) => {
    if (err) throw err;
    var baseFiles = items.filter((files) => files.split(".").pop() === "js");
    var folders = items.filter((files) => files.split(".").pop() != "js");

    // Load all commands from the base commands folder
    await baseFiles.forEach((fileName) => {
      import(`./commands/${fileName}`).then((properties) => {
        let commandName = properties.SlashCommand.name.toLowerCase();

        client.commands.set(commandName, properties.SlashCommand);

        console.log(`${fileName} command loaded`);
      });
    });

    // Load all commands from the subfolders
    await folders.forEach((folderName) => {
      fs.readdir(
        `./dist/commands/${folderName}`,
        async (err: NodeJS.ErrnoException | null, subfolderItems: string[]) => {
          if (err) throw err;
          var Files = subfolderItems.filter(
            (files) => files.split(".").pop() === "js"
          );

          await Files.forEach((fileName) => {
            import(`./commands/${folderName}/${fileName}`).then(
              (properties) => {
                let commandName: String =
                  properties.SlashCommand.name.toLowerCase();

                client.commands.set(commandName, properties.SlashCommand);

                console.log(`${fileName} command loaded`);
              }
            );
          });
        }
      );
    });
  }
);

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("interactionCreate", (interaction: Interaction<CacheType>) => {
  if (!interaction.isCommand()) return;

  let commandFile = client.commands.get(interaction.commandName);

  if (commandFile) commandFile.run(client, interaction);
});

client.on("interactionCreate", (interaction: Interaction<CacheType>) => {
  if (!interaction.isButton()) return;

  let buttonFollowUp = client.commands.get(interaction.customId.split(".")[0]);

  if (buttonFollowUp) buttonFollowUp.followup(client, interaction);
});

client.login(config.token);
