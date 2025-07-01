const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

const TELEGRAM_TOKEN = "7562789255:AAF6HO5J_I_CmtXIm9FGjHoue7i6lDp8d9I";
const CHAT_ID = "-4966852373";

app.post("/clic", async(req, res) => {
    const { url } = req.body;
    if (!url) return res.sendStatus(400);
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: `🖱️ Quelqu’un a cliqué sur : ${url}`
    });
    res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Serveur actif sur ${port}`));