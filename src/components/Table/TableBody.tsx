import { TableBody, TableRow, TableCell, Skeleton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { UserDisplayType } from '../../shared/types';


const useStyles = makeStyles(() => ({
  tableBody: {
    border: '1px solid #D0D0D0',
    borderBottom: '10px solid #F1F1F1',
    backgroundColor: '#FFFFFF',
  },
  skeleton: {
    width: '100%',
    height: '60px',
    margin: '10px 0',
  },
  cell: {
    padding: 0,
  }
}));


type PropsType = {
  users: Array<UserDisplayType>;
  isFetching: boolean;
}

export const MuiTableBody = ({ users, isFetching }: PropsType): JSX.Element => {

  const classes = useStyles();

  return (
    <TableBody>

      {isFetching 
      ? Array(6).fill(0).map((item, index) => (
        <TableRow key = {index}>
          <TableCell colSpan = {10} className = {classes.cell}>
            <Skeleton 
              animation = 'wave'
              className = {classes.skeleton} 
              variant = 'rectangular' />
          </TableCell>
        </TableRow>
        ))
        
      : users.map((item: any) => (
          <TableRow className = {classes.tableBody} key = {item.id}>
            {Object.keys(item).map((key: string) => (
              <TableCell key = {key}> {item[key]} </TableCell>
            ))}
          </TableRow>
        ))
      }
    </TableBody>
  )
}