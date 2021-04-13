import PatchedModule from '../structures/PatchedModule'
import QseClient from '../structures/client'
import { command } from '@pikostudio/command.ts'
import { Message, MessageEmbed } from 'discord.js'
import Problem from '../models/Problem'
import _ from 'lodash'

enum RCPType {
  ROCK,
  SCISSORS,
  PAPER,
}

enum RCPWin {
  WIN = '이김',
  LOSE = '짐',
  DRAW = '비김',
}

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
    embed
      .setTitle('퀴즈')
      .setDescription(quiz.question)
      .setColor(0xff6ee7)
      .setFooter(msg.author.tag, msg.author.displayAvatarURL())
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

  @command({ name: '가위바위보' })
  async rsp(msg: Message) {
    const emojis = ['✌️', '✊', '🖐️']
    const m = await msg.reply(
      new MessageEmbed()
        .setTitle('가위바위보')
        .setColor(0xff6ee7)
        .setDescription('반응 아무거나(?) 눌러주세요!'),
    )
    const typeArr = Object.values(RCPType)
    const rand = Math.floor(_.random(true) * (typeArr.length - 1))
    await Promise.all(emojis.map((x) => m.react(x)))
    const res = await m.awaitReactions(
      (reaction, user) =>
        emojis.includes(reaction.emoji.name) && user.id === msg.author.id,
      {
        time: 30000,
        max: 1,
      },
    )
    if (!res.size) return msg.reply('시간초과')
    const reaction = res.first()!
    let type: RCPType
    switch (reaction.emoji.name) {
      case emojis[0]:
        type = RCPType.SCISSORS
        break
      case emojis[1]:
        type = RCPType.ROCK
        break
      case emojis[2]:
        type = RCPType.PAPER
        break
      default:
        return
    }
    let win: RCPWin = RCPWin.DRAW
    if (rand !== type) {
      switch (rand) {
        case RCPType.PAPER:
          if (type === RCPType.SCISSORS) win = RCPWin.WIN
          else win = RCPWin.LOSE
          break
        case RCPType.ROCK:
          if (type === RCPType.PAPER) win = RCPWin.WIN
          else win = RCPWin.LOSE
          break
        case RCPType.SCISSORS:
          if (type === RCPType.ROCK) win = RCPWin.WIN
          else win = RCPWin.LOSE
          break
      }
    }
    if (!win) return
    await msg.reply(win)
  }
}

export function install(client: QseClient) {
  return new Fun(client)
}
