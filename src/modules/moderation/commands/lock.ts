import {
    CommandInteraction,
    PermissionFlagsBits,
    SlashCommandBuilder,
} from "discord.js";
import {AllyClient} from "../../../interfaces/AllyClient";
import {Command} from "../../../interfaces/Commands";

export const SlashCommand: Command = {
    name: "lock",
    description: "Locks a channel to all users",
    moduleName: "Moderation",
    run: (client: AllyClient, interaction: CommandInteraction) => {

    },
    command: new SlashCommandBuilder()
        .setName("lock")
        .setDescription("Locks a channel to all users")
        .addChannelOption((option) => {
            return option
                .setName("Channel")
                .setDescription("Channel inputted here will be locked")
                .setRequired(false)
        })
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels) as SlashCommandBuilder,
};
