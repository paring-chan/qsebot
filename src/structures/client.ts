import {AkairoClient, CommandHandler, ListenerHandler} from "discord-akairo";
import Discord, {Team, User} from "discord.js";
// @ts-ignore
import config from '../../config.json'
import Dokdo from "dokdo";
import path from "path";

export default class QseClient extends AkairoClient {
    config = config

    commandHandler = new CommandHandler(this, {
        prefix: '!큐세 ',
        directory: path.join(__dirname, '../commands'),
        automateCategories: true
    })

    listenerHandler = new ListenerHandler(this, {
        directory: path.join(__dirname, '../listeners')
    })

    constructor() {
        super({
            restTimeOffset: 0
        })

        this.listenerHandler.loadAll()

        this.commandHandler.loadAll()

        this.login(config.token).then(async () => {
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
                prefix: '!큐세 '
            })
            this.on('message', msg => dokdo.run(msg))
        })
    }
}