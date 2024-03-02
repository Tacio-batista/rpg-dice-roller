const { Bot, session } = require('grammy');
const { conversations, createConversation } = require("@grammyjs/conversations");
const { golpeFulminante, erroCritico, rollDice, playersID, selectName, handleChatTypeResponse, getResultForType } = require("./handlers");
const { rulesMenu, dgSheetsMenu, tibiusMenu, fergusMenu, abbadonMenu, helpMenu, deleteP, pointMenu} = require("./menus");
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

bot.command(["r", "roll", "rolar"], async (ctx) => {
  await deleteP(9);
  if(ctx.match !== ""){
  const result = await rollDice(ctx.match);
  const playerName = await selectName(ctx);
    await ctx.reply(`${result.total !== false ?`${playerName} rolou${result.text}`: result.text}`,{reply_to_message_id: ctx.message.message_id});
  
  }
});

bot.command("fulminante", async (ctx) => {
  await deleteP(9);
  const ID = String(ctx.from.id);
  if(await handleChatTypeResponse(ID, ctx)){
    const result = await rollDice("3d6",false,"V2");
    const output = await golpeFulminante(result.total);
    const playerName = await selectName(ctx);
    await ctx.replyWithMarkdownV2(`${playerName} rolou${result.text}\nE o resultado do *GOLPE FULMINANTE* foi:\n\n \\-\\> ||*${output}*\r||`,{reply_to_message_id: ctx.message.message_id});
  }
});
bot.command("erro", async (ctx) => {
  await deleteP(9);
  const ID = String(ctx.from.id);
  if(await handleChatTypeResponse(ID, ctx)){
    const result = await rollDice("3d6",false,"V2");
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
    const result = await rollDice("3d6"+divisor+" "+type, true);
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
bot.command("teste", async (ctx) => {
  await deleteP(9);
  if(ctx.match !== ""){
  // Inicializar a lista de divisão
  const str = ctx.match;
  let divisao = [];
  // Inicializar o valor e o sinal atuais
  let valor = [];
  let sinal = "";
  // Percorrer a string da esquerda para a direita
  for (let i = 0; i < str.length; i++){
    // Se o caractere for d, ignorar
    let c = str[i];
    if (c == "d") {
      if(!/^\d$/.test(str[i-1])){
        valor.push(1);
      }
      if(!/^\d$/.test(str[i+1])){
        valor.push(0);
      }
      continue;
    }else{
      for(let u = i+1; u < str.length; u++){
        if(str[u] !== "d" && /^\d$/.test(str[u]) && /^\d$/.test(str[u-1])){
          c +=str[u]; 
        }else{
          i = u-1;
          break;
        }
        if(u === str.length - 1){
          i = u;
        }
      }
    }
    // Se o caractere for uma letra maiúscula, adicionar ao valor atual

    if (!isNaN(c)) {
      valor.push(parseInt(c));
    }else if (c === "+" || c === "-" || c === "*") {
      if (valor.length === 0 ) {
        valor.push(0);
      }
      divisao.push({valor: valor, sinal: sinal});
      valor = [];
      sinal = c;
    }
    }
  
  divisao.push({valor: valor, sinal: sinal});
  divisao[0].sinal = "+";
  divisao = divisao.filter(objeto => !objeto.valor.includes(0));
  const index = divisao.findIndex(obj => obj.sinal === '*' && obj.valor.length === 1);

  if (index !== -1) {
    const objeto = divisao.splice(index, 1)[0];

    // Adicione o objeto removido de volta ao final da array
    divisao.push(objeto);
    console.log(objeto)
    
    // Remova quaisquer outros objetos '*' da matriz
    for (let i = divisao.length - 2; i >= 0; i--) {
      // console.log(divisao[i]);
      if (divisao[i].sinal === '*') {

        divisao.splice(i, 1);
      }
    }
  }

  console.log(divisao);
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
  { command: "ficha", description: "Dispõe a ficha do seu personagem" },
  { command: "help", description: "Lista de comandos explicados" }
]);
// bot.start();
module.exports = { bot };
