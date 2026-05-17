package tech.allydoes.client.listeners;

import net.dv8tion.jda.api.events.interaction.component.ButtonInteractionEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import tech.allydoes.MainManager;
import tech.allydoes.modules.interfaces.Command;


public class ButtonInteractionListener extends ListenerAdapter {
    @Override
    public void onButtonInteraction(ButtonInteractionEvent event) {
        String componentId = event.getComponentId();
        String commandName = componentId.split(":")[0];

        Command command = MainManager.getModuleManager().getCommand(commandName);
        if (command == null) return;
        command.processButtonInteractionEvent(event);
    }
}
