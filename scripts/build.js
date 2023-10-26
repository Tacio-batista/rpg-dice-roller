const { bot } = require('../src/bot');

const {
    VERCEL_URL: host,
    // set your webhook address or use default Vercel deployment url
    WEBHOOK: webhook = `https://${host}/api/webhook`,
} = process.env;

bot.api.setWebhook(webhook);
