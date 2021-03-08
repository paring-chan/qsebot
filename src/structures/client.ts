import { AkairoClient } from "discord-akairo";
// @ts-ignore
import config from '../config.json'

export default class QseClient extends AkairoClient {
    config = config

    constructor() {
        super()

    }
}