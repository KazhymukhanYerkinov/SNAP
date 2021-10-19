import { UserDisplayType, UserType } from '../../shared/types';
import { AppStateType } from '../redux-store';

const mapping = (user: UserType): UserDisplayType => {
  const object = {
    id: user.id,
    name: user.name,
    surname: user.surname,
    middlename: user.middlename,
    role: user.role.join(', '),
    phone: user.phone,
    access: 'Имеет',
    position: 'ROLE_ADMIN'
  }
  return object;
}

export const selectUsers = (state: AppStateType) => {
  return state.usersStore.users.map(item => mapping(item));
}

export const selectIsFetching = (state: AppStateType) => {
  return state.usersStore.isFetching;
}

export const selectFilter = (state: AppStateType) => {
  return state.usersStore.filter;
}