const { Menu, MenuRange } = require("@grammyjs/menu");
const { playersID, links } = require("../constants/characters");
const { InlineKeyboard } = require("grammy");

const rodape = new MenuRange()
  .row()
  .text("❎", (ctx) => ctx.deleteMessage());


const rulesMenu = new Menu("rules-menu")
  .url("Gerais!", links.rules.general)
  .row()
  .url("Combate!", links.rules.combat)
  .row()
  .url("Magias!", links.rules.spells)
  .row()
  .text("❎", (ctx) => ctx.deleteMessage());

const abbadonMenu = new Menu("abbadon-menu")
  .url("Abrir!", links.sheets.Abbadon)
  .dynamic( async () => rodape);
  
const tibiusMenu = new Menu("tibius-menu")
  .url("Abrir!", links.sheets.Tibius)
  .dynamic( async () => rodape);
const fergusMenu = new Menu("fergus-menu")
  .url("Abrir!", links.sheets.Fergus)
  .dynamic( async () => rodape);

const dgSheetsMenu = new Menu("dg-sheets-menu")  
  .url("Abbadon", links.sheets.Abbadon)
  .row()
  .url("Fergus", links.sheets.Fergus)
  .row()
  .url("Tibius", links.sheets.Tibius)
  .dynamic( async () => rodape);
  
module.exports = {
  rulesMenu,
  sheetsMenu,
  dgSheetsMenu,
  tibiusMenu,
  abbadonMenu,
  fergusMenu
};
