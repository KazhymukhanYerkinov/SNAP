import { Table, TableContainer } from '@mui/material';
import { MuiTableHead } from './TableHead';
import { MuiTableBody } from './TableBody';
import { MuiPagination } from './Pagination';
import { FilterType, UserDisplayType } from '../../shared/types';



type PropsType = {
  users: Array<UserDisplayType>;
  isFetching: boolean;
  filter: FilterType;

  handleChangePage: (currentPage: number) => void;
 
}
export const MuiTable = ({ users, isFetching, filter, handleChangePage }: PropsType): JSX.Element => {

  return (
    <TableContainer>
      <Table>
        <MuiTableHead />
        <MuiTableBody users = {users} isFetching = {isFetching} />
      </Table>
      <MuiPagination 
        filter = {filter}
        handleChangePage = {handleChangePage} />
    </TableContainer>
  )
}

