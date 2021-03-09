import {Command} from "discord-akairo";
import {Message, MessageEmbed} from "discord.js";
import QseClient from "../../structures/client";

export default class Quiz extends Command {
    constructor() {
        super('quiz', {
            aliases: ['퀴즈']
        })
    }

    async exec(msg: Message) {
        const client = this.client as QseClient
        const embed = new MessageEmbed()
        embed.setTitle('퀴즈')
        embed.setDescription('큐세는 여자다')
        const m = await msg.channel.send(embed)
        await m.react(client.config.reactions.yes)
        await m.react(client.config.reactions.no)
    }
}