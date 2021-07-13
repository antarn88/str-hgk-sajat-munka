/* eslint-disable no-underscore-dangle */
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const personController = require('./person.controller');
const personService = require('./person.service');

jest.mock('./person.service');

describe('person controler', () => {
  const mockData = [
    {
      id: 1,
      firstName: 'Márió',
      lastName: 'Lakatos',
      vaccine: '',
    },
    {
      id: 2,
      firstName: 'Erzsike',
      lastName: 'Lakatos',
      vaccine: 'Pfizer',
    },
    {
      id: 3,
      firstName: 'Jessica',
      lastName: 'Lakatos',
      vaccine: 'AstraZeneca',
    },
    {
      id: 4,
      firstName: 'Pentiumkettő',
      lastName: 'Lakatos',
      vaccine: 'Sinopharm',
    },
  ];

  let response;
  const nextFunction = jest.fn();

  beforeEach(() => {
    personService.__setMockData(mockData);
    response = mockResponse();
  });

  test('Find one with invalid id', async () => {
    const PERSON_ID = 10;

    const request = mockRequest({
      params: {
        id: PERSON_ID,
      },
    });

    // https://github.com/Carnubak/jest-mock-req-res - HELP
    await personController.findOne(request, response, nextFunction);
    expect(personService.findOne).toBeCalledWith(PERSON_ID);
    expect(response.json).not.toBeCalledWith(mockData.find((p) => p.id === PERSON_ID));
  });

  test('Create a new person', async () => {
    const id = mockData.pop().id + 1;
    const NEW_PERSON = {
      id,
      firstName: 'Keresztnév',
      lastName: 'Vezetéknév',
      vaccine: 'Vakcinatípus',
    };

    const request = mockRequest({
      method: 'POST',
      body: NEW_PERSON,
    });

    // https://github.com/Carnubak/jest-mock-req-res - HELP
    await personController.createANewPerson(request, response, nextFunction);
    expect(personService.create).toBeCalledWith(NEW_PERSON);
    expect(response.json).toBeCalledWith(NEW_PERSON);
  });
});
