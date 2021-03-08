import { AkairoClient } from "discord-akairo";
import {Team, User} from "discord.js";
// @ts-ignore
import config from '../config.json'

export default class QseClient extends AkairoClient {
    config = config

    constructor() {
        super()
        this.login(config.token).then(async () => {
            const app = await this.fetchApplication()

            let owner: string[] = []

            if (app.owner instanceof User) {
                owner = [app.owner.id]
            } else if (app.owner instanceof Team) {
                owner = app.owner.members.map(r=>r.id)
            }
            this.ownerID = owner
        })
    }
}