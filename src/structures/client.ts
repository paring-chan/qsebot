import Discord, {Team, User} from 'discord.js'
import Dokdo from 'dokdo'
import mongoose from 'mongoose'
import {CommandClient} from '@pikostudio/command.ts'
import * as fs from 'fs'
import path from 'path'

const config = require(path.join(process.cwd(), 'config.json'))

export default class QseClient extends CommandClient {
    config = config

    constructor() {
        super(
            {
                restTimeOffset: 0,
                partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'USER', 'REACTION'],
                intents: [
                    'GUILDS',
                    'GUILD_MEMBERS',
                    'GUILD_BANS',
                    'GUILD_EMOJIS',
                    'GUILD_INTEGRATIONS',
                    'GUILD_WEBHOOKS',
                    'GUILD_INVITES',
                    'GUILD_VOICE_STATES',
                    'GUILD_PRESENCES',
                    'GUILD_MESSAGES',
                    'GUILD_MESSAGE_REACTIONS',
                    'GUILD_MESSAGE_TYPING',
                    'DIRECT_MESSAGES',
                    'DIRECT_MESSAGE_REACTIONS',
                    'DIRECT_MESSAGE_TYPING',
                ],
            },
            {
                prefix: config.prefix,
                owners: config.owners,
            },
        )

        fs.readdirSync(path.join(__dirname, '../modules')).forEach((x) =>
            this.registry.loadModule(path.join(__dirname, '../modules/' + x)),
        )

        mongoose
            .connect(config.db, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            })
            .then(() => this.login(config.token))
        this.once('ready', async () => {
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
