import {
    CommandInteraction, CommandInteractionOption, GuildBasedChannel,
    PermissionFlagsBits,
    SlashCommandBuilder,
} from "discord.js";
import {AllyClient} from "../../../interfaces/AllyClient";
import {Command} from "../../../interfaces/Commands";
import {Channel} from "node:diagnostics_channel";

export const SlashCommand: Command = {
    name: "lock",
    description: "Places a channel on lockdown",
    moduleName: "Moderation",
    run: (client: AllyClient, interaction: CommandInteraction) => {
        let channel = interaction.options.get("Channel").channel;
        interaction.reply("test");
        },
    command: new SlashCommandBuilder()
        .setName("lock")
        .setDescription("Places a channel on lockdown")
        .addChannelOption((option) => {
            return option
                .setName("Channel")
                .setDescription("Channel inputted here will be locked")
                .setRequired(false)
        })
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels) as SlashCommandBuilder,
};
