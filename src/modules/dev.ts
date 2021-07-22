import QseClient from '../structures/client'
import {command, Context, DebugModule, listener, ownerOnly} from '@pikostudio/command.ts'
import PatchedModule from '../structures/PatchedModule'

class Dev extends PatchedModule {
  constructor(public client: QseClient) {
    super(__filename)
  }

  @ownerOnly
  @command({name: 'dev'})
  dev(ctx: Context) {
    return DebugModule.run(ctx)
  }

  // @ownerOnly
  // @command({ name: '리로드', aliases: ['reload'] })
  // async reload(msg: Message) {
  //   const modules = this.client.registry.modules
  //     .filter((x) => x.__path.startsWith(__dirname))
  //     .values()
  //   let result = '```\n'
  //   let success = 0
  //   let failed = 0
  //   for (const module of modules) {
  //     try {
  //       await this.client.registry.reloadModule(module)
  //       result += `✅ ${module.constructor.name}\n`
  //       success++
  //     } catch {
  //       result += `🚫 ${module.constructor.name}\n`
  //       failed++
  //     }
  //   }
  //   result += `\`\`\`\n${success} successful, ${failed} failed.`
  //   await msg.reply(result)
  //   console.log(`=========== ${chalk.cyan('[INFO]')} RELOADED ===========`)
  // }

  @listener('ready')
  ready() {
    console.log(`Logged in as ${this.client.user!.tag}`)
  }

  @listener('commandError')
  commandError(err: Error) {
    console.log(err)
  }
}

export function install(client: QseClient) {
  return new Dev(client)
}
