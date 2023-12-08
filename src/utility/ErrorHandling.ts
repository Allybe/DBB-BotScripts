import {DiscordAPIError, DiscordjsError} from "discord.js";

class ErrorHandling {
    public isTrustedError(err: Error) {
        return err instanceof DiscordAPIError || err instanceof DiscordjsError;
    }
}

export const errorHandler = new ErrorHandling();