package tech.allydoes.config;

import com.google.gson.Gson;
import com.google.gson.stream.JsonReader;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;

public class ConfigManager {
    private final Logger LOGGER;
    private final Gson gson;
    private final Config config;
    public ConfigManager(File configFile) throws FileNotFoundException {
        LOGGER = LogManager.getLogger(ConfigManager.class);
        gson = new Gson();
        if (configFile == null || !configFile.exists()) throw new FileNotFoundException();
        if (!configFile.getName().toLowerCase().endsWith(".json")) {
            LOGGER.warn("not sure why you passed a file that isn't a json file... i will try to read it anyways");
        }

        FileReader reader = new FileReader(configFile);
        config = gson.fromJson(reader, Config.class);
    }

    public Config getConfig() {
        return config;
    }

    public record Config(String token, String guildId) {}
}
