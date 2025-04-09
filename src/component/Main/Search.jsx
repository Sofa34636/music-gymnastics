import React from 'react';
import search from '../../Images/icon/search.svg';
import clear from '../../Images/icon/clear.png';

export function Search({ searchValue, setSearchValue }) {
  return (
    <section className='search'>
      <div className='search__inner'>
        <input
          value={searchValue} // специально для input делаетм value, что бы компонент стал контролируемым
          onChange={(event) => setSearchValue(event.target.value)}
          type='text'
          placeholder='Поиск по номеру трека'
          className='search__input'
        />

        <img className='search__searchIcon' src={search} alt='' />
        {searchValue && ( // если в поиске что-то есть добавляем крестик
          <img
            onClick={() => setSearchValue('')} // обнуление
            className='search__clearIcon'
            src={clear}
            alt=''
          />
        )}
      </div>
    </section>
  );
}
