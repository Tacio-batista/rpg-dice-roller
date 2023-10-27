const { Menu, MenuRange } = require("@grammyjs/menu");
const { playersID, links } = require("../constants/characters");
const { InlineKeyboard } = require("grammy");

const rulesMenu = new Menu("rules-menu")
  .url("Gerais!", links.rules.general)
  .row()
  .url("Combate!", links.rules.combat)
  .row()
  .url("Magias!", links.rules.spells)
  .row()
  .text("❎", (ctx) => ctx.deleteMessage());

const sheetsMenu = new Menu("sheets-menu")
  .url("Abrir!", async (ctx) => {
    if(String(ctx.from.id) === playersID.Tibius){
      return links.sheets.Tibius;
    }else if(String(ctx.from.id) === playersID.Abbadon){
      return links.sheets.Abbadon;
    }else if(String(ctx.from.id) === playersID.Fergus){
      return links.sheets.Fergus;
    }else{
        return "http://t.me.SquareDice_bot/";
    }
    return "http://t.me.SquareDice_bot/";
    
  })
  .row()
  .text("Fechar", (ctx) => ctx.deleteMessage());
  
  
const tibiusMenu = new Menu("tibius-menu")
  .url("Abrir!", links.sheets.Tibius)

const dgSheetsMenu = new Menu("dg-sheets-menu")  
  .url("Abbadon", links.sheets.Abbadon)
  .row()
  .url("Fergus", links.sheets.Fergus)
  .row()
  .url("Tibius", links.sheets.Tibius)
  .row()
  .text("❎", (ctx) => ctx.deleteMessage());
  
module.exports = {
  rulesMenu,
  sheetsMenu,
  dgSheetsMenu,
  tibiusMenu
};
