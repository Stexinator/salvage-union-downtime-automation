import SalvageUnionDowntimeAutomationRestock from "./restock.js"

export default class SalvageUnionDowntimeAutomation {
    static async addDowntimeButton(html) {

        const descriptionSection = html.find(`section.description-editor`)

        descriptionSection.append(`<button type='button' class="su-downtimeautomation-downtimebutton">Start Downtime</button>`)
          
    }

    static async startDowntime() {
        let playerActors = game.actors.filter(actor => actor.hasPlayerOwner)

        playerActors.forEach(actor => {
            SalvageUnionDowntimeAutomationRestock.refillActor(actor)
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