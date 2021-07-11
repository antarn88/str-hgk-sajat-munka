/* eslint-disable no-restricted-globals */
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
    throw new Error();
  }

  const newEntity = { ...oldEntity, ...updatedEntity };
  list[oldEntityIndex] = newEntity;

  await fileWriter(jsonPath, JSON.stringify(list, null, 4));
  return newEntity;
};

const idCorrecter = (id) => {
  let newID = id;
  if (typeof newID === 'string') {
    newID = newID.trim();
    newID = Number(newID);
  }

  if (isNaN(newID) || newID % 1 !== 0 || newID < 1) {
    return false;
  }

  newID = Number(newID);
  return newID;
};

module.exports = Object.freeze({
  getFileContent,
  insertEntityToJsonList,
  updateEntityInJsonList,
  fileWriter,
  idCorrecter,
});
