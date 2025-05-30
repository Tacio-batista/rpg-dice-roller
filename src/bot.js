const { Bot, session } = require('grammy');
const { conversations, createConversation } = require("@grammyjs/conversations");
const { golpeFulminante, erroCritico, rollDice, playersID, selectName, handleChatTypeResponse, getResultForType, rollTableDefine } = require("./handlers");
const { rulesMenu, manobrasMenu, dgSheetsMenu, tibiusMenu, fergusMenu, abbadonMenu, helpMenu, deleteP, pointMenu, historyMenu} = require("./menus");
const { getFormattedCharacters } = require("./utils");
const { links, body } = require("./constants/characters");
const { InlineKeyboard } = require("grammy");
const { bold, fmt, hydrateReply, italic, link, parseMode } = require(
  "@grammyjs/parse-mode",
);


const {
    BOT_API_TOKEN: token = '',
} = process.env;

// require("dotenv").config();

// const token = process.env.BOT_API_TOKEN || "";
// Defina seu token nas variáveis de ambiente do Vercel
const bot = new Bot(token);

// Anexe todos os middlewares

bot.use(session({ initial: () => ({}) }));

bot.use(hydrateReply);
bot.api.config.use(parseMode("Markdown"));

bot.use(rulesMenu);
bot.use(dgSheetsMenu);
bot.use(tibiusMenu);
bot.use(fergusMenu);
bot.use(abbadonMenu);
bot.use(helpMenu);
bot.use(pointMenu);
bot.use(historyMenu);
bot.use(manobrasMenu);

bot.command(["r", "roll", "rolar"], async (ctx) => {
  await deleteP(9);
  if(ctx.match !== ""){
  const roll = await rollTableDefine(ctx.match)
  console.log(roll.divisao);
  const result = await rollDice(roll.divisao);
  const playerName = await selectName(ctx);
    await ctx.reply(`${result.total !== false ?`${playerName} rolou*${roll.text}*${result.text}`: result.text}`,{reply_to_message_id: ctx.message.message_id});
  
  }
});

bot.command("manobras", async (ctx) => {
  await deleteP(9);
  const ID = String(ctx.from.id);
    if(await handleChatTypeResponse(ID, ctx)){
      await ctx.reply("Manobras!", { reply_markup: manobrasMenu});
    }
  });

bot.command(["hist", "historia", "lore"], async (ctx) => {
    await deleteP(9);
    const ID = String(ctx.from.id);
    if(await handleChatTypeResponse(ID, ctx)){
      await ctx.reply("História!", { reply_markup: historyMenu});
    }
  });

bot.command("fulminante", async (ctx) => {
  await deleteP(9);
  const ID = String(ctx.from.id);
  if(await handleChatTypeResponse(ID, ctx)){
    const roll = rollTableDefine("3d6");
    const result = await rollDice(roll.divisao,false,"V2", roll.text);
    const output = await golpeFulminante(result.total);
    const playerName = await selectName(ctx);
    await ctx.replyWithMarkdownV2(`${playerName} rolou${result.text}\nE o resultado do *GOLPE FULMINANTE* foi:\n\n \\-\\> ||*${output}*\r||`,{reply_to_message_id: ctx.message.message_id});
  }
});
bot.command("erro", async (ctx) => {
  await deleteP(9);
  const ID = String(ctx.from.id);
  if(await handleChatTypeResponse(ID, ctx)){
    const roll = rollTableDefine("3d6");
    const result = await rollDice(roll.divisao,false,"V2", roll.text);
    const output = await erroCritico(result.total);
    const playerName = await selectName(ctx);
    await ctx.replyWithMarkdownV2(`${playerName} rolou${result.text}\nE o resultado do *ERRO CRÍTICO* foi:\n\n \\-\\> ||${output}||`,{reply_to_message_id: ctx.message.message_id});
  }
});

bot.command("regras", async (ctx) =>{
  await deleteP(9);
  const ID = String(ctx.from.id);
  if(await handleChatTypeResponse(ID, ctx)){
    await ctx.reply("Regras!", { reply_markup: rulesMenu});
  }
});

