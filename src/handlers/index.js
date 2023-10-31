const { playersID, body, erroTable, fulminanteTable } = require("../constants/characters");
const { InlineKeyboard } = require("grammy");


function getResultForType(type, result) {
  let typeResult;
  let typeDesc;
  // Object.keys(body.desc).map(desc => desc === type.toLowerCase());
  if (body.types[type.toLowerCase()]) {
    typeResult = body.types[type.toLowerCase()][result];
    typeDesc = getDescForType(typeResult, type);
    
  } else {
    typeResult = "/tipo desconhecido.";
    typeDesc = false;
  }
    return { typeDesc, typeResult };
}

function getDescForPoint(pointas){
  const member = ["Braço", "Perna","Asa", "Braço x","Pata","Nadadeira","Cauda"];
  const head = ["Olho", "Rosto", "Pescoço", "Crânio"];
  const bodyPoint = ["Tronco", "Órgãos Vitais", "Virilha"];
  const extremidade = ["Mão", "Pé", "Extremidade"];
  const extrDesc = extremidade.map(extr =>{
    const point = getDescForType(extr);
    switch(extr){
      case "Nadadeira":
        point.desc = " Um ictioide muitas vezes possui duas ou três nadadeiras ou asas como as de uma raia; jogue aleatoriamente. Trate uma nadadeira como uma extremidade (mão, pé) para fins de incapacitação. Uma nadadeira incapacitada afeta o equilíbrio: -3 na DX.";
        break;
      case "Extremidade":
        point.desc =" Para centauros jogue 1d: 1–2, uma mão humana da parte superior; 3–4, um pé frontal; 5–6 um pé traseiro. Num resultado ímpar, a parte esquerda é atingida, num resultado par, a direita.";
      default:
    }
    
    return ` -> ${extr} (${point.modifier}): ${point.desc}`;
    
  }).join("\n\n");
  const bodyDesc = bodyPoint.map(bod =>{
    const point = getDescForType(bod);
    if (bod === "Tronco"){
      point.desc = " Acerto comum\n - Para centauro 9–10 significa que a parte animal foi atingida, enquanto 11 significa que a parte superior humanoide foi atingida."
    }
    return ` -> ${bod} (${point.modifier}): ${point.desc}`;
    
  }).join("\n\n");
  const headDesc = head.map((hed, i) =>{
    const point = getDescForType(hed);
    
    return ` -> ${hed} (${point.modifier}): ${point.desc}`;
    
  }).join("\n\n") + '\n\n -> Para os que for possível acerto no "Cérebro" segue mesmo que "Crânio" mas RD 1.';
  const memberDesc = member.map(mem =>{
    const point = getDescForType(mem);
    switch (mem) {
      case 'Asa':
        point.desc = " Uma criatura voadora com uma asa incapacitada não consegue voar.";
        break;
      case 'Cauda':
        point.desc = " Se a cauda for um Braço Adicional ou Golpeador, ou se for uma cauda de peixe, trate-a como um membro (braço, perna) para fins de incapacitação; caso contrário, trate-a como uma extremidade (pé, mão). Uma cauda incapacitada afeta o equilíbrio. Para uma criatura terrestre, uma penalidade de -1 na DX. Para uma criatura nadadora ou voadora, uma penalidade de -2 na DX e o Deslocamento é diminuído pela metade. Se a criatura não tiver cauda, ou tiver uma cauda muito curta (como um coelho), trate como se fosse tronco.\n\nExtremidade: Jogue 1d: 1–2, uma mão humana da parte superior; 3–4, um pé frontal; 5–6 um pé traseiro. Num resultado ímpar, a parte esquerda é atingida, num resultado par, a direita.";
        break;
      case 'Braço x':
        point.desc = " Para um octópode, braços 1–4 são os que estiverem sendo usados no momento para manipulação, enquanto os braços 5–8 são os que estiverem sendo usados para locomoção. Para um cancroide, um braço é uma pinça frontal.";
        break;
      case 'Pata':
        point.desc = " Para um cancroide, esta é qualquer uma de suas patas verdadeiras; defina aleatoriamente. Para um aracnídeo, patas 1–2 são o par frontal, patas 3–4 são as centro-frontais, patas 5–6 são as centro-traseiras e patas 7–8 são as traseiras.";
        break;
      default:
        // Se nenhum caso corresponder a typeResult, você pode adicionar um tratamento padrão aqui.
    }

    return ` -> ${mem} (${point.modifier}): ${point.desc}`;
  }).join("\n\n");
  return {memberDesc, headDesc, bodyDesc, extrDesc};
}


