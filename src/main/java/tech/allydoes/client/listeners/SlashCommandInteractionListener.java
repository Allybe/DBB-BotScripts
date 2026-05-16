package tech.allydoes.client.listeners;

import net.dv8tion.jda.api.events.interaction.command.SlashCommandInteractionEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import tech.allydoes.Constants;
import tech.allydoes.LeaderboardServer;
import tech.allydoes.discord.Command;
import tech.allydoes.discord.DiscordManager;

public class SlashCommandInteractionListener extends ListenerAdapter {
    @Override
    public void onSlashCommandInteraction(SlashCommandInteractionEvent event) {
        DiscordManager discordManager = LeaderboardServer.getDiscordManager();
        Command command = discordManager.getCommand(event.getName());
        if (command == null || (command.isPrivateCommand() && !Constants.AUTHORIZED_ADMINS.contains(event.getUser().getId()))) return;
        command.processSlashCommandInteractionEvent(event);
    }
}
