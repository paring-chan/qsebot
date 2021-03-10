import {Command} from "discord-akairo";
import {Message} from "discord.js";
import QseClient from "../../structures/client";

export default class ManageQuiz extends Command {
    constructor() {
        super('owner__manage_quiz', {
            ownerOnly: true,
            aliases: ['퀴즈관리'],
            args: [
                {
                    id: 'op',
                    default: '',
                    type: 'string',
                    match: 'rest'
                }
            ]
        })
    }

    async exec(msg: Message, {op}: any) {
        const client = this.client as QseClient
        const {prisma} = client
    }
}