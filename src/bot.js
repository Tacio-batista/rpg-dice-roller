const { Bot, session } = require('grammy');
const { conversations, createConversation } = require("@grammyjs/conversations");
const { golpeFulminante, erroCritico, rollDice, playersID, selectName, handleChatTypeResponse } = require("./handlers");
const { rulesMenu, dgSheetsMenu, tibiusMenu, fergusMenu, abbadonMenu} = require("./menus");
const { getFormattedCharacters } = require("./utils");
const { links } = require("./constants/characters");
const { InlineKeyboard } = require("grammy");
// const { bold, fmt, hydrateReply, italic, link } = require(
//   "@grammyjs/parse-mode",
// );


const {
    BOT_API_TOKEN: token = '',
} = process.env;

// Defina seu token nas variáveis de ambiente do Vercel
const bot = new Bot(token);

// Anexe todos os middlewares

bot.use(session({ initial: () => ({}) }));
// bot.use(hydrateReply);
bot.use(rulesMenu);
bot.use(dgSheetsMenu);
bot.use(tibiusMenu);
bot.use(fergusMenu);
bot.use(abbadonMenu);

bot.command(["r", "roll", "rolar"], async (ctx) => {
  if(ctx.match !== ""){
  const result = await rollDice(ctx.match);
  const playerName = await selectName(ctx);
  await ctx.reply(`${result.total !== false ? `${playerName} rolou${result.text}`: result.text}`,{reply_to_message_id: ctx.message.message_id});}
});

bot.command("fulminante", async (ctx) => {
  const result = await rollDice("3d6");
  const output = await golpeFulminante(result.total);
  const playerName = await selectName(ctx);
  await ctx.reply(`${playerName} rolou${result.text}\nE o resultado do GOLPE FULMINANTE foi:\n\n${output}`,{reply_to_message_id: ctx.message.message_id});
});
bot.command("erro", async (ctx) => {
  const result = await rollDice("3d6");
  const output = await erroCritico(result.total);
  const playerName = await selectName(ctx);
  await ctx.reply(`${playerName} rolou${result.text}\nE o resultado do ERRO CRÍTICO foi:\n\n${output}`,{reply_to_message_id: ctx.message.message_id});
});

bot.command("regras", async (ctx) =>{
  await ctx.reply("Regras!", { reply_markup: rulesMenu});
});

bot.command("ficha", async (ctx) =>{
  const ID = String(ctx.from.id);
  // if(await handleChatTypeResponse(ID, ctx)){
    switch (ID) {
      case playersID.Abbadon:
        await ctx.reply("Ficha!", { reply_markup: abbadonMenu});
        break;
      case playersID.Fergus:
        await ctx.reply("Ficha!", { reply_markup: fergusMenu});
        break;
      case "au":
        await ctx.reply("Ficha!", { reply_markup: tibiusMenu});
        break;
      default:
        await ctx.reply("Fichas!", { reply_markup: dgSheetsMenu});
    // }
  }
});


bot.command("teste", async (ctx) =>{
  const ID = String(ctx.from.id);
  if(await handleChatTypeResponse(ID, ctx)){
    switch (ID) {
      case playersID.Abbadon:
        await ctx.reply("Ficha!", { reply_markup: abbadonMenu});
        break;
      case playersID.Fergus:
        await ctx.reply("Ficha!", { reply_markup: fergusMenu});
        break;
      case "au":
        await ctx.reply("Ficha!", { reply_markup: tibiusMenu});
        break;
      default:
        await ctx.reply("Fichas!", { reply_markup: dgSheetsMenu});
    }
  }
});



bot.api.setMyCommands([
  { command: "roll", description: "Use o formato XdY [texto]" },
  { command: "fulminante", description: "Rolagem para golpe fulminante" },
  { command: "erro", description: "Rolagem para erro crítico" },
  { command: "regras", description: "Dispõe a lista de regras" },
  // { command: "help", description: "Dispõe a lista de regras" },
],
  {type: "chat", chat_id: playersID.Abbadon});
module.exports = { bot };
