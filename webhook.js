const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

const TELEGRAM_TOKEN = "7562789255:AAF6HO5J_I_CmtXIm9FGjHoue7i6lDp8d9I";
const CHAT_ID = "-4966852373";

app.post("/clic", async(req, res) => {
    const { url } = req.body;
    if (!url) return res.sendStatus(400);

    const userAgent = req.headers['user-agent'] || "Inconnu";
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || "Inconnue";
    const timestamp = new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" });

    const message = `🖱️ Nouveau clic détecté :\n\n🔗 URL : ${url}\n📅 Date : ${timestamp}\n📍 IP : ${ip}\n🧠 User-Agent : ${userAgent}`;

    try {
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message
        });
        res.sendStatus(200);
    } catch (err) {
        console.error("Erreur envoi Telegram:", err.response && err.response.data ? err.response.data : err.message);
        res.sendStatus(500);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Serveur actif sur ${port}`));