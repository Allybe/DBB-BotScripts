import {
  CommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { AllyClient } from "../../interfaces/AllyClient";
import { Command } from "../../interfaces/Commands";
import {Embeds} from "../../utility/Embeds";

export const SlashCommand: Command = {
  name: "unban",
  description: "Command for unbanning server members",
  moduleName: "Moderation",
  run: (client: AllyClient, interaction: CommandInteraction) => {
    let user = interaction.options.get("user").user;
    let guild = interaction.guild;
    let embed = new Embeds();

    guild.bans.fetch().then((banCollection) => {
      if (!banCollection.has(user.id)) {
        embed
          .setTitle("Member not banned")
          .setDescription(`${user} is not banned from ${guild.name}`);

        return interaction.reply({ embeds: [embed] });
      }
      guild.members.unban(user);
      embed
        .setTitle("Member unbanned")
        .setDescription(`${user} was unbanned from ${guild.name}`);
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
