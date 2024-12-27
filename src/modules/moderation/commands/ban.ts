import {
  CommandInteraction, Embed,
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { AllyClient } from "../../../interfaces/AllyClient";
import { Command } from "../../../interfaces/Commands";
import {Embeds} from "../../../utility/Embeds";

export const SlashCommand: Command = {
  name: "ban",
  description: "Command for banning server members",
  moduleName: "Moderation",
  run: (client: AllyClient, interaction: CommandInteraction) => {
    let user = interaction.options.get("user", true).user;
    let banReason = interaction.options.get("reason").value as string;
    let guild = interaction.guild;

    guild.members
      .ban(user, {
        reason: banReason,
      })
      .then(() => {
        let embed = new Embeds()
          .setTitle("Member banned")
          .setDescription(`${user} was banned from ${guild.name}`);

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
      .addStringOption(option =>
          option
              .setName('reason')
              .setDescription('Ban reason')
              .setRequired(true)
      )
    .setDefaultMemberPermissions(
      PermissionFlagsBits.BanMembers
    ) as SlashCommandBuilder,
};
