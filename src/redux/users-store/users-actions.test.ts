import { UserType } from "@shared/types";
import usersReducer, { actions, InitialStateType } from "./users-reducer";


let state: InitialStateType;

beforeEach(() => {
  state = {
    user: {} as UserType,
    users: [{
      "id": 6,
      "placeWork": "SHYMAS",
      "email": "kazhymukhanyerkinov@gmail.com",
      "name": "Guldana",
      "surname": "Yerkinov",
      "middlename": "Jusipuly",
      "password": "qwerty123456",
      "role": [
        {
          "id": 1,
          "name": "Менеджер"
        },
        {
          "id": 2,
          "name": "Стажер"
        }
      ],
      "phone": "+7(708)4171975",
      "medBook": "Yes",
      "numberMedBook": '123456789',
      "dateMedBook": "07.11.2018"
    },
    {
      "id": 7,
      "placeWork": "Sergek",
      "email": "kazhymukhanyerkinov@gmail.com",
      "name": "Kazhymukhan",
      "surname": "Dosbol",
      "middlename": "Jusipuly",
      "password": "qwerty123456",
      "role": [
        {
          "id": 1,
          "name": "Менеджер"
        },
        {
          "id": 2,
          "name": "Стажер"
        }
      ],
      "phone": "+7(708)4171975",
      "medBook": "Yes",
      "numberMedBook": '123456789',
      "dateMedBook": "07.11.2018"
    }],
    isFetching: false,
    filter: {
      currentPage: 1,
      totalCount: 0,
      term: '',
    }
  }
});


test("IS_FETCHING SUCCESS TRUE", () => {
  // 1. test data
  const action = actions.setIsFetching(true);

  // 2. action
  const newState = usersReducer(state, action);

  // 3. expectation
  expect(newState.isFetching).toBeTruthy();
});


test("IS_FETCHING SUCCESS FALSE", () => {
  // 1. test data
  const action = actions.setIsFetching(false);

  // 2. action
  const newState = usersReducer(state, action);

  // 3. expectation
  expect(newState.isFetching).toBeFalsy();
});


test("GET USER SUCCESS", () => {
  // 1. test data
  const action = actions.setUser(mockUser);

  // 2. action
  const newState = usersReducer(state, action);

  // 3. expectation
  expect(newState.user.id).toBe(11);
});

test("GET ALL USERS SUCCESS", () => {
  // 1. test data
  const action = actions.setUsers(mockUsers);

  // 2. action
  const newState = usersReducer(state, action);

  // 3. expectation
  expect(newState.users.length).toBe(2);
});

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
};

const mockUsers = [
  {
    "placeWork": "Google",
    "email": "kadyrdosbol@gmail.com",
    "name": "Kadyr",
    "surname": "Dosbol",
    "middlename": "Ardakuly",
    "password": "dasdsadas",
    "role": [
      {
        "id": 3,
        "name": "Директор"
      },
      {
        "id": 1,
        "name": "Менеджер"
      }
    ],
    "phone": "77776669988",
    "medBook": "Yes",
    "numberMedBook": "88888888888",
    "dateMedBook": "2000-10-14",
    "id": 10
  },
  {
    "placeWork": "Sergek",
    "email": "dsadasdsa@gmail.com",
    "name": "Kazhymukhan",
    "surname": "Yerkinov",
    "middlename": "Azamat",
    "password": "dasdsadas",
    "role": [
      {
        "id": 3,
        "name": "Директор"
      }
    ],
    "phone": "77084171975",
    "medBook": "Yes",
    "numberMedBook": "555555555",
    "dateMedBook": "2000-10-24",
    "id": 9
  }
]