package tech.allydoes.modules.testing;

import tech.allydoes.modules.interfaces.Command;
import tech.allydoes.modules.testing.commands.PingCommand;
import tech.allydoes.modules.interfaces.Module;


public class TestingModule implements Module {
    private final Command[] commands;
    public TestingModule() {
        commands = new Command[] {
                new PingCommand()
        };
    }

    public String getName() {
        return "Testing";
    }

    public Command[] getCommands() {
        return commands;
    }
}
