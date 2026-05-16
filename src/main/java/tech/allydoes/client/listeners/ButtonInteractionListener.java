package tech.allydoes.client.listeners;

import net.dv8tion.jda.api.events.interaction.component.ButtonInteractionEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;


public class ButtonInteractionListener extends ListenerAdapter {
    @Override
    public void onButtonInteraction(ButtonInteractionEvent event) {
        String componentId = event.getComponentId();
        String commandName = componentId.split(":")[0];

        DiscordManager discordManager = LeaderboardServer.getDiscordManager();
        Command command = discordManager.getCommand(commandName);
        if (command == null || (command.isPrivateCommand() && !Constants.AUTHORIZED_ADMINS.contains(event.getUser().getId()))) return;
        command.processButtonInteractionEvent(event);
    }
}
