import {AkairoClient, CommandHandler, ListenerHandler} from "discord-akairo";
import Discord, {Team, User} from "discord.js";
// @ts-ignore
import config from '../../config.json'
import Dokdo from "dokdo";
import path from "path";
import mongoose from "mongoose";

export default class QseClient extends AkairoClient {
    config = config

    commandHandler = new CommandHandler(this, {
        prefix: config.prefix,
        directory: path.join(__dirname, '../commands'),
        automateCategories: true
    })

    listenerHandler = new ListenerHandler(this, {
        directory: path.join(__dirname, '../listeners')
    })

    constructor() {
        super({
            restTimeOffset: 0,
            intents: Discord.Intents.ALL
        })

        this.listenerHandler.setEmitters({
            client: this,
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler
        })

        this.listenerHandler.loadAll()

        this.commandHandler.loadAll()

        mongoose.connect(config.db).then(() => this.login(config.token)).then(async () => {
            const app = await this.fetchApplication()

            let owner: string[] = []

            if (app.owner instanceof User) {
                owner = [app.owner.id]
            } else if (app.owner instanceof Team) {
                owner = app.owner.members.map(r=>r.id)
            }
            this.ownerID = owner
            const dokdo = new Dokdo(this, {
                noPerm(msg: Discord.Message): any {
                    msg.react(config.reactions.noPerm)
                },
                owners: owner,
                prefix: config.prefix
            })
            this.on('message', msg => dokdo.run(msg))
        })
    }
}