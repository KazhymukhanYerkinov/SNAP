import React from 'react';
import * as queryString from 'querystring';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, useHistory } from 'react-router-dom';

// @components
import { Button, DebounceSearch, MuiTable, Modal } from './components/index';

// @redux
import { deleteUser, getUser, getUsers } from './redux/users-store/users-reducer';
import { selectFilter, selectIsFetching, selectUser, selectUsers } from './redux/users-store/users-selector';

// @shared
import { mapping } from './shared/generator';
import { QueryType, UserType } from './shared/types';
import { getQueryParams, updateQuery } from './shared/handleQuery';

import './index.css';


const App = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const filter = useSelector(selectFilter);
  const isFetching = useSelector(selectIsFetching);
  const users = useSelector(selectUsers).map((user: UserType, index: number) => {
    return mapping(user, index, filter, getDetailUser, deleteDetailUser)
  });

  const [ modal, setModal ] = React.useState(false);

  function handleSearch(term: string)  {
    dispatch(getUsers(filter.currentPage, term));
  }

  function handleChangePage(currentPage: number) {
    dispatch(getUsers(currentPage, filter.term));
  }

  function getDetailUser(id: number) {
    dispatch(getUser(id));
    setModal(true);
  }

  function deleteDetailUser(id: number) {
    dispatch(deleteUser(id));
  }

  function activate() {
    setModal(true);
  }

  function deactivate() {
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
      <Modal user = {user} modal = {modal} deactivateModal = {deactivate}/>
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
