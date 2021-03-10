import {Command} from "discord-akairo";
import {Message} from "discord.js";
import QseClient from "../../structures/client";
// import yargsParser from "yargs-parser";
import yaml from 'yaml'

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
        let content = split.join(' ')
        if (content.startsWith('```yml')) content = content.slice('```yml'.length)
        if (content.endsWith('```')) content = content.slice(0, content.length - '```'.length)
        if (op === '추가') {
            console.log('add')
            const items = yaml.parseAllDocuments(content)
            console.log(items[0].toJSON())
        }
    }
}