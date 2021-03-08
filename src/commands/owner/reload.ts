import {Command} from "discord-akairo";
import {Message} from "discord.js";

export default class Reload extends Command {
    constructor() {
        super('owner__reload', {
            ownerOnly: true,
            aliases: ['리로드']
        })
    }

    async exec(msg: Message) {
        await msg.react('✔')
    }
}