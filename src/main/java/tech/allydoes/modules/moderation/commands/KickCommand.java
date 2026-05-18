package tech.allydoes.modules.moderation.commands;

import net.dv8tion.jda.api.events.interaction.command.SlashCommandInteractionEvent;
import net.dv8tion.jda.api.events.interaction.component.ButtonInteractionEvent;
import net.dv8tion.jda.api.interactions.commands.build.SlashCommandData;
import tech.allydoes.modules.interfaces.Command;

public class KickCommand implements Command {
    @Override
    public SlashCommandData getCommandData() {
        return null;
    }

    @Override
    public void processSlashCommandInteractionEvent(SlashCommandInteractionEvent event) {

    }

    @Override
    public void processButtonInteractionEvent(ButtonInteractionEvent event) {

    }
}
