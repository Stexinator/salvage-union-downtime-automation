import SalvageUnionDowntimeAutomationRestock from "./restock.js"

export default class SalvageUnionDowntimeAutomation {
    static async addDowntimeButton(actor, html) {

        const descriptionSection = html.find(`section.description-editor`)

        descriptionSection.append(`<button type='button' class="su-downtimeautomation-downtimebutton" tech-level='${actor.system.techLevel}'>Start Downtime</button>`)
          
    }

    static async startDowntime(ev) {
        let playerActors = game.actors.filter(actor => actor.hasPlayerOwner)

        let techlevel = ev.currentTarget.attributes['tech-level'].value

        playerActors.forEach(actor => {
            SalvageUnionDowntimeAutomationRestock.refillActor(actor, techlevel)
        });
        await ChatMessage.create({ 
            content:  game.i18n.format("salvage-union-downtime-automation.pilotRefilled"), 
            speaker: { alias: game.user.name } 
        });
        await ChatMessage.create({ 
            content: game.i18n.format("salvage-union-downtime-automation.mechRefilled"), 
            speaker: { alias: game.user.name } 
        });

        await ChatMessage.create({ 
            content:  game.i18n.format("salvage-union-downtime-automation.downtimeActions") +
            '<button type="button" class="su-downtimeautomation-traderbutton">'+game.i18n.format("salvage-union-downtime-automation.traderRoll")+'</button>', 
            speaker: { alias: game.user.name } 
        });

    }
}