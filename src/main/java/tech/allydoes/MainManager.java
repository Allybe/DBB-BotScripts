package tech.allydoes;

import tech.allydoes.client.ClientManager;
import tech.allydoes.config.ConfigManager;
import tech.allydoes.modules.ModuleManager;

import java.io.File;
import java.io.FileNotFoundException;

public class MainManager {
    private static ConfigManager configManager;
    private static ModuleManager moduleManager;
    private static ClientManager clientManager;

    public static void main(String[] args) throws InterruptedException, FileNotFoundException {
        configManager = new ConfigManager(new File("/home/allison/Codespaces/config.json"));
        moduleManager = new ModuleManager();
        clientManager = new ClientManager();
    }

    public static ConfigManager getConfigManager() {
        return configManager;
    }

    public static ConfigManager.Config getConfig() {
        return configManager.getConfig();
    }


    public static ModuleManager getModuleManager() {
        return moduleManager;
    }

    public static ClientManager getClientManager() {
        return clientManager;
    }
}