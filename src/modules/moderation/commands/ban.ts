import {
  CommandInteraction,
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { AllyClient } from "../../../interfaces/AllyClient";
import { Command } from "../../../interfaces/Commands";

export const SlashCommand: Command = {
  name: "ban",
  description: "Command for banning server members",
  moduleName: "Moderation",
  run: (client: AllyClient, interaction: CommandInteraction) => {
    var user = interaction.options.getUser("user");
    var guild = interaction.guild;

    guild.members
      .ban(user, {
        reason: `Banned by ${interaction.user.username}`,
      })
      .then(() => {
        var embed = new EmbedBuilder()
          .setTitle("Member banned")
          .setDescription(`${user.username} was banned from ${guild.name}`)
          .setFooter({
            text: "This Discord bot was made with Discord Bot Builder",
          });

        interaction.reply({ embeds: [embed] });
      });
  },
  command: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban server members")
    .addUserOption((option) => {
      return option
        .setName("user")
        .setDescription("User that'll be banned")
        .setRequired(true);
    })
    .setDefaultMemberPermissions(
      PermissionFlagsBits.BanMembers
    ) as SlashCommandBuilder,
};
