import { Button } from "../components";
import { FilterType, UserDisplayType, UserType } from "./types";

export const mapping = (user: UserType, index: number, filter: FilterType, getUser: (id: number) => void, deleteUser: (id: number) => void): UserDisplayType => {
  const object = {
    id: (filter.currentPage - 1) * 8 + (index + 1),
    name: user.name,
    surname: user.surname,
    middlename: user.middlename ? user.middlename : 'NULL',
    role: user.role ? user.role.map(item => item.name).join(', ') : 'NULL',
    phone: user.phone,
    access: 'Имеет',
    position: 'ROLE_ADMIN',
    edit: <Button appearance='primary' onClick={() => getUser(user.id)}> Редактировать </Button>,
    delete: <Button appearance='danger' onClick={() => deleteUser(user.id)}> Закрыть доступ </Button>,
  }

  return object;
}
