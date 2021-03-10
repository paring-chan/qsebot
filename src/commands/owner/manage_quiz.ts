import {Command} from "discord-akairo";
import {Message} from "discord.js";
import QseClient from "../../structures/client";
// import yargsParser from "yargs-parser";

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

    async exec(msg: Message, {op}: {op: string}) {
        const client = this.client as QseClient
        const {prisma} = client
        const split = op.split(' ')
        op = split.shift()!
        if (!op) return
        const content = split.join(' ')
        if (op === '추가') {
            console.log('add')
        }
    }
}