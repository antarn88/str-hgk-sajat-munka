/* eslint-disable no-restricted-globals */
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
  idCorrecter,
});
