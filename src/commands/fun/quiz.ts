import { Command } from 'discord-akairo'
import { Message, MessageEmbed } from 'discord.js'
import QseClient from '../../structures/client'
import Problem from '../../models/Problem'

export default class Quiz extends Command {
  constructor() {
    super('quiz', {
      aliases: ['퀴즈'],
    })
  }

  async exec(msg: Message) {
    const client = this.client as QseClient
    const quizList: any[] = await Problem.find()
    if (!quizList.length) {
      return msg.reply('퀴즈가 업서요')
    }
    const quiz = quizList[Math.floor(Math.random() * quizList.length)]
    const embed = new MessageEmbed()
    embed.setTitle('퀴즈')
    embed.setDescription(quiz.question)
    embed.setColor(0xff6ee7)
    embed.setFooter(msg.author.tag, msg.author.displayAvatarURL())
    const m = await msg.reply(embed)
    await m.react(client.config.reactions.yes)
    await m.react(client.config.reactions.no)
    const res = await m.awaitReactions(
      (reaction, user) =>
        [client.config.reactions.yes, client.config.reactions.no].includes(
          reaction.emoji.id,
        ) && user.id === msg.author.id,
      {
        time: 30000,
        max: 1,
      },
    )
    if (!res.size) return msg.reply('시간초과')
    const reaction = res.first()!
    quiz.incorrect = '큐세에 대해 좀 더 공부해오도록 하세요~\n' + quiz.incorrect
    if (reaction.emoji.id === client.config.reactions.yes) {
      if (quiz.answer) {
        await msg.react('✅')
        return msg.reply(quiz.correct)
      } else {
        await msg.react('❌')
        return msg.reply(quiz.incorrect)
      }
    } else {
      if (!quiz.answer) {
        return msg.reply(quiz.correct)
      } else {
        return msg.reply(quiz.incorrect)
      }
    }
  }
}
