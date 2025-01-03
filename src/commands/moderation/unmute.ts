import {
  CommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder
} from "discord.js";
import { AllyClient } from "../../interfaces/AllyClient";
import { Command } from "../../interfaces/Commands";
import {Embeds} from "../../utility/Embeds";

export const SlashCommand: Command = {
  name: "unmute",
  description: "Unmute server members",
  moduleName: "Moderation",
  run: (client: AllyClient, interaction: CommandInteraction) => {
    let embed = new Embeds();

    let user = interaction.options.get("user").user;
    let guild = interaction.guild;

    guild.members.fetch(user).then((fetchedUser) => {
      fetchedUser.timeout(null);
      embed
          .setTitle("User unmuted")
          .setDescription(`${fetchedUser.user} was unmuted`);

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
