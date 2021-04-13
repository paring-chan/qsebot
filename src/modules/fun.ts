import PatchedModule from '../structures/PatchedModule'
import QseClient from '../structures/client'
import { command } from '@pikostudio/command.ts'
import { Message, MessageEmbed } from 'discord.js'
import Problem from '../models/Problem'

class Fun extends PatchedModule {
  constructor(private client: QseClient) {
    super(__filename)
  }
  @command({ name: '퀴즈' })
  async quiz(msg: Message) {
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
      if (quiz.answer)
        return msg.react('✅').then(() => msg.reply(quiz.correct))
      else return msg.react('❌').then(() => msg.reply(quiz.incorrect))
    } else {
      if (!quiz.answer) return msg.reply(quiz.correct)
      else return msg.reply(quiz.incorrect)
    }
  }
}

export function install(client: QseClient) {
  return new Fun(client)
}
