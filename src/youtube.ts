import QseClient from "./structures/client";

const YouTubeNotifier = require('youtube-notification')
const config = require('../config.json')
import crypto from 'crypto'
import {TextChannel} from "discord.js";

export default function initYoutube(client: QseClient) {
    const notifier = new YouTubeNotifier({
        hubCallback: config.youtube.url,
        port: config.youtube.port,
        secret: crypto.randomBytes(100).toString(),
        path: '/youtube'
    })
    notifier.setup()

    notifier.on('notified', (data: any) => {
        if (data.channel.id === config.youtube.id) {
            ;(client.guilds.cache.get(config.guild)?.channels.cache.get(config.youtube.channel) as TextChannel|undefined)?.send(`큐튜브 업로드\n${data.video.link}`)
        } else if (config.youtube.extraChannels.includes(data.channel.id)) {
            ;(client.guilds.cache.get(config.guild)?.channels.cache.get(config.youtube.extraChannel) as TextChannel|undefined)?.send(`ㄴㅇㅊㅇ\n${data.video.link}`)
        }
    })

    notifier.subscribe(config.youtube.id)
    for (const i of config.youtube.extraChannels) {
        notifier.subscribe(i)
    }
}