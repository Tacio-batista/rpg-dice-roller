const { Menu, MenuRange } = require("@grammyjs/menu");
const { playersID, links } = require("../constants/characters");



const rulesMenu = new Menu("rules-menu")
  .webApp("Gerais!", {url: links.rules.general})
  .webApp("Combate!", {url: links.rules.combat})
  .webApp("Magias!", {url: links.rules.spells});

module.exports = {
  rulesMenu
};
