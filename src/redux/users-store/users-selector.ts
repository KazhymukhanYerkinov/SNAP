import { FilterType, UserDisplayType, UserType } from '../../shared/types';
import { AppStateType } from '../redux-store';

const mapping = (user: UserType, index: number, filter: FilterType): UserDisplayType => {
  const object = {
    id: (filter.currentPage - 1) * 8 + (index + 1),
    name: user.name,
    surname: user.surname,
    middlename: user.middlename,
    role: user.role.map(item => item.name).join(', '),
    phone: user.phone,
    access: 'Имеет',
    position: 'ROLE_ADMIN'
  }
  return object;
}

export const selectUsers = (state: AppStateType) => {
  return state.usersStore.users.map((item, index) => mapping(item, index, state.usersStore.filter));
}

export const selectIsFetching = (state: AppStateType) => {
  return state.usersStore.isFetching;
}

export const selectFilter = (state: AppStateType) => {
  return state.usersStore.filter;
}