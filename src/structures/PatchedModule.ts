import { Module } from '@pikostudio/command.ts'
import chalk from 'chalk'

export default class PatchedModule extends Module {
    load() {
        super.load()
        console.info(
            `${chalk.blue('[INFO]')} Module ${this.constructor.name} loaded.`,
        )
    }

    unload() {
        super.unload()
        console.info(
            `${chalk.blue('[INFO]')} Module ${this.constructor.name} unloaded.`,
        )
    }
}
