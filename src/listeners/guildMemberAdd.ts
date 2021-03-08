import {Listener} from "discord-akairo";
import {GuildMember} from "discord.js";

export default class GuildMemberAdd extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd'
        })
    }

    exec(member: GuildMember) {
    }
}