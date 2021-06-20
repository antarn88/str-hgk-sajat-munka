/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
const http = require('http');
const SiteRouter = require('./routers/site.router');

const port = 8080;

const logger = (req) => {
  const message = `Date: ${new Date().getFullYear()}.${new Date().getMonth() + 1}.${new Date()
    .getDate()} Url: ${req.url} Method: ${req.method}`;
  console.log(message);
};

http.createServer((req, res) => {
  logger(req);
  SiteRouter[req.url] ? SiteRouter[req.url](res) : SiteRouter['/'](res);
})
  .on('error', (err) => console.log(`Server error: ${err.message}`))
  .on('listening', () => console.log(`Server is running: http://127.0.0.1:${port}`))
  .listen(port);
