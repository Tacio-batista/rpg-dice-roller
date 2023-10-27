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
  .dynamic(async (ctx) => {
    const range = new MenuRange();
    if(String(ctx.from.id) !== playersID.Mestre) {
      range
        .url("Abrir!", (ctx) => {
          switch(String(ctx.from.id)){
            case playersID.Tibius:
              return links.sheets.Tibius;
            case playersID.Abbadon:
              return links.sheets.Abbadon;
            case playersID.Fergus:
              return links.sheets.Fergus;
            default:
              return "http://t.me.SquareDice_bot"
          }
        })
        .row()
        .text("fechar", (ctx) => ctx.deleteMessage());
    }else{
      range
      .url("Abbadon", links.sheets.Abbadon)
      .row()
      .url("Fergus", links.sheets.Fergus)
      .row()
      .url("Tibius", links.sheets.Tibius)
      .row()
      .text("❎", (ctx) => ctx.deleteMessage());
    }
    return range;
  })

module.exports = {
  rulesMenu,
  sheetsMenu
};
