import SalvageUnionDowntimeAutomation from './downtime.js'
import SalvageUnionDowntimeAutomationRestock from './restock.js'
import SalvageUnionDowntimeAutomationTrader from './trader.js'

Hooks.on('renderSalvageUnionActorSheet', async function(actor, html) {

    if(actor.object.type == "union-crawler") {
        SalvageUnionDowntimeAutomation.addDowntimeButton(actor.object, html)
    }

    html.find('.su-downtimeautomation-downtimebutton').on('click', ev => {
        SalvageUnionDowntimeAutomation.startDowntime(ev);
    })

    
});

Hooks.on('renderChatMessage', async function(message, html){
    html.find('.su-downtimeautomation-traderbutton').on('click', _ => {
        SalvageUnionDowntimeAutomationTrader.tradingBay();
    })
});