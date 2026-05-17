package tech.allydoes.client;

import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.entities.Guild;
import net.dv8tion.jda.api.requests.GatewayIntent;
import net.dv8tion.jda.api.requests.restaction.CommandListUpdateAction;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import tech.allydoes.MainManager;
import tech.allydoes.client.listeners.ButtonInteractionListener;
import tech.allydoes.client.listeners.SlashCommandInteractionListener;
import tech.allydoes.modules.interfaces.Command;

import java.util.ArrayList;

public class ClientManager {
    private final Logger LOGGER;
    private final JDA jda;

    public ClientManager() throws InterruptedException {
        LOGGER = LogManager.getLogger(ClientManager.class);
        jda = JDABuilder
                .create(MainManager.getConfig().token(), GatewayIntent.GUILD_MESSAGES, GatewayIntent.MESSAGE_CONTENT, GatewayIntent.GUILD_PRESENCES, GatewayIntent.SCHEDULED_EVENTS, GatewayIntent.GUILD_EXPRESSIONS, GatewayIntent.GUILD_VOICE_STATES)
                .addEventListeners(new SlashCommandInteractionListener(), new ButtonInteractionListener())
                .build()
                .awaitReady();
        registerSlashCommands();
    }

    private void registerSlashCommands() {
        Guild guild = jda.getGuildById(MainManager.getConfig().guildId());
        if (guild == null) return;

        CommandListUpdateAction updateAction = guild.updateCommands();
        ArrayList<Command> commands = MainManager.getModuleManager().getEnabledCommands();
        for (Command command : commands) {
            updateAction = updateAction.addCommands(command.getCommandData());
            LOGGER.info("Registered command: {}", command.getCommandData().getName());
        }

        updateAction.queue();
        LOGGER.info("Registered all commands.");
    }

    public JDA getJDA() {
        return jda;
    }
}
