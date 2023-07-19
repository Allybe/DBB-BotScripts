import { Client } from "discord.js";
import { Collection } from "@discordjs/collection";
import { Command } from "./Commands";
import { Sequelize, DataTypes } from "sequelize";

export class AllyClient extends Client {
  public commands: Collection<String, Command> = new Collection();
  public DB: Sequelize;
}
