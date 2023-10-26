const { Bot } = require('grammy');

const {
    BOT_API_TOKEN: token = '',
} = process.env;

// Defina seu token nas variáveis de ambiente do Vercel
const bot = new Bot(token);

// Anexe todos os middlewares
bot.on('message', async ctx => {
    await ctx.reply('Hi there!');
});

module.exports = { bot };
