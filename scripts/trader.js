export default class SalvageUnionDowntimeAutomationTrader {
        static async tradingBay() {
            let crawler = game.actors.find(actor => actor.type == "union-crawler")

            let tradingBay = crawler.system.bays.find(bay => bay.name.includes("Trading"))
            
            let result = await tradingBay.system.table.roll()

            const messageTemplate = 'systems/salvage-union/templates/chat/item-table-roll.hbs'
            const templateContext = {
                name: tradingBay.name,
                result: result.results[0],
                system: tradingBay.system,
                roll: result.roll,
                activeStatus: CONFIG.SALVAGE.statusTypes.ACTIVE,
              }
          
            const content = await renderTemplate(messageTemplate, templateContext)
            const chatData = {
                user: game.user.id,
                roll: result.roll,
                content: content,
                sound: CONFIG.sounds.dice,
                type: CONST.CHAT_MESSAGE_TYPES.ROLL,
            }

            ChatMessage.create(chatData)
    }
}