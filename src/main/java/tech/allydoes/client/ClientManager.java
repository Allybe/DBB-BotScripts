package tech.allydoes.client;

import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.entities.Activity;
import net.dv8tion.jda.api.entities.Guild;
import net.dv8tion.jda.api.requests.GatewayIntent;
import net.dv8tion.jda.api.requests.restaction.CommandListUpdateAction;
import tech.allydoes.client.listeners.ButtonInteractionListener;
import tech.allydoes.client.listeners.SlashCommandInteractionListener;
import tech.allydoes.modules.interfaces.Command;

public class ClientManager {
    private final JDA jda;

    public ClientManager() throws InterruptedException {
        jda = JDABuilder
                .create("", GatewayIntent.GUILD_MESSAGES)
                .addEventListeners(new SlashCommandInteractionListener(), new ButtonInteractionListener())
                .build()
                .awaitReady();
        registerSlashCommands();
    }

    private void registerSlashCommands() {
        Guild guild = jda.getGuildById(Constants.DISCORD_GUILD_ID);
        if (guild == null) return;

        CommandListUpdateAction updateAction = guild.updateCommands();
        for (Command command : commands.values()) {
            updateAction = updateAction.addCommands(command.getCommandData());
        }
        updateAction.queue();
    }

    public Command getCommand(String command) {
        return commands.get(command);
    }

    public JDA getJDA() {
        return jda;
    }
}
