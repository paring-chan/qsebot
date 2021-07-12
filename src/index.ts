import 'bluebird-global'

import QseClient from './structures/client'
import init from "./twitch";

init(new QseClient())

process.on('uncaughtException', console.error)
process.on('unhandledRejection', console.error)
