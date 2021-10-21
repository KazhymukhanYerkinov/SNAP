import { UserType } from '@shared/types';
import { API, ResultCodeEnum } from '../../api/api';
import { getUser, actions, getUsers } from './users-reducer';


jest.mock('../../api/api');
const userAPIMock = API as jest.Mocked<typeof API>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
});


test('SUCCESS GET ALL USERS', async () => {
  const thunk = getUsers(1, '');
  userAPIMock.getUsers.mockReturnValue(Promise.resolve(responseUsers));

  await thunk(dispatchMock, getStateMock, {});
  expect(dispatchMock).toBeCalledTimes(4);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setIsFetching(true));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setUsers([mockUser]));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setFilter(mockFilter));
  expect(dispatchMock).toHaveBeenNthCalledWith(4, actions.setIsFetching(false));
});


test('SUCCESS GET USER', async () => {
  const thunk = getUser(1);
  userAPIMock.getUser.mockReturnValue(Promise.resolve(responseUser));

  await thunk(dispatchMock, getStateMock, {});
  expect(dispatchMock).toBeCalledTimes(1);
});



const mockFilter = {
  currentPage: 1,
  totalCount: NaN,
  term: '',
};

const mockUser = {
  id: 11,
  placeWork: "Facebook",
  email: "arman@gmail.com",
  name: "Arman",
  surname: "Yesbol",
  middlename: "Aspan",
  password: "dssdsad",
  role: [
    {
      id: 3,
      name: "Директор"
    }
  ],
  phone: "77084171975",
  medBook: "Yes",
  numberMedBook: "59856321455",
  dateMedBook: "2000-10-24",
} as UserType;

const responseUser  = {
  data: mockUser,
  status: ResultCodeEnum.Success,
  statusText: '',
  headers: {},
  config: {},
}

const responseUsers = {
  data: [mockUser],
  status: ResultCodeEnum.Success,
  statusText: '',
  headers: {},
  config: {},
}