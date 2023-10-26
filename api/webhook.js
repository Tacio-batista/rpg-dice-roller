const { bot } = require('../src/bot');
const { webhookCallback } = require('grammy');

// webhookCallback will make sure that the correct middleware(listener) function is called
module.exports = webhookCallback(bot, 'http');
