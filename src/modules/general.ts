import QseClient from '../structures/client'
import PatchedModule from '../structures/PatchedModule'
import { listener } from '@pikostudio/command.ts'
import { GuildMember } from 'discord.js'

class General extends PatchedModule {
  constructor(public client: QseClient) {
    super(__filename)
  }

  @listener('guildMemberAdd')
  async guildMemberAdd(member: GuildMember) {
    const { client } = this
    if (client.config.guild !== member.guild.id) return
    await member.roles.add(client.config.joinRole)
  }
}

export function install(client: QseClient) {
  return new General(client)
}
