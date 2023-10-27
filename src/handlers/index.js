const { playersID } = require("../constants/characters");
const { statusValue, idStatus, P} = require("../menus");
const { InlineKeyboard } = require("grammy");



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
  const table = {
    3: "O golpe causa o triplo do dano.",
    4: "A RD do alvo protege apenas com metade do valor (arredondado para baixo) depois de aplicados quaisquer divisores de armadura.",
    5: "O golpe causa o dobro do dano.",
    6: "O golpe causa o máximo do dano normal.",
    7: "Se qualquer dano penetrar a RD, trate como se fosse um ferimento grave, independente do dano causado.",
    8: "Se qualquer dano penetrar a RD, ele causa o dobro do choque normal (até uma penalidade máxima de -8). Se o ataque foi contra um membro ou extremidade, a parte do corpo em questão fica incapacitada.",
    9: "Apenas o dano normal.",
    10: "Apenas o dano normal.",
    11: "Apenas o dano normal.",
    12: "Dano normal e a vítima deixa cair o que estiver segurando, independente do dano que penetrar a RD.",
    13: "Se qualquer dano penetrar a RD, trate como se fosse um ferimento grave, independente do dano causado.",
    14: "Se qualquer dano penetrar a RD, trate como se fosse um ferimento grave, independente do dano causado.",
    15: "O golpe causa o máximo do dano normal.",
    16: "O golpe causa o dobro do dano.",
    17: "A RD do alvo protege apenas com metade do valor (arredondado para baixo) depois de aplicados quaisquer divisores de armadura.",
    18: "O golpe causa o triplo do dano."
  };

  return table[value];
}

