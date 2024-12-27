import {EmbedBuilder} from "discord.js";

export class Embeds extends EmbedBuilder {
    public constructor() {
        super();

        this
            .setFooter({text: "This Discord bot was made with Discord Bot Builder"}).setColor("Green");
    }
}