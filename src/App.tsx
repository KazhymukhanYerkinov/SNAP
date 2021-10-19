import React from 'react';
import * as queryString from 'querystring';
import { BrowserRouter, Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getUsers } from './redux/users-store/users-reducer';
import { selectFilter, selectIsFetching, selectUsers } from './redux/users-store/users-selector';
import { Button, DebounceSearch, MuiTable, Modal } from './components/index';
import './index.css';
import { QueryType } from './shared/types';
import { getQueryParams, updateQuery } from './shared/handleQuery';


const App = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const users = useSelector(selectUsers);
  const isFetching = useSelector(selectIsFetching);
  const filter = useSelector(selectFilter);

  const [ modal, setModal ] = React.useState(false);

  const handleSearch = (term: string) => {
    dispatch(getUsers(filter.currentPage, term));
  }

  const handleChangePage = (currentPage: number) => {
    dispatch(getUsers(currentPage, filter.term));
  }

  const activate = () => {
    setModal(true);
  }

  const deactivate = () => {
    setModal(false);
  }


  React.useEffect(() => {
    let parsed = queryString.parse(history.location.search.substr(1)) as QueryType;
    let actualFilter = getQueryParams(filter, parsed);
    dispatch(getUsers(actualFilter.currentPage, actualFilter.term));
  }, []);

  React.useEffect(() => {
    let query: QueryType = updateQuery(filter);
    history.push({ pathname: '/', search: queryString.stringify(query) })
  }, [filter, history]);



  return (
    <React.Fragment>

      <div className='header'>
        <Button appearance='primary' size='medium' onClick = {activate}> Добавление нового пользователя </Button>
        <DebounceSearch handleSearch={handleSearch} />
      </div>

      <Modal modal = {modal} deactivateModal = {deactivate}/>

      <MuiTable
        users={users}
        filter={filter}
        isFetching={isFetching}
        handleChangePage={handleChangePage} />
        
    </React.Fragment>

  );
}

const Root = () => {
  return (
    <BrowserRouter>
      <Route path='/' component={App} />
    </BrowserRouter>
  )
}

export default Root;
