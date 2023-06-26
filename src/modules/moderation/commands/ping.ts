import { CommandInteraction, ApplicationCommandType, SlashCommandBuilder } from "discord.js";
import { Command } from "../../../interfaces/Commands.js";
import { AllyClient } from "../../../interfaces/AllyClient.js";

export const SlashCommand: Command = {
    name: "ping",
    description: "Test command",
    type: ApplicationCommandType.ChatInput,
    run: async (client: AllyClient, interaction: CommandInteraction) => {
        interaction.reply("Pong!")
    },
    command: new SlashCommandBuilder().setName("ping").setDescription("Test command")
};