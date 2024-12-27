import {
  CommandInteraction,
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { AllyClient } from "../../../interfaces/AllyClient";
import { Command } from "../../../interfaces/Commands";
import {Embeds} from "../../../utility/Embeds";
const MIN_IN_MS = 60000;
const MAX_TIME = 35791;

export const SlashCommand: Command = {
  name: "mute",
  description: "Mute member",
  moduleName: "Moderation",
  run: (client: AllyClient, interaction: CommandInteraction) => {
    const embed = new Embeds();

    const mentionedUser = interaction.options.get("user").user;
    const time = interaction.options.get("time", true).value as number;
    const guild = interaction.guild;

    if (time >= MAX_TIME) {
      embed
        .setTitle("Invalid time")
        .setDescription("You can't mute someone for more than 4 weeks")
        .setFooter({
          text: "This Discord bot was made with Discord Bot Builder",
        }).setColor("Red");

      return interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }

    guild.members.fetch(mentionedUser).then((member) => {
      member.timeout(time * MIN_IN_MS, "Muted by " + interaction.user.username);

      embed
        .setTitle("Member muted")
        .setDescription(
          `${mentionedUser} was muted for ${time} minutes`
        )
        .setFooter({
          text: "This Discord bot was made with Discord Bot Builder",
        }).setColor("Green");

      interaction.reply({
        embeds: [embed]
      });
    });
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
    .addIntegerOption((option) => {
      return option
        .setName("time")
        .setDescription("Time in minutes")
        .setRequired(true);
    })
    .setDefaultMemberPermissions(
      PermissionFlagsBits.ModerateMembers
    ) as SlashCommandBuilder,
};
