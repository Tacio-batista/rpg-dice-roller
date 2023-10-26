const { Menu, MenuRange } = require("@grammyjs/menu");
const { playersID, links } = require("../constants/characters");
const { InlineKeyboard } = require("grammy");



const rulesMenu = new Menu("rules-menu")
  .webApp("Gerais!", "https://t.me/SquareDice_bot/regrasGerais")
  .webApp("Combate!", links.rules.combat)
  .webApp("Magias!", "http://t.me/SquareDice_bot/regrasMagias");
const rulesau = new InlineKeyboard()
  .webApp("Gerais!", links.rules.general)
  .webApp("Combate!", links.rules.combat)
  .webApp("Magias!", links.rules.spells);

module.exports = {
  rulesMenu,
  rulesau
};
