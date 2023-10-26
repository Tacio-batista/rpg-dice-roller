const { Menu, MenuRange } = require("@grammyjs/menu");
const { playersID, links } = require("../constants/characters");



const rulesMenu = new Menu("rules-menu")
  .webApp("Gerais!", links.rules.general)
  .row()
  .webApp("Combate!",links.rules.combat)
  .row()
  .webApp("Magias!", links.rules.spells);

module.exports = {
  rulesMenu
};
