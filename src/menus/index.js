const { Menu, MenuRange } = require("@grammyjs/menu");
const { playersID } = require("../constants/characters");

const rulesMenu = new Menu("rules-menu")
  .webApp("Au")

module.exports = {
  rulesMenu
};
