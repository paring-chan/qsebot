import {Listener} from "discord-akairo";
import {Message} from "discord.js";
import Counter from '../models/Counter'
import {VM} from "vm2";

export default class Ready extends Listener {
    constructor() {
        super('messageInvalid', {
            emitter: 'commandHandler',
            event: 'messageInvalid'
        })
    }

    async exec(msg: Message) {
        await Counter.updateOne({
            message: msg.content
        }, {
            $inc: {
                count: 1
            }
        })
        const counter = await Counter.findOne({
            message: msg.content
        })
        if (!counter) return
        counter.count++
        const vm = new VM({
            sandbox: {
                msg,
                count: counter.count
            }
        })
        await msg.channel.send(vm.run('`' + counter.response + '`'))
    }
}