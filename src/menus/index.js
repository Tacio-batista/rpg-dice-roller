const { Menu, MenuRange } = require("@grammyjs/menu");
const { playersID, links } = require("../constants/characters");



const rulesMenu = new Menu("rules-menu")
  .webApp(links.rules.general)
  .row()
  .webApp(links.rules.combat)
  .row()
  .webApp(links.rules.spells);

module.exports = {
  rulesMenu
};
