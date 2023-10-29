const playersID = {
  Abbadon: "965254444",
  Tibius: "587760655",
  Fergus: "960580168",
  Rowan: "2",
  Mestre: "744974273",
  Cubo: "cube",
};

const links = { 
  rules: {
    general: "http://t.me/SquareDice_bot/regrasGerais",
    combat: "http://t.me/SquareDice_bot/regrasCombate",
    spells: "http://t.me/SquareDice_bot/regrasMagias",
  },
  sheets:{
    Tibius: "http://t.me/SquareDice_bot/fichaTibius",
    Fergus: "http://t.me/SquareDice_bot/fichaFergus",
    Abbadon: "http://t.me/SquareDice_bot/fichaAbbadon",
  }
}
const obs = [
  "","Um ataque que fracassar por 1 atinge o tronco.",
  "Apenas ataques perfurantes, por perfuração e por queimadura de feixe concentrado podem visar os olhos — e somente ataques frontais ou laterais. Qualquer dano acima de PV/10 cega o olho. Caso contrário acertará o crânio sem RD adicional \nCrânio: O modificador de ferimento é ×4. Os testes de nocaute sofrem uma penalidade de -10. Golpes fulminantes usam a Tabela de Golpe Fulminante na Cabeça (pág. 557). \nExceção: esses efeitos não se aplicam a dano por toxina.",
  "O crânio tem RD adicional de 2. O modificador de ferimento é ×4. Os testes de nocaute sofrem uma penalidade de -10. Golpes fulminantes usam a Tabela de Golpe Fulminante na Cabeça (pág. 557). \nExceção: esses efeitos não se aplicam a dano por toxina.",
  "Maxilar, bochechas, nariz, orelhas, etc. Se o alvo possuir um capacete aberto, ignore a RD. Os testes de nocaute sofrem uma penalidade de -5. Golpes fulminantes usam a Tabela de Golpe Fulminante na Cabeça (pág. 557). Dano por corrosão recebe um modificador de ferimento de ×1,5; um ferimento grave também cega um dos olhos (ou os dois se ultrapassar o PV total). Ataques aleatórios por trás atingem o crânio.\n\nCrânio: Possui RD adicional de 2. O modificador de ferimento é ×4. Os testes de nocaute sofrem uma penalidade de -10. Golpes fulminantes usam a Tabela de Golpe Fulminante na Cabeça (pág. 557). \nExceção: esses efeitos não se aplicam a dano por toxina.", 
  "Membro. Reduza o modificador de ferimento para danos por perfuração, extremamente perfurantes e muito perfurante para ×1. Qualquer ferimento grave (perda de mais de PV/2 em um único golpe) incapacita o membro. Dano além deste limiar é perdido.",
  "Se houver um escudo, dobre a penalidade para atingir o ponto: -4 para braço do escudo, -8 para mão do escudo.",
  "Homens humanos e os machos de espécies semelhantes sofrem o dobro do choque de danos por contusão e sofrem uma penalidade de -5 nos testes de nocaute. Caso contrário, trate como um golpe no tronco.",
  "Extremidade. Reduza o modificador de ferimento para danos por perfuração, extremamente perfurantes e muito perfurante para ×1. Qualquer ferimento grave (perda de mais de PV/3 em um único golpe) incapacitante. Dano além deste limiar é perdido.",
  "Se estiver determinando aleatoriamente, jogue 1d: 1–3 atinge a extremidade direita, 4–6 a esquerda.",
  "Pescoço e garganta. Aumente o modificador de ferimento de ataques por contusão e por corrosão para ×1,5 e por corte para ×2. A critério do Mestre, uma pessoa morta por um golpe por corte no pescoço pode ser decapitada!",
  "Coração, pulmões, rins, etc. Aumente o modificador de ferimento para ataques por perfuração ou qualquer ataque perfurante para ×3. Aumente o modificador de ferimento para ataques por queimadura de feixe concentrado para ×2. Outros ataques não podem visar os órgãos vitais."
];

