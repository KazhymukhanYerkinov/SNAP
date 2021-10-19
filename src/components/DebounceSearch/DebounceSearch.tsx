import React from 'react';
import { debounce } from 'lodash';

import { DebounceSearchProps } from './DebounceSearch.props';
import styles from './DebounceSearch.module.css';

export const DebounceSearch = ({ handleSearch }: DebounceSearchProps) => {
  const [ search, setSearch ] = React.useState('');

  const debounceSearch = React.useMemo(() => 
    debounce(value => {
      handleSearch(value);
    }, 1000), [ handleSearch ]);

  const handleChange = React.useCallback(e => {
      setSearch(e.target.value);
      debounceSearch(e.target.value);
  }, [debounceSearch]);

  return (
    <input 
      type = 'text'
      value = {search} 
      placeholder = 'Поиск'
      className = {styles.search} 
      onChange = {handleChange} />
  );
}