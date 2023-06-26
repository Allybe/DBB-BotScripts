import { CommandInteraction, ChatInputApplicationCommandData, ButtonInteraction, ModalSubmitInteraction } from "discord.js";
import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "@discordjs/builders";
import { AllyClient } from "./AllyClient.js";

export interface Command extends ChatInputApplicationCommandData {
    name: string;
    description: string;
    args?: Map<string, boolean>;
    run: (client: AllyClient, interaction: CommandInteraction) => void;
    followup?: (client: AllyClient, interaction: ButtonInteraction) => void;
    modalResponse?: (client: AllyClient, interaction: ModalSubmitInteraction) => void;
    command: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
}