package tech.allydoes.modules.testing.commands;

import net.dv8tion.jda.api.Permission;
import net.dv8tion.jda.api.events.interaction.command.SlashCommandInteractionEvent;
import net.dv8tion.jda.api.events.interaction.component.ButtonInteractionEvent;
import net.dv8tion.jda.api.interactions.commands.DefaultMemberPermissions;
import net.dv8tion.jda.api.interactions.commands.OptionType;
import net.dv8tion.jda.api.interactions.commands.build.Commands;
import net.dv8tion.jda.api.interactions.commands.build.SlashCommandData;
import tech.allydoes.modules.interfaces.Command;

public class PingCommand implements Command {

    @Override
    public SlashCommandData getCommandData() {
        return Commands.slash("ban", "Bans user from server.")
                .addOption(OptionType.USER, "user", "User to ban from server.", true)
                .setDefaultPermissions(DefaultMemberPermissions.enabledFor(Permission.BAN_MEMBERS));
    }

    @Override
    public void processSlashCommandInteractionEvent(SlashCommandInteractionEvent event) {
        event.reply("Pong!").queue();
    }

    @Override
    public void processButtonInteractionEvent(ButtonInteractionEvent event) {

    }
}
