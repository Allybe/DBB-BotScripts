package tech.allydoes.modules;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import tech.allydoes.modules.admin.AdminModule;
import tech.allydoes.modules.interfaces.Command;
import tech.allydoes.modules.interfaces.Module;
import tech.allydoes.modules.testing.TestingModule;

import java.util.ArrayList;
import java.util.HashMap;

public class ModuleManager {
    private final HashMap<String, Command> enabledCommands;
    private final Logger LOGGER;
    public ModuleManager() {
        LOGGER = LogManager.getLogger(ModuleManager.class);
        enabledCommands = new HashMap<>();
        Module[] modules = new Module[] {
                new TestingModule(),
                new AdminModule()
        };

        for (Module module : modules) {
            for (Command command : module.getCommands()) {
                enabledCommands.put(command.getCommandData().getName(), command);
                LOGGER.info("Loaded command '{}' from '{}' module.", command.getCommandData().getName(), module.getName());
            }
        }
        LOGGER.info("Loaded {} commands.", enabledCommands.size());
    }

    public ArrayList<Command> getEnabledCommands() {
        return new ArrayList<>(enabledCommands.values());
    }

    public Command getCommand(String name) {
        return enabledCommands.get(name);
    }
}
