import { AppStateType } from '../redux-store';


export const selectUsers = (state: AppStateType) => {
  return state.usersStore.users
}
export const selectIsFetching = (state: AppStateType) => {
  return state.usersStore.isFetching;
}
export const selectFilter = (state: AppStateType) => {
  return state.usersStore.filter;
}
export const selectUser = (state: AppStateType) => {
  return state.usersStore.user;
}