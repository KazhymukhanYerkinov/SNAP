import { TableHead, TableRow, TableCell } from '@mui/material';
import { makeStyles } from '@mui/styles';


const tableHeads = [
  { id: 1, name: '' },
  { id: 2, name: 'Имя' },
  { id: 3, name: 'Фамилия' },
  { id: 4, name: 'Отчество' },
  { id: 5, name: 'Должность' },
  { id: 6, name: 'Телефон' },
  { id: 7, name: 'Имеет ли доступ' },
  { id: 8, name: 'ROLE_ADMIN' },
  { id: 9, name: 'Редактировать' },
  { id: 10, name: 'Удалить' },
]


const useStyles = makeStyles(() => ({
  tableHead: {
    fontWeight: 700,
    border: '1px solid #D0D0D0',
    backgroundColor: '#F1F1F1',
  }
}));

export const MuiTableHead = (): JSX.Element => {

  const classes = useStyles();
  return (
    <TableHead>
      <TableRow className={classes.tableHead}>
        {tableHeads.map(item => (
          <TableCell key={item.id}> {item.name} </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}