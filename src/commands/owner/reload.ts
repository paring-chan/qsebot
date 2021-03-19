import {Command} from "discord-akairo";
import {Message} from "discord.js";
import QseClient from "../../structures/client";

export default class Reload extends Command {
    constructor() {
        super('owner__reload', {
            ownerOnly: true,
            aliases: ['리로드']
        })
    }

    async exec(msg: Message) {
        const client = this.client as QseClient
        delete require.cache[require.resolve('../../../config.json')]
        client.config = require('../../../config.json')
        client.commandHandler.categories.map(r=>r.removeAll())
        client.listenerHandler.categories.map(r=>r.removeAll())
        client.commandHandler.loadAll()
        client.listenerHandler.loadAll()
        await msg.react('✔')
    }
}