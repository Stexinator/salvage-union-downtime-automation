import SalvageUnionDowntimeAutomationRestock from './restock.js'
import SalvageUnionDowntimeAutomationTrader from './trader.js'

Hooks.on('renderSalvageUnionActorSheet', async function(actor, html) {

    if(actor.object.type == "union-crawler") {
        SalvageUnionDowntimeAutomationRestock.addDowntimeButton(html)
    }

    html.find('.su-downtimeautomation-downtimebutton').on('click', _ => {
        SalvageUnionDowntimeAutomationRestock.startDowntime();
    })

    
});

Hooks.on('renderChatMessage', async function(message, html){
    html.find('.su-downtimeautomation-traderbutton').on('click', _ => {
        SalvageUnionDowntimeAutomationTrader.tradingBay();
    })
});