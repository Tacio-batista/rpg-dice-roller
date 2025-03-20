const { Menu, MenuRange } = require("@grammyjs/menu");
const { playersID, links } = require("../constants/characters");
const { InlineKeyboard } = require("grammy");
const { getDescForPoint } = require("../handlers");

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
  .url("Manobras!", links.rules.manobras)
  .dynamic( async () => rodape);

const manobrasMenu = new Menu("manobras-menu")
  .url("Manobras!", links.rules.manobras)
  .dynamic( async () => rodape);

const historyMenu = new Menu("history-menu")
  .url("Mons Ignus!", links.history.ignus)
  .dynamic( async () => rodape);
  
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
  
  
const P = [
  new Set(), // Abbadon/Equipados'   [0]
  new Set(), // Fergus/Desequipados  [1]
  new Set(), // Tibius/Cubo          [2]
  new Set(), // Tibius/Cubo          [3]
];
function deleteP(excp) {
  P.forEach((conjunto, i) => {
    if (excp !== i) conjunto.clear();
  });
}

function toggleP(id, excp) {
  if (!P[excp].delete(id)) P[excp].add(id);
}

  
const helpMenu = new Menu("help-menu")
  .text("❎", (ctx) => ctx.deleteMessage());

const pointMenu = new Menu("point-menu")
  .text(
    (ctx) => (P[0].has("Cabeça") ? "❌ Cabeça" : "⭕ Cabeça"),
    async (ctx) => {
      deleteP(0);
      toggleP("Cabeça", 0);
      
      const head = await getDescForPoint();

      if (P[0].has("Cabeça")) {
        await ctx.editMessageText(`${head.headDesc}\n\nˆˆPontos de impacto na cabeçaˆˆ`);
      } else {
    await ctx.editMessageText("Escolha em que região quer ver os pontos de impacto.");
      }
    }
  )
  .text(
    (ctx) => (P[1].has("Corpo") ? "❌ Corpo" : "⭕ Corpo"),
    async (ctx) => {
      deleteP(1);
      toggleP("Corpo", 1);
      
      const body = await getDescForPoint();

      if (P[1].has("Corpo")) {
        await ctx.editMessageText(`${body.bodyDesc}\n\nˆˆPontos de impacto no corpoˆˆ`);
      } else {
    await ctx.editMessageText("Escolha em que região quer ver os pontos de impacto.");
      }
    }
  )
  .row()
  .text("❎", (ctx) => ctx.deleteMessage())
  .text(
    (ctx) => (P[2].has("Membro") ? "❌ Membro" : "⭕ Membro"),
    async (ctx) => {
      deleteP(2);
      toggleP("Membro", 2);
      
      const member = await getDescForPoint();

      if (P[2].has("Membro")) {
        await ctx.editMessageText(`${member.memberDesc}\n\nˆˆPontos de impacto no membroˆˆ`);
      } else {
    await ctx.editMessageText("Escolha em que região quer ver os pontos de impacto.");
      }
    }
  ).text(
    (ctx) => (P[3].has("Extremidade") ? "❌ Extremidade" : "⭕ Extremidade"),
    async (ctx) => {
      deleteP(3);
      toggleP("Extremidade", 3);
      
      const extr = await getDescForPoint();
      if (P[3].has("Extremidade")) {
        await ctx.editMessageText(`${extr.extrDesc}\n\nˆˆPontos de impacto na extremidadeˆˆ`);
      } else {
    await ctx.editMessageText("Escolha em que região quer ver os pontos de impacto.");
      }
    }
  );
  
  
module.exports = {
  rulesMenu,
  dgSheetsMenu,
  tibiusMenu,
  abbadonMenu,
  fergusMenu,
  helpMenu,
  deleteP,
  pointMenu,
  historyMenu,
  manobrasMenu,
};
