const express = require("express");
const {createProxyMiddleware} = require('http-proxy-middleware');

const app = express();

app.use('/api', createProxyMiddleware({
    target: `http://api.exchangeratesapi.io`,
    changeOrigin: true
}));

app.use('/', express.static(__dirname + '/public'));

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

app.get("/", (_req, res) => res.sendFile(`${__dirname}/public/index.html`))

app.listen(8000, () => console.log("Web server is listening on port 8000..."));
