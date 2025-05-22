import {Listeners} from "../interfaces/Listeners";
import {AllyClient} from "../interfaces/AllyClient";
import {Events, GuildMember, SendableChannels, TextBasedChannel} from "discord.js";

export const Listener: Listeners<Events.GuildMemberAdd> = {
    event: Events.GuildMemberAdd,
    purpose: "Welcome message",
    run(client: AllyClient, listener: GuildMember): void {
        //TODO: Add ability to change what channel to send message to.
        const welcomeChannelId = listener.guild.systemChannelId; //Add ability to change channel to send to
        console.log(welcomeChannelId);
        listener.guild.channels.fetch(welcomeChannelId).then((channel) => {
            if (channel.isSendable()) {
                let welcomeChannel = channel as SendableChannels;
                let messageContent = `Hello ${listener.displayName}!`;

                welcomeChannel.send(messageContent);
            }
        });
    }
};