const htmlResponse = require('../utils/htmlResponse');

const index = (res) => htmlResponse(res, 'index');

const about = (res) => htmlResponse(res, 'about');

const contact = (res) => htmlResponse(res, 'contact');

module.exports = Object.freeze({
  index,
  about,
  contact,
});
