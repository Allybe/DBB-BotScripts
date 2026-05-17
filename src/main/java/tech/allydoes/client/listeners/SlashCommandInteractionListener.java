package tech.allydoes.client.listeners;

import net.dv8tion.jda.api.events.interaction.command.SlashCommandInteractionEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import tech.allydoes.MainManager;
import tech.allydoes.modules.interfaces.Command;

public class SlashCommandInteractionListener extends ListenerAdapter {
    @Override
    public void onSlashCommandInteraction(SlashCommandInteractionEvent event) {
        Command command = MainManager.getModuleManager().getCommand(event.getName());
        if (command == null) return;
        command.processSlashCommandInteractionEvent(event);
    }
}
