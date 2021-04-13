import QseClient from './structures/client'

new QseClient()

process.on('uncaughtException', console.error)
process.on('unhandledRejection', console.error)
