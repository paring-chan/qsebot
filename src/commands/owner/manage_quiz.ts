import {Command} from "discord-akairo";
import {Message, MessageEmbed, MessageReaction, User} from "discord.js";
import QseClient from "../../structures/client";
// import yargsParser from "yargs-parser";
import yaml from 'yaml'
import * as yup from 'yup'

type Quiz = {
    question: string,
    answer: boolean,
    correct: string,
    incorrect: string
}

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
            const items = yaml.parseAllDocuments(content).map(r=>r.toJSON())
            const error: any[] = []
            const toAdd: Quiz[] = []
            const schema = yup.object().shape({
                question: yup.string().required(),
                answer: yup.bool().required(),
                correct: yup.string().required(),
                incorrect: yup.string().required()
            })
            for (const i of items) {
                try {
                    const res = await schema.validate(i)
                    toAdd.push(res)
                } catch {
                    error.push(i)
                }
            }
            if (!toAdd.length) return msg.reply('모든 퀴즈 데이터 검증에 실패했습니다.')
            let embed = new MessageEmbed().setColor('GREEN').setTitle('퀴즈를 추가할까요? 이미 존재하는 질문이라면 덮어씌워집니다.').setDescription(`추가될 퀴즈 목록\n${toAdd.map(r => `- ${r.question} - ${r.answer ? 'O' : 'X'}`).join('\n')}`)
            const m = await msg.reply(embed)
            const emojis = ['⭕', '❌']
            await Promise.all(emojis.map(r=>m.react(r)))
            const reactions = await m.awaitReactions((reaction: MessageReaction, user: User) => emojis.includes(reaction.emoji.name) && user.id === msg.author.id, {
                max: 1,
                time: 30000
            })
            const r = reactions.first()
            if (!r || r.emoji.name === '❌') return msg.reply('취소되었어요!')
            for (const i of toAdd) {
                const item = await prisma.problem.findFirst({
                    where: {
                        question: i.question
                    }
                })
                await prisma.problem.upsert({
                    create: {
                        answer: i.answer,
                        correct: i.correct,
                        incorrect: i.incorrect,
                        question: i.question,
                    },
                    where: {
                        id: item?.id || -1
                    },
                    update: {
                        answer: i.answer,
                        correct: i.correct,
                        incorrect: i.incorrect
                    }
                })
            }
            await msg.reply(`문제 ${toAdd.length}개가 추가되었어요!`)
        }
    }
}