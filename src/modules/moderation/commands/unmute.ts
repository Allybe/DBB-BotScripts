import {
  CommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
    EmbedBuilder
} from "discord.js";
import { AllyClient } from "../../../interfaces/AllyClient";
import { Command } from "../../../interfaces/Commands";

export const SlashCommand: Command = {
  name: "unmute",
  description: "Unmute server members",
  moduleName: "Moderation",
  run: (client: AllyClient, interaction: CommandInteraction) => {
    let embed = new EmbedBuilder();

    let user = interaction.options.get("user").user;
    let guild = interaction.guild;

    guild.members.fetch(user).then((fetchedUser) => {
      fetchedUser.timeout(null);
      embed
          .setTitle("User unmuted")
          .setDescription(`${fetchedUser.user} was unmuted`)
          .setFooter({text: "This Discord bot was made with Discord Bot Builder"}).setColor("Green");

      interaction.reply({embeds: [embed] });
    });
  },
  command: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Unmute server members")
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
