import {Listeners} from "../../../interfaces/Listeners";
import {AllyClient} from "../../../interfaces/AllyClient";
import {Events, GuildMember, TextBasedChannel} from "discord.js";

export const Listener: Listeners<Events.GuildMemberAdd> = {
    event: Events.GuildMemberAdd,
    purpose: "Welcome message",
    run(client: AllyClient, listener: GuildMember): void {
        const welcomeChannelId = listener.guild.systemChannelId; //Add ability to change channel to send to
        listener.guild.channels.fetch(welcomeChannelId).then((channel) => {
            if (channel.isTextBased) {
                let welcomeChannel = channel as TextBasedChannel;
                let messageContent = `Hello ${listener.displayName}!`;

                welcomeChannel.send(messageContent);
            }
        });
    }
};