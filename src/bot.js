const { Bot, session } = require('grammy');
const { conversations, createConversation } = require("@grammyjs/conversations");
const { golpeFulminante, erroCritico, rollDice, playersID, selectName } = require("./handlers");
const { rulesMenu } = require("./menus");
const { getFormattedCharacters } = require("./utils");
const { catchItem, deleteItem } = require("./config/storage");
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


const weblink = "http://t.me/oEscudeiro_bot/DGrules";

bot.command(["r", "roll", "rolar"], async (ctx) => {
  const result = await rollDice(ctx.match);
  const playerName = await selectName(ctx);
  await ctx.reply(`${playerName} rolou${result.text}`,{reply_to_message_id: ctx.message.message_id});
});

bot.command("fulminante", async (ctx) => {
  const result = await rollDice("3d6");
  const output = await golpeFulminante(result.total);
  const playerName = await selectName(ctx);
  await ctx.reply(`${playerName} rolou${result.text}\n\nE o resultado do GOLPE FULMINANTE foi:\n\n${output}`,{reply_to_message_id: ctx.message.message_id});
});
bot.command("erro", async (ctx) => {
  const result = await rollDice("3d6");
  const output = await erroCritico(result.total);
  const playerName = await selectName(ctx);
  await ctx.reply(`${playerName} rolou${result.text}\n\nE o resultado do ERRO CRÍTICO foi:\n\n${output}`,{reply_to_message_id: ctx.message.message_id});
});

bot.command("regras", async (ctx) =>{
  await ctx.reply("Regras!", { reply_markup: rulesMenu });
});


bot.api.setMyCommands([
  { command: "roll", description: "Use o formato XdY [texto]." },
  { command: "fulminante", description: "Golpe fulminante." },
  { command: "erro", description: "Erro crítico." },
]);
module.exports = { bot };
