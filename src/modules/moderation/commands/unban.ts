import {
  CommandInteraction,
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { AllyClient } from "../../../interfaces/AllyClient";
import { Command } from "../../../interfaces/Commands";

export const SlashCommand: Command = {
  name: "unban",
  description: "Command for unbanning server members",
  moduleName: "Moderation",
  run: (client: AllyClient, interaction: CommandInteraction) => {
    var user = interaction.options.getUser("user");
    var guild = interaction.guild;

    guild.members.unban(user).then((member) => {
      var embed = new EmbedBuilder()
        .setTitle("Member unbanned")
        .setDescription(
          `${member.username} was unbanned from ${interaction.guild.name}`
        )
        .setFooter({
          text: "This Discord bot was made with Discord Bot Builder",
        });

      interaction.reply({ embeds: [embed] });
    });
  },
  command: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban server members")
    .addUserOption((option) => {
      return option
        .setName("user")
        .setDescription("User that'll be Unbanned")
        .setRequired(true);
    })
    .setDefaultMemberPermissions(
      PermissionFlagsBits.BanMembers
    ) as SlashCommandBuilder,
};
