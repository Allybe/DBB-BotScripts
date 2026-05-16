package tech.allydoes.modules.interfaces;

import net.dv8tion.jda.api.events.interaction.command.SlashCommandInteractionEvent;
import net.dv8tion.jda.api.events.interaction.component.ButtonInteractionEvent;
import net.dv8tion.jda.api.interactions.commands.build.SlashCommandData;

public interface Command {
    SlashCommandData getCommandData();
    void processSlashCommandInteractionEvent(SlashCommandInteractionEvent event);
    void processButtonInteractionEvent(ButtonInteractionEvent event);
}
