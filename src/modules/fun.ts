import PatchedModule from '../structures/PatchedModule'
import QseClient from '../structures/client'

class Fun extends PatchedModule {
  constructor(private client: QseClient) {
    super(__filename)
  }
}

export function install(client: QseClient) {
  return new Fun(client)
}
