export default class SalvageUnionDowntimeAutomationRestock {
    static async addDowntimeButton(html) {

        const descriptionSection = html.find(`section.description-editor`)

        let tooltip = "Tooltip"
        descriptionSection.append(`<button type='button' title='${tooltip}' class="su-downtimeautomation-downtimebutton">Start Downtime</button>`)
          
    }

    static async startDowntime() {
        let playerActors = game.actors.filter(actor => actor.hasPlayerOwner)

        playerActors.forEach(actor => {
            this.refillActor(actor)
        });

        await ChatMessage.create({ 
            content:  game.i18n.format("salvage-union-downtime-automation.trader") +
            '<button type="button" class="su-downtimeautomation-traderbutton">'+game.i18n.format("salvage-union-downtime-automation.traderRoll")+'</button>', 
            speaker: { alias: game.user.name } 
        });

    }

    static async refillActor(actor) {
       if(actor.type == "pilot") {
        this.refillPilot(actor)
       }

       if(actor.type == "mech") {
        this.refillMech(actor)
       }
    }

    static async refillPilot(actor) {
        actor.update({ 'system.hp.value': actor.system.hp.max });
        actor.update({ 'system.ability-points.value': actor.system['ability-points'].max });
        await ChatMessage.create({ 
            content:  actor.name + game.i18n.format("salvage-union-downtime-automation.pilotRefilled"), 
            speaker: { alias: game.user.name } 
        });
    }

    static async refillMech(actor) {
        actor.update({ 'system.sp.value': actor.system.sp.max });
        actor.update({ 'system.energy-points.value': actor.system['energy-points'].max });
        actor.update({ 'system.heat.value': 0 });
        await ChatMessage.create({ 
            content:  actor.name + game.i18n.format("salvage-union-downtime-automation.mechRefilled"), 
            speaker: { alias: game.user.name } 
        });
    }
}