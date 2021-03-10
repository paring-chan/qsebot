import {Command} from "discord-akairo";
import {Message} from "discord.js";
import QseClient from "../../structures/client";

export default class ManageQuiz extends Command {
    constructor() {
        super('owner__manage_quiz', {
            ownerOnly: true,
            aliases: ['퀴즈관리']
        })
    }

    async exec(msg: Message) {
        const client = this.client as QseClient
    }
}