package tech.allydoes;

import tech.allydoes.modules.ModuleManager;

public class DiscordBotScripts {
    private static ModuleManager moduleManager;
    public static void main(String[] args) {
        moduleManager = new ModuleManager();
    }

    public static ModuleManager getModuleManager() {
        return moduleManager;
    }
}