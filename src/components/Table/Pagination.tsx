import { Pagination } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { FilterType } from '@shared/types';


const useStyles = makeStyles(() => ({
  root: {
    marginTop: '10px',
    justifyContent: "flex-end",
    display: 'flex'
  },
}));

interface PropsType {
  filter: FilterType;
  handleChangePage: (currentPage: number) => void; 
}

export const MuiPagination = ({ filter, handleChangePage }: PropsType): JSX.Element => {

  const classes = useStyles();
  const pageCount = Math.ceil(filter.totalCount / 8);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    handleChangePage(page);
  }

  return (
    <div className={classes.root}>
      <Pagination
        count={pageCount}
        page = {filter.currentPage}
        variant="outlined"
        shape="rounded"
        onChange = {handleChange} />
    </div>
  )
}