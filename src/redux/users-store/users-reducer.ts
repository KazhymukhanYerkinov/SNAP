import { API, ResultCodeEnum } from '../../api/api';
import { FilterType, UserType } from '../../shared/types';
import { BaseThunkType, InferActionsTypes } from '../redux-store';


const initialState = {
  user: {} as UserType,
  users: [] as Array<UserType>,
  isFetching: false,
  filter: {
    currentPage: 1,
    totalCount: 0,
    term: '',
  }
};


const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'users-reducer/SET_IS_FETCHING': {
      return {
        ...state,
        isFetching: action.payload.isFetching
      }
    }
    case 'users-reducer/SET_USER':
      return {
        ...state,
        user: {...action.payload.user}
      }
    case 'users-reducer/SET_USERS':
      return {
        ...state,
        users: [...action.payload.users]
      }
    case 'users-reducer/SET_FILTER':
      return {
        ...state,
        filter: {...action.payload.filter}
      }
    default:
      return state;
  }
}



export const actions = {
  setUsers: (users: Array<UserType>) => ({
    type: 'users-reducer/SET_USERS', payload: { users }
  } as const),
  setUser: (user: UserType) => ({
    type: 'users-reducer/SET_USER', payload: { user }
  } as const),
  setIsFetching: (isFetching: boolean) => ({
    type: 'users-reducer/SET_IS_FETCHING', payload: { isFetching }
  } as const),
  setFilter: (filter: FilterType) => ({
    type: 'users-reducer/SET_FILTER', payload: { filter }
  } as const),
};


const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const getUsers = (currentPage: number, term: string): ThunkType => async (dispatch) => {
  dispatch(actions.setIsFetching(true));
  try {
    const response = await API.getUsers(currentPage, term);
    await delay(500);
    if (response.status === ResultCodeEnum.Success) {
      dispatch(actions.setUsers(response.data));
      dispatch(actions.setFilter({ term, currentPage, totalCount: Number(response.headers['x-total-count']) }))
    }
  } 
  catch (error) { console.error(error) } 
  finally { dispatch(actions.setIsFetching(false)) }
}


export const createUser = (user: UserType): ThunkType => async (dispatch, getState) => {
  try {
    const term = getState().usersStore.filter.term;
    const totalCount = getState().usersStore.filter.totalCount;
    const currentPage = getState().usersStore.filter.currentPage;
    await API.createUser(user, totalCount);
    dispatch(getUsers(currentPage, term));
    
  } catch (error) { console.error(error) }
}

export const getUser = (id: number): ThunkType => async (dispatch) => {
  try {
    const response = await API.getUser(id);
    if (response.status === ResultCodeEnum.Success) {
      dispatch(actions.setUser(response.data));
    }
  } catch (error) {console.error(error) }
}

export const editUser = (id: number, user: UserType): ThunkType => async (dispatch, getState) => {
  try {
    const term = getState().usersStore.filter.term;
    const currentPage = getState().usersStore.filter.currentPage;
    const response = await API.editUser(id, user);
    if (response.status === ResultCodeEnum.Success) {
      dispatch(getUsers(currentPage, term));
    }
  } catch (error) { console.error(error) }
}

export const deleteUser = (id: number): ThunkType => async (dispatch, getState) => {
  try {
    const term = getState().usersStore.filter.term;
    const currentPage = getState().usersStore.filter.currentPage;
    const response = await API.deleteUser(id);
    if (response.status === ResultCodeEnum.Success) {
      dispatch(getUsers(currentPage, term));
    }
  } catch (error) { console.error(error) }
}

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;

export default usersReducer;
