import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Добавляем Redux хуки
import { resetFilters, setFilters } from '../../redux/slices/filterSlice'; // Импортируем действие для фильтров
import { Tracks } from '../Layout/Main/Tracks';
import { Albums } from '../Layout/Main/Albums';
import { Filters } from '../Layout/Main/Filters';
import { Search } from '../Layout/Main/Search';
import { setAlbumId } from '../../redux/slices/albumSlice';

import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { fetchTrack } from '../../redux/slices/requestTrackSlice';
import { setSearchValue } from '../../redux/slices/searchValue';

export function Main() {
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const dispatch = useDispatch(); // dispatch - функция, которая меняет стейт
  const filters = useSelector((state) => state.filters); // Получаем фильтры из стора
  const { albums, albumId } = useSelector((state) => state.albums);
  const { tracks, status } = useSelector((state) => state.requestTrack);
  const searchValue = useSelector((state) => state.search.searchValue);

  const onChangeAlbum = (id) => {
    dispatch(setAlbumId(id)); //меняем категорью на новую, которая к нам придет
    dispatch(resetFilters()); // обнуление
  };

  const getTracks = async () => {
    dispatch(fetchTrack({ albumId })); // делаем запрос на бэк и сохраняем пицы
    // dispatch(setFilters({ ...filters, priceRange: [0, 1000] }));
  };

  // если был первый рендер, то проверяем URL - параметры и сохраняем в редакс
  useEffect(() => {
    const params = qs.parse(window.location.search.substring(1));
    const parseParam = (value, fallback) => {
      try {
        return value ? JSON.parse(value) : fallback;
      } catch {
        return fallback;
      }
    };
    dispatch(
      setFilters({
        priceRange: parseParam(params.priceRange, filters.priceRange),
        genres: parseParam(params.genres, filters.genres),
        tempos: parseParam(params.tempos, filters.tempos),
        voices: parseParam(params.voices, filters.voices),
        durations: parseParam(params.durations, filters.durations),
        languages: parseParam(params.languages, filters.languages),
      }),
    );
    if (params.albumId) dispatch(setAlbumId(Number(params.albumId)));
  }, [dispatch]);

  useEffect(() => {
    if (isMounted.current) {
      // если был первый рендер вшиваем в адресную строку
      const queryString = qs.stringify({ albumId, ...filters });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [albumId, filters]);

  useEffect(() => {
    // Если был первы рендер, то запрашиваем треки
    window.scrollTo(0, 0);
    getTracks();
    isSearch.current = true;
  }, [albumId]);

  const filteredTracks = React.useMemo(() => {
    let result = tracks.filter((track) => {
      const price = parseInt(track.Price);
      return (
        (!searchValue || track.TrackNumber.toLowerCase().includes(searchValue.toLowerCase())) &&
        price >= filters.priceRange[0] &&
        price <= filters.priceRange[1] &&
        (!filters.genres.length || filters.genres.includes(track.Genre)) &&
        (!filters.tempos.length || filters.tempos.includes(track.Tempo)) &&
        (!filters.voices.length || filters.voices.includes(track.Voice)) &&
        (!filters.durations.length || filters.durations.includes(track.Duration)) &&
        (!filters.languages.length || filters.languages.includes(track.Language))
      );
    });

    if (albumId !== 0) {
      const selectedAlbum = albums[albumId];
      const quantity = selectedAlbum
        ? parseInt(selectedAlbum.quantity) || result.length
        : result.length;
      result = result.slice(0, quantity);
    }

    return result;
  }, [tracks, filters, albumId, searchValue]); // filters из стора

  const trackFilter = React.useMemo(() => {
    return filteredTracks.length > 0 ? (
      filteredTracks.map((obj) => <Tracks key={obj.id} {...obj} />)
    ) : (
      <p>Треки не найдены</p>
    );
  }, [filteredTracks]);

  return (
    <main>
      <div className='container'>
        <Albums value={albumId} onChangeAlbom={onChangeAlbum} albums={albums} />
        <Search />
        <div className='main__column'>
          {status === 'error' ? (
            <h2>Треки отсутствуют</h2>
          ) : (
            <div className='main__inner'>
              {
                status === 'loading' ? 'загрузка треков' : trackFilter // через слайс делаем проверку при загрузке надпись, если все хорошо выводим треки
              }
            </div>
          )}
          <Filters tracks={tracks} />
        </div>
      </div>
    </main>
  );
}
