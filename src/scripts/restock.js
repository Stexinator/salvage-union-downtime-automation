export default class SalvageUnionDowntimeAutomationRestock {
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
        
    }

    static async refillMech(actor) {
        actor.update({ 'system.sp.value': actor.system.sp.max });
        actor.update({ 'system.energy-points.value': actor.system['energy-points'].max });
        actor.update({ 'system.heat.value': 0 });
       
    }
}