bot.command(["imp","impacto"], async (ctx) =>{
  await deleteP(9);
  const ID = String(ctx.from.id);
  if(await handleChatTypeResponse(ID, ctx)){
    const playerName = await selectName(ctx);
    const REGEX = /(\w+)(\*\d*)?/;
    let type;
    let divisor;
      if(ctx.match){
    const match = ctx.match.match(REGEX);
    type =  match[1]?match[1]:"";
    divisor = match[2] ? match[2] : "";
      }
    const roll = rollTableDefine("3d6"+divisor);
    const result = await rollDice(roll.divisao, true, false, type);
    await ctx.reply(result.impFlag !== false ? `${playerName} rolou${result.text}` : result.text ,{reply_to_message_id: ctx.message.message_id});
  }
});

bot.command("ficha", async (ctx) =>{
  await deleteP(9);
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

bot.command(["ponto", "regiao"], async (ctx) =>{
  await deleteP(9);
  const ID = String(ctx.from.id);
  if(await handleChatTypeResponse(ID, ctx)){
    await ctx.reply("Escolha em que região quer ver os pontos de impacto.", {reply_markup: pointMenu});
  }
});

bot.command("help", async (ctx) => {
  await deleteP(9);
  const ID = String(ctx.from.id);
  await ctx.reply(`/r ou /roll ou /rolar -> Possui o formato "XdY\[[+/-Z\]]\[[*W\]] \[[texto\]]" onde *X* é o numero de dados, *Y* o número de lados, *Z* para somar ou subtrair algum modificador, *W* indica quantos resultados quer obter separadamnte e *texto* indica alguma possível descrição. Apenas *"d" e "Y" são obrigatórios* para obter alguma rolagem de fato.${await handleChatTypeResponse(ID) === true ? `\n/fulminante -> Irá rolar 3d6 automaticamente, retornar os valores e qual o resultado de acordo com a tabela de "Golpe Fulminante" do manual.\n/erro -> Assim como o comando anterior, irá rolar 3d6 automaticamente, retornar os valores e qual o resultado de acordo com a tabela de "Erro Crítico" do manual.\n/regras -> Menu resumido de regras, atualmente com as regras "combate", "magias" e "gerais".\n/ficha -> Da acesso a ficha do seu personagem (o Mestre tem acesso a todas).\n/tipo -> Lista todos os tipos de corpos aceitos para definir um 'ponto de impacto'.\n/impacto ou /imp -> Formato [tipo][*W] onde "tipo" é o tipo corporal do alvo e W indica quantos resultados quer obter separadamente. Irá rolar 3d6 automaticamente, retornar os valores e qual o resultado de acordo com as tabelas de "Ponto de Impacto"\n/ponto ou /regiao -> Abre o menu de descrições dos pontos de impactos da maioria dos tipos de corpos.` : ""}`, {reply_markup: helpMenu});
});
bot.command("tipo", async (ctx) =>{
  await deleteP(9);
  const ID = String(ctx.from.id);
  if(await handleChatTypeResponse(ID, ctx)){
    await ctx.reply(`Tipos aceitos:\n\n - ${Object.keys(body.types).map(type => type).join("\n - ")}`, {reply_markup: helpMenu});
  }
  
});

bot.api.setMyCommands([
  { command: "roll", description: "Use o formato XdY[+/-Z][*W] [texto]" },
  { command: "fulminante", description: "Rolagem para golpe fulminante" },
  { command: "erro", description: "Rolagem para erro crítico" },
  { command: "impacto", description: "Rolagem para ponto de impacto: [tipo][*W]" },
  { command: "tipo", description: "Dispõe a lista de tipos de corpos" },
  { command: "ponto", description: "Dispõe as descrições dos pontos de impacto" },
  { command: "regras", description: "Dispõe a lista de regras" },
  { command: "manobras", description: "Dispõe a lista resumida de possíveis manobras" },
  { command: "historia", description: "Dispõe a lista das histórias" },
  { command: "ficha", description: "Dispõe a ficha do seu personagem" },
  { command: "help", description: "Lista de comandos explicados" }
]);
// bot.start();
module.exports = { bot };
