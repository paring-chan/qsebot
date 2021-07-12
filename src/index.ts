import 'bluebird-global'

import QseClient from './structures/client'
import init from "./twitch";
import initYoutube from "./youtube";

const client = new QseClient()

init(client)

initYoutube(client)

process.on('uncaughtException', console.error)
process.on('unhandledRejection', console.error)
