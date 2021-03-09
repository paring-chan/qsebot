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
        const quizList = require('../../../quiz.json')
        const quiz = quizList[Math.floor(Math.random() * quizList.length)]
        const embed = new MessageEmbed()
        embed.setTitle('퀴즈')
        embed.setDescription(quiz.question)
        const m = await msg.channel.send(embed)
        await m.react(client.config.reactions.yes)
        await m.react(client.config.reactions.no)
        const res = await m.awaitReactions((reaction, user) => [client.config.reactions.yes, client.config.reactions.no].includes(reaction.emoji.id) && user.id === msg.author.id, {
            time: 30000,
            max: 1
        })
        if (!res.size) return msg.channel.send('시간초과')
        const reaction = res.first()!
        if (reaction.emoji.id === client.config.reactions.yes && quiz.answer) {
            return msg.channel.send(quiz.correct)
        } else {
            return msg.channel.send(quiz.incorrect)
        }
    }
}