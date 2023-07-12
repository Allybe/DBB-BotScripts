import {
  CommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { AllyClient } from "../../../interfaces/AllyClient";
import { Command } from "../../../interfaces/Commands";

export const SlashCommand: Command = {
  name: "ping",
  description: "Test command",
  moduleName: "Misc",
  run: (client: AllyClient, interaction: CommandInteraction) => {
    interaction.reply({ content: "Pong!", ephemeral: true });
  },
  command: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Test command")
    .setDefaultMemberPermissions(
      PermissionFlagsBits.SendMessages
    ) as SlashCommandBuilder,
};
