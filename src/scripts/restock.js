export default class SalvageUnionDowntimeAutomationRestock {

    static async refillActor(actor, techlevel) {
       if(actor.type == "pilot") {
        this.refillPilot(actor)
       }

       if(actor.type == "mech") {
        this.refillMech(actor, techlevel)
       }
    }

    static async refillPilot(actor) {
        this.refillAllItemsWithUses(actor)
        actor.update({ 'system.hp.value': actor.system.hp.max });
        actor.update({ 'system.ability-points.value': actor.system['ability-points'].max });
        
    }

    static async refillMech(actor, techlevel) {
        this.refillAllItemsWithUses(actor)
        this.repairItems(actor, techlevel)
        actor.update({ 'system.sp.value': actor.system.sp.max });
        actor.update({ 'system.energy-points.value': actor.system['energy-points'].max });
        actor.update({ 'system.heat.value': 0 });
       
    }

    static async refillAllItemsWithUses(actor) {
        let systems = actor?.system?.systems || [];
        let modules = actor?.system?.modules || [];
        let equipments = actor?.system?.equipment || [];
        let abilities = actor?.system?.abilities || [];

        let items = systems.concat(modules).concat(equipments).concat(abilities).filter(item =>(item.system.uses.max && item.system.uses.max != 0))

        items.forEach(item => {
            item.update({'system.uses.value': item.system.uses.max})
        })

    }

    static async repairItems(actor, techlevel) {
        let systems = actor?.system?.systems || [];
        let modules = actor?.system?.modules || [];
        let chassis = actor?.system?.chassis || [];


        // 0 = active, 1 = damaged, 2 = destroyed
        let items = systems.concat(modules).concat(chassis).filter(item =>(item.system.status == 1))

        items.forEach(item => {
            if(parseInt(item.system.techLevel.replace("T", "")) <= parseInt(techlevel.replace("T", "")) ) {
                item.update({'system.status': 0})
            }
        })

    }
}