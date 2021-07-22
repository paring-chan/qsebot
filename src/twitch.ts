import {ClientCredentialsAuthProvider} from "twitch-auth";
import QseClient from "./structures/client";
import {ApiClient, HelixStream} from "twitch";
import {SimpleAdapter, WebHookListener} from "twitch-webhooks";
import {TextChannel} from "discord.js";

export default async function init(client: QseClient) {
    const auth = new ClientCredentialsAuthProvider(client.config.twitch.clientID, client.config.twitch.clientSecret)
    const api = new ApiClient({authProvider: auth})
    const webhook = new WebHookListener(api, new SimpleAdapter({
        hostName: client.config.twitch.host,
        listenerPort: client.config.twitch.port
    }))
    await webhook.listen()
    const id = await api.helix.users.getUserByName(client.config.twitch.user)
    if (!id) return
    let prevStream = await api.helix.streams.getStreamByUserId(id) || undefined
    await webhook.subscribeToStreamChanges(id, async (stream?: HelixStream) => {
        if (stream) {
            if (!prevStream) {
                await (client.guilds.cache.get(client.config.guild)?.channels.cache.get(client.config.twitch.channel) as TextChannel|undefined)?.send('켯서요\nhttps://twitch.tv/qse__')
            }
        }
    })
}
