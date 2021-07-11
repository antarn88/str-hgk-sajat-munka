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

const updateEntityInJsonList = async (id = 0, updatedEntity = {}, jsonPath = '') => {
  const list = await getFileContent(jsonPath);
  const oldEntity = list.find((e) => e.id === parseInt(id, 10));
  const oldEntityIndex = list.findIndex((e) => e.id === parseInt(id, 10));

  if (oldEntityIndex === -1) {
    throw new Error('The list does not contain this entity!');
  }

  const newEntity = { ...oldEntity, ...updatedEntity };
  list[oldEntityIndex] = newEntity;

  try {
    await fileWriter(jsonPath, JSON.stringify(list, null, 4));
  } catch (error) {
    throw new Error(error.message);
  }
  return newEntity;
};

module.exports = Object.freeze({
  getFileContent,
  insertEntityToJsonList,
  updateEntityInJsonList,
  fileWriter,
});
