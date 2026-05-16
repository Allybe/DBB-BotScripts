package tech.allydoes.modules.admin;

import tech.allydoes.modules.interfaces.Command;
import tech.allydoes.modules.interfaces.Module;

public class AdminModule implements Module {
    @Override
    public String getName() {
        return "";
    }

    @Override
    public Command[] getCommands() {
        return new Command[0];
    }
}
