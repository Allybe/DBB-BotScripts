import { CommandInteraction, ApplicationCommandType, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageActionRowComponentBuilder, InteractionType } from "discord.js";
import { Command } from "../../../interfaces/Commands";
import { AllyClient } from "../../../interfaces/AllyClient";

export const SlashCommand: Command = {
    name: "help",
    description: "Help command",
    moduleName: "Misc",
    type: ApplicationCommandType.ChatInput,
    run: async (client: AllyClient, interaction: CommandInteraction) => {
        let types = new Array<string>();
        let row = new ActionRowBuilder<MessageActionRowComponentBuilder>();

        client.commands.each((command) => { 
            if (!types.includes(command.moduleName)) types.push(command.moduleName);
        });

        let embed = new EmbedBuilder()
            .setTitle("Command List")
            .setDescription("Here is a list of all the commands you can use!")
            .setColor(0xAD93EE);

        types.forEach((type) => {
            embed.addFields({
                name: type,
                value: `Commands for the ${type} module`,
            });
        
            let button = new ButtonBuilder()
                .setCustomId(`help.${type}`)
                .setLabel(type)
                .setStyle(ButtonStyle.Primary);
                
            row.addComponents(button);
        });

        interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    },
    followup(client, interaction) {
        const type = interaction.customId.split(".")[1];

        let embed = new EmbedBuilder()
            .setTitle(`${type} Commands`)
            .setDescription(`Here is a list of all the commands for the ${type} module!`)
            .setColor(0xAD93EE);

        client.commands.each((command) => {
            if (command.moduleName === type) {
                embed.addFields({
                    name: command.name,
                    value: command.description,
                });
            }
        });
    
        interaction.editReply({ embeds: [embed]});
    },
    command: new SlashCommandBuilder().setName("help").setDescription("Help command")
};