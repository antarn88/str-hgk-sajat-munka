const fsp = require('fs').promises;

const getFileContent = async (filePath = '') => {
  const content = await fsp.readFile(filePath, 'utf8');
  return JSON.parse(content);
};

const fileWriter = async (filePath = '', dataString = '') => {
  await fsp.writeFile(filePath, dataString, 'utf8');
};

const insertEntityToJsonList = async (entity = {}, jsonPath = '') => {
  const list = await getFileContent(jsonPath);
  const id = list[list.length - 1].id + 1;
  const newEntity = { ...entity, id };
  list.push(newEntity);
  await fileWriter(jsonPath, JSON.stringify(list, null, 4));
  return newEntity;
};

module.exports = Object.freeze({
  getFileContent,
  insertEntityToJsonList,
});
