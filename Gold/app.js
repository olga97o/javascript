const express = require("express");
const {createProxyMiddleware} = require('http-proxy-middleware');

const app = express();

const ACCESS_KEY = "57a22e3912016cc8fc2b123240e068f7";

app.use('/api', createProxyMiddleware({
    target: `http://api.exchangeratesapi.io/v1/latest?access_key=${ACCESS_KEY}`,
    changeOrigin: true
}));
app.get('/data', async (req, res) => {
    if (res) {
        res.setHeader('Content-type', "application/json");
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.set('mode', 'no-cors');
        res.send('Successful response.');
    } else {
        res.status(403).send(new Error('Forbidden'));
    }

})

app.get("/", (_req, res) => res.sendFile(`${__dirname}/index.html`))

app.listen(8000, () => console.log("Web server is listening on port 8000..."));
