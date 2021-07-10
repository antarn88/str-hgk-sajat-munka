const fsp = require('fs').promises;

const getFileContent = async (filePath = '') => {
  const content = await fsp.readFile(filePath, 'utf8');
  return JSON.parse(content);
};

module.exports = Object.freeze({
  getFileContent,
});
