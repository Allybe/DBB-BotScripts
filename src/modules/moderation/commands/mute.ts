import {
  CommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { AllyClient } from "../../../interfaces/AllyClient";
import { Command } from "../../../interfaces/Commands";

export const SlashCommand: Command = {
  name: "mute",
  description: "Mute member",
  moduleName: "Moderation",
  run: (client: AllyClient, interaction: CommandInteraction) => {
    var mentionedUser = interaction.options.getUser("user");
    var guild = interaction.guild;

    guild.members.fetch(mentionedUser).then((member) => {});
  },
  command: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Mute member")
    .addUserOption((option) => {
      return option
        .setName("user")
        .setDescription("User that'll be muted")
        .setRequired(true);
    })
    .setDefaultMemberPermissions(
      PermissionFlagsBits.ModerateMembers
    ) as SlashCommandBuilder,
};