const body = {
  part: [
    { name: "Olho", desc: " - " + obs[1] + "\n - " + obs[2], modifier: -9},
    { name: "Crânio", desc: " - " + obs[1] + "\n - " + obs[3], modifier: -7},
    { name: "Rosto", desc: " - " + obs[1] + "\n - " + obs[4], modifier: -5},
    { name: "Perna", desc: " - " + obs[5], modifier: -2},
    { name: "Braço", desc: " - " + obs[5] + "\n - " + obs[6], modifier: -2},
    { name: "Virilha", desc: " - " + obs[1] + "\n - " + obs[7], modifier: -3},
    { name: "Mão", desc: " - " + obs[6] + "\n - " + obs[8] + "\n - " + obs[9], modifier: -4},
    { name: "Pé", desc: " - " + obs[8] + "\n - " + obs[9], modifier: -4},
    { name: "Pescoço", desc: " - " + obs[1] + "\n - " + obs[10], modifier: -5},
    { name: "Órgãos", desc: " - " + obs[1] + "\n - " + obs[11], modifier: -3},
    { name: "Tronco", desc: "", modifier: 0}
],
  types: { 
    humano: {
    3: "Crânio",
    4: "Crânio",
    5: "Rosto",
    6: "Perna Direita",
    7: "Perna Direita",
    8: "Braço Direito",
    9: "Tronco",
    10: "Tronco",
    11: "Virilha",
    12: "Braço Esquerdo",
    13: "Perna Esquerda",
    14: "Perna Esquerda",
    15: "Mão",
    16: "Pé",
    17: "Pescoço",
    18: "Pescoço"
  },
  quadrupede: {
    3: "Crânio",
    4: "Crânio",
    5: "Rosto",
    6: "Pescoço",
    7: "Perna Dianteira",
    8: "Perna Dianteira",
    9: "Tronco",
    10: "Tronco",
    11: "Tronco",
    12: "Virilha",
    13: "Perna Traseira",
    14: "Perna Traseira",
    15: "Pé",
    16: "Pé",
    17: "Cauda",
    18: "Cauda"
  },
  quadrupedealado: {
    3: "Crânio",
    4: "Crânio",
    5: "Rosto",
    6: "Pescoço",
    7: "Perna Dianteira",
    8: "Perna Dianteira",
    9: "Tronco",
    10: "Tronco",
    11: "Tronco",
    12: "Asa",
    13: "Perna Traseira",
    14: "Perna Traseira",
    15: "Pé",
    16: "Pé",
    17: "Cauda",
    18: "Cauda"
  },
  hexapode: {
    3: "Crânio",
    4: "Crânio",
    5: "Pescoço",
    6: "Rosto",
    7: "Perna Dianteira",
    8: "Perna Dianteira",
    9: "Tronco",
    10: "Tronco",
    11: "Tronco",
    12: "Virilha",
    13: "Perna Traseira",
    14: "Perna Traseira",
    15: "Pé",
    16: "Pé",
    17: "Perna Intermediária",
    18: "Perna Intermediária"
  },
  hexapodealado: {
    3: "Crânio",
    4: "Crânio",
    5: "Pescoço",
    6: "Rosto",
    7: "Perna Dianteira",
    8: "Perna Dianteira",
    9: "Tronco",
    10: "Tronco",
    11: "Tronco",
    12: "Asa",
    13: "Perna Traseira",
    14: "Perna Traseira",
    15: "Perna Intermediária",
    16: "Pé",
    17: "Pé"
  },
  centauro: {
    3: "Crânio",
    4: "Crânio",
    5: "Pescoço",
    6: "Rosto",
    7: "Perna Dianteira",
    8: "Perna Dianteira",
    9: "Tronco",
    10: "Tronco",
    11: "Tronco",
    12: "Virilha",
    13: "Perna Traseira",
    14: "Perna Traseira",
    15: "Braço",
    16: "Extremidade",
    17: "Extremidade",
    18: "Extremidade"
  },
  aviario: {
    3: "Crânio",
    4: "Crânio",
    5: "Rosto",
    6: "Pescoço",
    7: "Asa",
    8: "Asa",
    9: "Tronco",
    10: "Tronco",
    11: "Tronco",
    12: "Virilha",
    13: "Perna",
    14: "Pé",
    15: "Pé",
    16: "Pé",
    17: "Cauda",
    18: "Cauda"
  },
  vermiforme: {
    3: "Crânio",
    4: "Crânio",
    5: "Rosto",
    6: "Pescoço",
    7: "Pescoço",
    8: "Pescoço",
    9: "Tronco",
    10: "Tronco",
    11: "Tronco",
    12: "Tronco",
    13: "Tronco",
    14: "Tronco",
    15: "Tronco",
    16: "Tronco",
    17: "Tronco",
    18: "Tronco"
  },
  octopode: {
    3: "Cérebro",
    4: "Cérebro",
    5: "Rosto",
    6: "Pescoço",
    7: "Braço 1-2",
    8: "Braço 1-2",
    9: "Tronco",
    10: "Tronco",
    11: "Tronco",
    12: "Tronco",
    13: "Braço 3-4",
    14: "Braço 3-4",
    15: "Braço 5-6",
    16: "Braço 5-6",
    17: "Braço 7-8",
    18: "Braço 7-8"
  },
  crancroide: {
    3: "Crânio",
    4: "Crânio",
    5: "Rosto",
    6: "Rosto",
    7: "Braço",
    8: "Braço",
    9: "Tronco",
    10: "Tronco",
    11: "Tronco",
    12: "Pata",
    13: "Pata",
    14: "Pata",
    15: "Pata",
    16: "Pata",
    17: "Pé",
    18: "Pé"
  },
  ictoide: {
    3: "Cérebro",
    4: "Cérebro",
    5: "Rosto",
    6: "Nadadeira",
    7: "Nadadeira",
    8: "Tronco",
    9: "Tronco",
    10: "Tronco",
    11: "Tronco",
    12: "Tronco",
    13: "Tronco",
    14: "Nadadeira",
    15: "Nadadeira",
    16: "Pé",
    17: "Pé",
    18: "Cauda"
  },
  aracnideo: {
    3: "Cérebro",
    4: "Cérebro",
    5: "Pescoço",
    6: "Rosto",
    7: "Pata 1-2",
    8: "Pata 1-2",
    9: "Tronco",
    10: "Tronco",
    11: "Tronco",
    12: "Virilha",
    13: "Pata 3-4",
    14: "Pata 3-4",
    15: "Pata 5-6",
    16: "Pata 5-6",
    17: "Pata 7-8",
    18: "Pata 7-8"
},
  serpentealada:{
    3: "Crânio",
    4: "Crânio",
    5: "Rosto",
    6: "Pescoço",
    7: "Pescoço",
    8: "Pescoço",
    9: "Tronco",
    10: "Tronco",
    11: "Tronco",
    12: "Tronco",
    13: "Tronco",
    14: "Tronco",
    15: "Asa",
    16: "Asa",
    17: "Asa",
    18: "Asa"
 },
  homemcobra:{
    3: "Crânio",
    4: "Crânio",
    5: "Rosto",
    6: "Pescoço",
    7: "Braço Direito",
    8: "Braço Direito",
    9: "Tronco",
    10: "Tronco",
    11: "Tronco",
    12: "Tronco",
    13: "Braço Esquerdo",
    14: "Braço Esquerdo",
    15: "Tronco",
    16: "Tronco",
    17: "Mão",
    18: "Mão"
  },
  escorpiao:{
    3: "Crânio",
    4: "Crânio",
    5: "Rosto",
    6: "Rosto",
    7: "Braço",
    8: "Braço",
    9: "Tronco",
    10: "Tronco",
    11: "Tronco",
    12: "Cauda",
    13: "Pata",
    14: "Pata",
    15: "Pata",
    16: "Pata",
    17: "Pé",
    18: "Pé"
  }
}};
const fulminanteTable = {
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

const erroTable= {
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


module.exports = {
  playersID,
  links,
  body,
  fulminanteTable,
  erroTable
};
