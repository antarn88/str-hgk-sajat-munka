const increaseDate = (date, dayCount = 3) => {
  const dayCountIncreased = dayCount * 86400000;
  return date.getTime() + dayCountIncreased;
};

const increaseAndFormatDate = (dateArray) => {
  const newArray = [];
  const monthNames = ['Január', 'Február', 'Március', 'Április', 'Május', 'Június',
    'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'];

  dateArray.map((dateObj) => {
    const fullDate = new Date(increaseDate(dateObj));
    const hunFormat = `${fullDate.getFullYear()}. ${monthNames[fullDate.getUTCMonth()]} ${fullDate.getDate()}.`;
    newArray.push(hunFormat);
    return hunFormat;
  });
  return newArray;
};

const generateUserList = (userObjArray) => {
  const newArray = [];

  userObjArray.forEach((userObj) => {
    const isAdult = userObj.age >= 18;
    newArray.push({ isAdult, fullName: `${userObj.lastName} ${userObj.firstName}` });
  });

  return newArray;
};

const getUserNames = (userObjArray) => userObjArray.map((userObj) => `${userObj.lastName} ${userObj.firstName}`).join(', ');

module.exports = Object.freeze({ increaseAndFormatDate, generateUserList, getUserNames });
