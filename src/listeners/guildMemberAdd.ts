import { Listener } from 'discord-akairo'
import { GuildMember } from 'discord.js'
import QseClient from '../structures/client'

export default class GuildMemberAdd extends Listener {
  constructor() {
    super('guildMemberAdd', {
      emitter: 'client',
      event: 'guildMemberAdd',
    })
  }

  async exec(member: GuildMember) {
    const client = this.client as QseClient
    if (client.config.guild !== member.guild.id) return
    await member.roles.add(client.config.joinRole)
  }
}
