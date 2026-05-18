package tech.allydoes.modules.moderation;

import tech.allydoes.modules.interfaces.Command;
import tech.allydoes.modules.interfaces.Module;
import tech.allydoes.modules.moderation.commands.*;

public class ModerationModule implements Module {
    private final Command[] commands;
    public ModerationModule() {
        this.commands = new Command[] {
                new BanCommand(),
                new UnbanCommand(),
                new KickCommand(),
                new LockCommand(),
                new UnlockCommand(),
                new MuteCommand(),
                new UnmuteCommand(),
                new WarnCommand()
        };
    }

    @Override
    public String getName() {
        return "";
    }

    @Override
    public Command[] getCommands() {
        return new Command[0];
    }
}
