import React, { useCallback, useRef, useState } from 'react';
import search from '../../../Images/icon/search.svg';
import clear from '../../../Images/icon/clear.png';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../../redux/slices/searchValue';

export function Search() {
  const dispatch = useDispatch();
  const [value, setValue] = useState();
  const inputRef = useRef();

  const onClickClear = () => {
    // полная очистка
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current.focus(); // что бы при нажатии на крестик курсор опять вставал в поле поиска
  };

  const updateSearchValue = useCallback(
    // отложенная функция
    debounce((str) => {
      // делаем задержку в отправлении запроса на бэк, после ввода в поиск
      dispatch(setSearchValue(str));
    }, 300),
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <section className='search'>
      <div className='search__inner'>
        <input
          ref={inputRef}
          value={value} // специально для input делаетм value, что бы компонент стал контролируемым
          onChange={onChangeInput}
          type='text'
          placeholder='Поиск по номеру трека'
          className='search__input'
        />

        <img className='search__searchIcon' src={search} alt='' />
        {value && ( // если в поиске что-то есть добавляем крестик
          <img
            onClick={onClickClear} // обнуление
            className='search__clearIcon'
            src={clear}
            alt=''
          />
        )}
      </div>
    </section>
  );
}