function getDescForType(typeResult, type){
  switch (typeResult) {
      case 'Asa':
      case 'Cauda':
      case 'Braço 1-2':
      case 'Braço 3-4':
      case 'Braço 5-6':
      case 'Braço 7-8':
      case 'Braço Esquerdo':
      case 'Braço Direito':
      case 'Pata 1-2':
      case 'Pata 3-4':
      case 'Pata 5-6':
      case 'Pata 7-8':
      case 'Pata':
      case 'Braço x':
        
        typeDesc = body.part.find(part => part.name === "Braço");
        
        if(typeResult === "Asa") {
            typeDesc.desc += "\n - Uma criatura voadora com uma asa incapacitada não consegue voar.";
        }else if(typeResult === "Cauda"){
            typeDesc.desc += "\n - Se a cauda for um Braço Adicional ou Golpeador, ou se for uma cauda de peixe, trate-a como um membro (braço, perna) para fins de incapacitação; caso contrário, trate-a como uma extremidade (pé, mão). Uma cauda incapacitada afeta o equilíbrio. Para uma criatura terrestre, uma penalidade de -1 na DX. Para uma criatura nadadora ou voadora, uma penalidade de -2 na DX e o Deslocamento é diminuído pela metade. Se a criatura não tiver cauda, ou tiver uma cauda muito curta (como um coelho), trate como se fosse tronco.\n\nExtremidade: Jogue 1d: 1–2, uma mão humana da parte superior; 3–4, um pé frontal; 5–6 um pé traseiro. Num resultado ímpar, a parte esquerda é atingida, num resultado par, a direita.";
            typeDesc.modifier -= 1;
        }else if (typeResult === 'Braço 1-2' || typeResult === 'Braço 3-4' || typeResult === 'Braço 5-6' || typeResult === 'Braço 7-8'|| typeResult === 'Braço x'){
            typeDesc.desc += "\n - Para um octópode, braços 1–4 são os que estiverem sendo usados no momento para manipulação, enquanto os braços 5–8 são os que estiverem sendo usados para locomoção. Para um cancroide, um braço é uma pinça frontal.";
        }else if (typeResult === 'Pata 1-2' ||typeResult ===  'Pata 3-4' || typeResult === 'Pata 5-6' || typeResult === 'Pata 7-8' ||typeResult ===  'Pata'){
            typeDesc.desc += "\n - Para um cancroide, esta é qualquer uma de suas patas verdadeiras; defina aleatoriamente. Para um aracnídeo, patas 1–2 são o par frontal, patas 3–4 são as centro-frontais, patas 5–6 são as centro-traseiras e patas 7–8 são as traseiras.";
        }


        break;
      case 'Perna Dianteira':
      case 'Perna Traseira':
      case 'Perna Esquerda':
      case 'Perna Direita':
      case 'Perna Intermediária':
        
        typeDesc = body.part.find(part => part.name === "Perna");
        
        break;
      case 'Cérebro':
        
        typeDesc = body.part.find(part => part.name === "Crânio");
        typeDesc.desc += "\n\nExceção: Se for Cérebro RD 1.";
        
        break;
      case 'Extremidade':
      case "Nadadeira":
        
        typeDesc = body.part.find(part => part.name === "Mão");
        if(typeResult === "Extremidade") {
            typeDesc.desc += "\n\nJogue 1d: 1–2, uma mão humana da parte superior; 3–4, um pé frontal; 5–6 um pé traseiro. Num resultado ímpar, a parte esquerda é atingida, num resultado par, a direita.";
        
        }else if(typeResult === "Nadadeira"){
            typeDesc.desc += "\n - Um ictoide muitas vezes possui duas ou três nadadeiras ou asas como as de uma raia; jogue aleatoriamente. Trate uma nadadeira como uma extremidade (mão, pé) para fins de incapacitação. Uma nadadeira incapacitada afeta o equilíbrio: -3 na DX."
        }
        break;
      default:
        typeDesc = body.part.find(part => part.name === typeResult);
    }
  if(type === "centauro" && typeResult === "Tronco"){
    typeDesc.desc += " - Para centauro 9–10 significa que a parte animal foi atingida, enquanto 11 significa que a parte superior humanoide foi atingida."
  }
  return typeDesc;
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


function rollDice(input, flag) {
  const regex = /(\d*)d(\d+)([+\-]\d+)?(\*\d+)?(?:\s+(.+))?/; // O último grupo (text) é tornando opcional
  const match = input.match(regex);
  let text;
  let total;
  let output;
  let bodyPoint;
  const enter ="\n\n\n\n\n\n\n\n";
  if (match) {
    const numberOfDice = match[1] !== "" ? parseInt(match[1]) : 1 ;
    const numberOfSides = parseInt(match[2]);
    const modifier = match[3] ? parseInt(match[3]) : 0;
    const divisorMatch = match[4] ? match[4].match(/\*(\d+)/) : null;
    const divisor = divisorMatch ? parseInt(divisorMatch[1]) : 1;
    const stringText = match[5]=== undefined ? "" : (" " + match[5]);
    const stringType = match[5]=== undefined ? "" : match[5]; // Defina o texto como uma string vazia se não for fornecido

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
      
      bodyPoint = getResultForType(stringType,total);
      
      if (j === 0) {
        text = `${bold(stringText)}:\n`;
      }
      if(divisor !== 1){
      
        
      text +=`(${rolls.join(' + ')}) ${modifier === 0 ? "" : `${modifier > 0 ? `+ ${Math.abs(modifier)} ` : `- ${Math.abs(modifier)} `}`}= \n${total}${flag?`\n${bodyPoint.typeDesc !== false ? `-> ${bodyPoint.typeResult} (${bodyPoint.typeDesc.modifier})` : bodyPoint.typeResult}`: ""}\n`;
    }else{
      text +=` (${rolls.join(' + ')}) ${modifier === 0 ? "" : `${modifier > 0 ? `+ ${Math.abs(modifier)} ` : `- ${Math.abs(modifier)} `}`}= \n${total}${flag?`\n${bodyPoint.typeDesc !== false ? `\nE o PONTO DE IMPACTO foi:\n\n-> ${bodyPoint.typeResult} (${bodyPoint.typeDesc.modifier})\n\n - ${bodyPoint.typeDesc.desc}` : bodyPoint.typeResult}`: ""}\n`;
      
    }
        
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
  getResultForType,
  getDescForPoint
};