function erroCritico(value) {
  const table = {
    3: " -> A arma se quebra e fica inutilizável. \n\nExceção: algumas armas são mais difíceis de quebrar. Estas incluem armas sólidas que causam dano por contusão (maças, manguais, malhos, barras de metal, etc.); armas mágicas; armas de fogo (exceto armas com mecanismos wheel-lock, mísseis teleguiados e armas de feixe); e armas de qualidade superior ou altíssima de todos os tipos. Se o combatente possuir uma arma dessas, ele deve jogar novamente. Somente se obtiver um resultado de “arma quebrada” pela segunda vez é que essas armas se quebram. No caso de qualquer outro resultado, ignore o texto e o combatente deixa a arma cair.",
    4: " -> A arma se quebra e fica inutilizável. \n\nExceção: algumas armas são mais difíceis de quebrar. Estas incluem armas sólidas que causam dano por contusão (maças, manguais, malhos, barras de metal, etc.); armas mágicas; armas de fogo (exceto armas com mecanismos wheel-lock, mísseis teleguiados e armas de feixe); e armas de qualidade superior ou altíssima de todos os tipos. Se o combatente possuir uma arma dessas, ele deve jogar novamente. Somente se obtiver um resultado de “arma quebrada” pela segunda vez é que essas armas se quebram. No caso de qualquer outro resultado, ignore o texto e o combatente deixa a arma cair.",
    5: " -> O combatente atinge a si mesmo (com todo o dano) no braço ou perna (50% de chance para cada). \n\nExceção: se estiver realizando um ataque por perfuração ou perfurante com uma arma de combate corpo a corpo ou qualquer tipo de arma de combate à distância, jogue novamente. Se obtiver um resultado “atinge a si mesmo” pela segunda vez, ai então assuma este resultado — metade ou todo o dano, conforme o caso. No caso de um resultado diferente de “atinge a si mesmo”, use o outro resultado.",
    6: " -> O combatente atinge a si mesmo (com metade do dano) no braço ou perna (50% de chance para cada). \n\nExceção: se estiver realizando um ataque por perfuração ou perfurante com uma arma de combate corpo a corpo ou qualquer tipo de arma de combate à distância, jogue novamente. Se obtiver um resultado “atinge a si mesmo” pela segunda vez, ai então assuma este resultado — metade ou todo o dano, conforme o caso. No caso de um resultado diferente de “atinge a si mesmo”, use o outro resultado.",
    7: " -> O combatente perde o equilíbrio. \n\nEle não pode fazer nada até seu próximo turno e todas as suas defesas ativas sofrem uma penalidade de -2 até lá.",
    8: " -> A arma gira na mão do combatente. \n\nEle precisa executar uma manobra Preparar adicional antes de poder usá-la novamente.",
    9: " -> O combatente deixa a arma cair. \n\nExceção: no caso de uma arma barata, ela se quebra. Algumas armas são mais difíceis de quebrar. Estas incluem armas sólidas que causam dano por contusão (maças, manguais, malhos, barras de metal, etc.); armas mágicas; armas de fogo (exceto armas com mecanismos wheel-lock, mísseis teleguiados e armas de feixe); e armas de qualidade superior ou altíssima de todos os tipos. Se o combatente possuir uma arma dessas, ele deve jogar novamente. Somente se obtiver um resultado de “arma quebrada” pela segunda vez é que essas armas se quebram. No caso de qualquer outro resultado, ignore o texto e o combatente deixa a arma cair.",
    10: " -> O combatente deixa a arma cair. \n\nExceção: no caso de uma arma barata, ela se quebra. Algumas armas são mais difíceis de quebrar. Estas incluem armas sólidas que causam dano por contusão (maças, manguais, malhos, barras de metal, etc.); armas mágicas; armas de fogo (exceto armas com mecanismos wheel-lock, mísseis teleguiados e armas de feixe); e armas de qualidade superior ou altíssima de todos os tipos. Se o combatente possuir uma arma dessas, ele deve jogar novamente. Somente se obtiver um resultado de “arma quebrada” pela segunda vez é que essas armas se quebram. No caso de qualquer outro resultado, ignore o texto e o combatente deixa a arma cair.",
    11: " -> O combatente deixa a arma cair. \n\nExceção: no caso de uma arma barata, ela se quebra. Algumas armas são mais difíceis de quebrar. Estas incluem armas sólidas que causam dano por contusão (maças, manguais, malhos, barras de metal, etc.); armas mágicas; armas de fogo (exceto armas com mecanismos wheel-lock, mísseis teleguiados e armas de feixe); e armas de qualidade superior ou altíssima de todos os tipos. Se o combatente possuir uma arma dessas, ele deve jogar novamente. Somente se obtiver um resultado de “arma quebrada” pela segunda vez é que essas armas se quebram. No caso de qualquer outro resultado, ignore o texto e o combatente deixa a arma cair.",
    12: " -> A arma gira na mão do combatente. \n\nEle precisa executar uma manobra Preparar adicional antes de poder usá-la novamente.",
    13: " -> O combatente perde o equilíbrio. \n\nEle não pode fazer nada até seu próximo turno e todas as suas defesas ativas sofrem uma penalidade de -2 até lá.",
    14: " -> Se o combatente estava desferindo um golpe em balanço com uma arma de combate corpo a corpo, a arma voa da mão dele 1d metros de distância — 50% de chance para frente ou para trás. \nQualquer pessoa no local atingido pela arma deve fazer um teste de DX ou sofre metade do dano do ataque! Se o combatente estava desferindo um golpe de ponta ou qualquer tipo de ataque à distância, ou se estiver aparando, ele simplesmente deixa a arma cair\n\nExceção (se a arma cair): no caso de uma arma barata, ela se quebra. Algumas armas são mais difíceis de quebrar. Estas incluem armas sólidas que causam dano por contusão (maças, manguais, malhos, barras de metal, etc.); armas mágicas; armas de fogo (exceto armas com mecanismos wheel-lock, mísseis teleguiados e armas de feixe); e armas de qualidade superior ou altíssima de todos os tipos. Se o combatente possuir uma arma dessas, ele deve jogar novamente. Somente se obtiver um resultado de “arma quebrada” pela segunda vez é que essas armas se quebram. No caso de qualquer outro resultado, ignore o texto e o combatente deixa a arma cair.",
    15: " -> O combatente estira o ombro! \n\nSeu braço da arma fica “incapacitado”. Ele não precisa deixar a arma cair, mas não pode usá-la para atacar ou defender durante 30 minutos.",
    16: " -> O combatente cai! \n\nSe ele estava fazendo um ataque à distância o combatente perde o equilíbrio. Ele não pode fazer nada (nem mesmo uma ação livre) até seu próximo turno e todas as suas defesas ativas sofrem uma penalidade de -2 até lá.",
    17: " -> A arma se quebra e fica inutilizável. \n\nExceção: algumas armas são mais difíceis de quebrar. Estas incluem armas sólidas que causam dano por contusão (maças, manguais, malhos, barras de metal, etc.); armas mágicas; armas de fogo (exceto armas com mecanismos wheel-lock, mísseis teleguiados e armas de feixe); e armas de qualidade superior ou altíssima de todos os tipos. Se o combatente possuir uma arma dessas, ele deve jogar novamente. Somente se obtiver um resultado de “arma quebrada” pela segunda vez é que essas armas se quebram. No caso de qualquer outro resultado, ignore o texto e o combatente deixa a arma cair.",
    18: " -> A arma se quebra e fica inutilizável. \n\nExceção: algumas armas são mais difíceis de quebrar. Estas incluem armas sólidas que causam dano por contusão (maças, manguais, malhos, barras de metal, etc.); armas mágicas; armas de fogo (exceto armas com mecanismos wheel-lock, mísseis teleguiados e armas de feixe); e armas de qualidade superior ou altíssima de todos os tipos. Se o combatente possuir uma arma dessas, ele deve jogar novamente. Somente se obtiver um resultado de “arma quebrada” pela segunda vez é que essas armas se quebram. No caso de qualquer outro resultado, ignore o texto e o combatente deixa a arma cair."
  };

  return table[value] || "Resultado desconhecido.";
}

function rollDice(input) {
  const regex = /(\d*)d(\d+)([+\-]\d+)?(\/\d+)?(?:\s+(.+))?/; // O último grupo (text) é tornando opcional
  const match = input.match(regex);
  let text;
  let total;
  let output;
  if (match) {
    const numberOfDice = match[1] !== "" ? parseInt(match[1]) : 1 ;
    const numberOfSides = parseInt(match[2]);
    const modifier = match[3] ? parseInt(match[3]) : 0;
    const divisor = match[4] ? parseInt(match[4].substring(1)) : 1;
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
      output += `(${rolls.join(' + ')}) ${modifier >= 0 ? '+' : '-'} ${Math.abs(modifier)} = ${total}\n`;
    }
      
      text = `${stringText}:\n${output}`;
    }
  }else{
  text = "Formato inválido. Use o formato XdY[+/-Z] [texto].";
  total = false;
  }

  return {text, total};
}


module.exports = {
  playersID,
  erroCritico,
  rollDice,
  golpeFulminante,
  selectName
  
};
