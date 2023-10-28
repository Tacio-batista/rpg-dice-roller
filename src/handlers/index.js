const { playersID, bodyTypes, erroTable, fulminanteTable } = require("../constants/characters");
const { statusValue, idStatus, P} = require("../menus");
const { InlineKeyboard } = require("grammy");

function roll3d6() {
  let total = 0;
  for (let i = 0; i < 3; i++) {
    total += Math.floor(Math.random() * 6) + 1;
  }
  return total;
}

function getResultForType(type) {
  const result = roll3d6();
  if (bodyTypes[type]) {
    return bodyTypes[type][result];
  } else {
    return "Tipo desconhecido.";
  }
}

function handleChatTypeResponse(chatID, ctx) {
  let pass = false;
  const IDs = Object.values(playersID);
  if (IDs.find((id) => id === chatID)) {
    pass = true;
  } else {
    ctx.reply("Você ainda não está cadastrado.");
  }
  return pass;
}


function selectName(ctx){
  switch(String(ctx.from.id)){
    
    case playersID.Tibius:
      return "Tibius";
      
    case playersID.Abbadon:
      return "Abbadon";
      
    case playersID.Mestre:
      return "Mestre";
      
    case playersID.Fergus:
      return "Fergus";
      
    default:
      return `@${ctx.from.username? ctx.from.username : ctx.from.first_name}`;
  }
  return;
}

function golpeFulminante(value) {

  return fulminanteTable[value];
}

function erroCritico(value) {


  return erroTable[value];
}


function rollDice(input) {
  const regex = /(\d*)d(\d+)([+\-]\d+)?(\*\d+)?(?:\s+(.+))?/; // O último grupo (text) é tornando opcional
  const match = input.match(regex);
  let text;
  let total;
  let output;
  if (match) {
    const numberOfDice = match[1] !== "" ? parseInt(match[1]) : 1 ;
    const numberOfSides = parseInt(match[2]);
    const modifier = match[3] ? parseInt(match[3]) : 0;
    const divisorMatch = match[4] ? match[4].match(/\*(\d+)/) : null;
    const divisor = divisorMatch ? parseInt(divisorMatch[1]) : 1;
    const stringText = match[5]=== undefined ? "" : (" " + match[5]); // Defina o texto como uma string vazia se não for fornecido

    if (numberOfDice > 0 && numberOfSides > 0) {
      for (let j = 0; j < divisor; j++) {
        total = 0;
        let rolls = [];
      for (let i = 0; i < numberOfDice; i++) {
        const roll = Math.floor(Math.random() * numberOfSides) + 1;
        total += roll;
        rolls.push(roll);
      }
      total += modifier;
      
        if (j === 0) {
          text = `${stringText}:\n`;
        }
        
      text +=`(${rolls.join(' + ')}) ${modifier === 0 ? "" : `${modifier > 0 ? `+ ${Math.abs(modifier)} ` : `- ${Math.abs(modifier)} `}`}= \n${total}\n`;
    }
      
      // text = `${stringText}:\n${output}`;
    }
  }else{
  text = "Formato inválido. Use o formato XdY[+/-Z][*W] [texto].\n/help para maior entendimento.";
  total = false;
  }

  return {text, total};
}


module.exports = {
  playersID,
  erroCritico,
  rollDice,
  golpeFulminante,
  selectName,
  handleChatTypeResponse,
  getResultForType
};
