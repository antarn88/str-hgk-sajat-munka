/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
const personService = jest.mock('./person.service');

let mockData;

personService.findOne = jest.fn((id) => Promise.resolve(
  mockData.find((p) => p.id === id),
));

personService.findAll = jest.fn(() => Promise.resolve(
  mockData,
));

personService.create = jest.fn((person) => Promise.resolve(
  mockData.push(person),
));

personService.__setMockData = (data) => mockData = data;

module.exports = personService;
