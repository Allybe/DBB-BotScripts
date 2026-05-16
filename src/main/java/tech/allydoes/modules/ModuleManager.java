package tech.allydoes.modules;

import tech.allydoes.modules.admin.AdminModule;
import tech.allydoes.modules.interfaces.Command;
import tech.allydoes.modules.interfaces.Module;
import tech.allydoes.modules.testing.TestingModule;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class ModuleManager {
    private final HashMap<String, Command> enabledCommands;
    public ModuleManager() {
        enabledCommands = new HashMap<>();
        Module[] modules = new Module[] {
                new TestingModule(),
                new AdminModule()
        };

        for (Module module : modules) {
            for (Command command : module.getCommands()) {
                enabledCommands.put(command.getCommandData().getName(), command);
            }
        }
    }

    public List<Command> getEnabledCommands() {
        return new ArrayList<>(enabledCommands.values());
    }

    public Command getCommand(String name) {
        return enabledCommands.get(name);
    }
}
