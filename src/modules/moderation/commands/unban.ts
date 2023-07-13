import {
  CommandInteraction,
  Embed,
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
    var embed = new EmbedBuilder();

    guild.bans.fetch().then((banCollection) => {
      if (!banCollection.has(user.id)) {
        embed
          .setTitle("Member not banned")
          .setDescription(`${user.username} is not banned from ${guild.name}`)
          .setFooter({
            text: "This Discord bot was made with Discord Bot Builder",
          });

        return interaction.reply({ embeds: [embed] });
      }

      banCollection.delete(user.id);
      embed
        .setTitle("Member unbanned")
        .setDescription(`${user.username} was unbanned from ${guild.name}`)
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
