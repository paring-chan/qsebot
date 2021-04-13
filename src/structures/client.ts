import Discord from 'discord.js'
// @ts-ignore
import config from '../../config.json'
import Dokdo from 'dokdo'
import mongoose from 'mongoose'
import { CommandClient } from '@pikostudio/command.ts'
import * as fs from 'fs'
import path from 'path'

export default class QseClient extends CommandClient {
  config = config

  constructor() {
    super(
      {
        restTimeOffset: 0,
        intents: Discord.Intents.ALL,
      },
      {
        prefix: config.prefix,
        owners: 'auto',
      },
    )

    fs.readdirSync(path.join(__dirname, 'modules')).forEach((x) =>
      this.registry.loadModule(path.join(__dirname, 'modules/' + x)),
    )

    mongoose
      .connect(config.db)
      .then(() => this.login(config.token))
      .then(async () => {
        const dokdo = new Dokdo(this, {
          noPerm(msg: Discord.Message): any {
            msg.react(config.reactions.noPerm)
          },
          owners: this.owners,
          prefix: config.prefix,
        })
        this.on('message', (msg) => dokdo.run(msg))
      })
  }
}
