const { Bot, session } = require('grammy');
const { conversations, createConversation } = require("@grammyjs/conversations");
const { golpeFulminante, erroCritico, rollDice, playersID, selectName, handleChatTypeResponse, getResultForType } = require("./handlers");
const { rulesMenu, dgSheetsMenu, tibiusMenu, fergusMenu, abbadonMenu, helpMenu} = require("./menus");
const { getFormattedCharacters } = require("./utils");
const { links, body } = require("./constants/characters");
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
bot.use(helpMenu);

bot.command(["r", "roll", "rolar"], async (ctx) => {
  if(ctx.match !== ""){
  const result = await rollDice(ctx.match);
  const playerName = await selectName(ctx);
  await ctx.reply(`${result.total !== false ? `${playerName} rolou${result.text}`: result.text}`,{reply_to_message_id: ctx.message.message_id});}
});

bot.command("fulminante", async (ctx) => {
  const ID = String(ctx.from.id);
  if(await handleChatTypeResponse(ID, ctx)){
    const result = await rollDice("3d6");
    const output = await golpeFulminante(result.total);
    const playerName = await selectName(ctx);
    await ctx.reply(`${playerName} rolou${result.text}\nE o resultado do GOLPE FULMINANTE foi:\n\n${output}`,{reply_to_message_id: ctx.message.message_id});
  }
});
bot.command("erro", async (ctx) => {
  const ID = String(ctx.from.id);
  if(await handleChatTypeResponse(ID, ctx)){
    const result = await rollDice("3d6");
    const output = await erroCritico(result.total);
    const playerName = await selectName(ctx);
    await ctx.reply(`${playerName} rolou${result.text}\nE o resultado do ERRO CRÍTICO foi:\n\n${output}`,{reply_to_message_id: ctx.message.message_id});
  }
});

bot.command("regras", async (ctx) =>{
  const ID = String(ctx.from.id);
  if(await handleChatTypeResponse(ID, ctx)){
    await ctx.reply("Regras!", { reply_markup: rulesMenu});
  }
});

bot.command(["imp","impacto"], async (ctx) =>{
  const ID = String(ctx.from.id);
  if(await handleChatTypeResponse(ID, ctx)){
    const playerName = await selectName(ctx);
    const REGEX = /(\w+)(\*\d*)?/;
    const match = ctx.match.match(REGEX);
    const numberOfDice =  match[1];
    const divisorMatch = match[2] ? match[2] : "";
    await ctx.reply("3d6"+divisorMatch+" "+numberOfDice)
    const result = await rollDice("3d6"+divisorMatch+" "+numberOfDice);
    await ctx.reply(result.total)
    await ctx.reply(`${playerName} rolou${result.text}` ,{reply_to_message_id: ctx.message.message_id});
  }
});

bot.command("ficha", async (ctx) =>{
  const ID = String(ctx.from.id);
  if(await handleChatTypeResponse(ID, ctx)){
    switch (ID) {
      case playersID.Abbadon:
        await ctx.reply("Ficha!", { reply_markup: abbadonMenu});
        break;
      case playersID.Fergus:
        await ctx.reply("Ficha!", { reply_markup: fergusMenu});
        break;
      case playersID.Tibius:
        await ctx.reply("Ficha!", { reply_markup: tibiusMenu});
        break;
      default:
        await ctx.reply("Fichas!", { reply_markup: dgSheetsMenu});
    }
  }
});

bot.command("help", async (ctx) => {
  const ID = String(ctx.from.id);
  await ctx.reply(`/r ou /roll ou /rolar -> Possui o formato "XdY[+/-Z][*W] [text]" onde X é o numero de dados, Y o número de lados, Z para somar ou subtrair algum modificador, W indica quantos resultados quer obter e text indica alguma possível descrição. Apenas "d" e "Y" são obrigatórios para obter alguma rolagem de fato.${await handleChatTypeResponse(ID) === true ? `\n/fulminante -> Irá rolar 3d6 automaticamente, retornar os valores e qual o resultado de acordo com a tabela de "Golpe Fulminante" do manual.\n/erro -> Assim como o comando anterior, irá rolar 3d6 automaticamente, retornar os valores e qual o resultado de acordo com a tabela de "Erro Crítico" do manual.\n/regras -> Menu resumido de regras, atualmente com as regras "combate", "magias" e "gerais".\n/ficha -> Da acesso a ficha do seu personagem (o Mestre tem acesso a todas).\n/tipo -> Lista todos os tipos de corpos aceitos para definir um 'ponto de impacto'.\n/ponto ou /impacto -> Irá rolar 3d6 automaticamente, retornar os valores e qual o resultado de acordo com as tabelas de "Ponto de Impacto"` : ""}`, {reply_markup: helpMenu});
});
bot.command("tipo", async (ctx) =>{
  const ID = String(ctx.from.id);
  if(await handleChatTypeResponse(ID, ctx)){
    await ctx.reply(`Tipos aceitos:\n\n${Object.keys(body.types).map(type => type).join("\n")}`, {reply_markup: helpMenu});
  }
  
})



bot.api.setMyCommands([
  { command: "roll", description: "Use o formato XdY[+/-Z][*W] [texto]" },
  { command: "fulminante", description: "Rolagem para golpe fulminante" },
  { command: "erro", description: "Rolagem para erro crítico" },
  { command: "impacto", description: "Rolagem para ponto de impacto" },
  { command: "tipo", description: "Dispõe a lista de tipos de corpos" },
  { command: "regras", description: "Dispõe a lista de regras" },
  { command: "help", description: "Lista de comandos explicados" }
]);
module.exports = { bot };
