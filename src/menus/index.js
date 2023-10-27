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
  ;

module.exports = {
  rulesMenu,
};
