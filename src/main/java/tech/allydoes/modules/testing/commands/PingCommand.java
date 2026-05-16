package tech.allydoes.modules.testing.commands;

import net.dv8tion.jda.api.events.interaction.command.SlashCommandInteractionEvent;
import net.dv8tion.jda.api.events.interaction.component.ButtonInteractionEvent;
import net.dv8tion.jda.api.interactions.commands.build.Commands;
import net.dv8tion.jda.api.interactions.commands.build.SlashCommandData;
import tech.allydoes.modules.interfaces.Command;

public class PingCommand implements Command {

    @Override
    public SlashCommandData getCommandData() {
        return Commands.slash("ping", "Test command.");
    }

    @Override
    public void processSlashCommandInteractionEvent(SlashCommandInteractionEvent event) {
        event.reply("Pong!").queue();
    }

    @Override
    public void processButtonInteractionEvent(ButtonInteractionEvent event) {

    }
}
