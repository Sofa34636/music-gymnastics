import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Добавляем Redux хуки
import { resetFilters, setFilters } from '../../redux/slices/filterSlice'; // Импортируем действие для фильтров
import { Tracks } from '../Main/Tracks';
import { Albums } from '../Main/Albums';
import { Filters } from '../Main/Filters';
import { Search } from '../Main/Search';
import { setAlbumId } from '../../redux/slices/albumSlice';
import { setTracks } from '../../redux/slices/trackSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

// Больше не нужны локальные defaultFilters, они в сторе
export function Main() {
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const dispatch = useDispatch(); // dispatch - функция, которая меняет стейт
  const filters = useSelector((state) => state.filters); // Получаем фильтры из стора
  const { albums, albumId } = useSelector((state) => state.albums);
  const tracks = useSelector((state) => state.tracks.tracks || []);

  const onChangeAlbum = (id) => {
    dispatch(setAlbumId(id)); //меняем категорью на новую, которая к нам придет
    dispatch(resetFilters()); // обнуление
  };

  // const [tracks, setTracks] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');

  // Обработка загруженных треков
  const handleTracksLoad = (arr, currentAlbumId) => {
    const validTracks = Array.isArray(arr) ? arr : [];
    console.log('Треки для альбома', currentAlbumId, ':', validTracks);
    dispatch(setTracks(validTracks)); // Диспатчим треки в Redux
    const minPrice =
      validTracks.length > 0 ? Math.min(...validTracks.map((t) => parseInt(t.Price))) : 0;
    const maxPrice =
      validTracks.length > 0 ? Math.max(...validTracks.map((t) => parseInt(t.Price))) : 1000;
    // Обновляем фильтры через Redux
    dispatch(
      setFilters({
        ...filters,
        priceRange: [minPrice, maxPrice],
      }),
    );
  };

  const fatchTracks = () => {
    console.log('Текущий albumId:', albumId);
    const url =
      albumId === 0
        ? 'https://66fbc16c8583ac93b40d1654.mockapi.io/tracks'
        : `https://66fbc16c8583ac93b40d1654.mockapi.io/tracks?Albums=${albumId}`;

    axios
      .get(url)
      .then((res) => handleTracksLoad(res.data, albumId))
      .catch((error) => {
        console.error('Ошибка при загрузке треков:', error.message, error.response);
        dispatch(setTracks([]));
        dispatch(
          setFilters({
            priceRange: [0, 1000],
            genres: [],
            tempos: [],
            voices: [],
            durations: [],
            languages: [],
          }),
        );
      });
  };

  // если был первый рендер, то проверяем URL - параметры и сохраняем в редакс
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      console.log('Параметры из URL:', params);
      const parseParam = (value, fallback) => {
        if (!value) return fallback;
        try {
          return JSON.parse(value);
        } catch (error) {
          console.error(`Ошибка парсинга параметра: ${value}`, error);
          return fallback;
        }
      };
      const newFilters = {
        priceRange: parseParam(params.priceRange, filters.priceRange),
        genres: parseParam(params.genres, filters.genres),
        tempos: parseParam(params.tempos, filters.tempos),
        voices: parseParam(params.voices, filters.voices),
        durations: parseParam(params.durations, filters.durations),
        languages: parseParam(params.languages, filters.languages),
      };
      // Диспатчим только если параметры действительно отличаются
      if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
        dispatch(setFilters(newFilters));
      }
      if (params.albumId && Number(params.albumId) !== albumId) {
        dispatch(setAlbumId(Number(params.albumId)));
      }
      isSearch.current = true; // проверяем были ли изменения
    }
  }, [dispatch]);

  useEffect(() => {
    if (isMounted.current) {
      // если был первый рендер вшиваем в адресную строку
      const queryString = qs.stringify({
        albumId,
        priceRange: JSON.stringify(filters.priceRange),
        genres: JSON.stringify(filters.genres),
        tempos: JSON.stringify(filters.tempos),
        voices: JSON.stringify(filters.voices),
        durations: JSON.stringify(filters.durations),
        languages: JSON.stringify(filters.languages),
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [albumId, filters]);

  useEffect(() => {
    // Если был первы рендер, то запрашиваем треки
    window.scrollTo(0, 0);

    fatchTracks();

    isSearch.current = true;
  }, [albumId]);

  const filteredTracks = React.useMemo(() => {
    let result = tracks.filter((track) => {
      const price = parseInt(track.Price);
      const searchMatch = searchValue
        ? track.TrackNumber.toLowerCase().includes(searchValue.toLowerCase())
        : true;
      const priceMatch = price >= filters.priceRange[0] && price <= filters.priceRange[1];
      const genreMatch = filters.genres.length === 0 || filters.genres.includes(track.Genre);
      const tempoMatch = filters.tempos.length === 0 || filters.tempos.includes(track.Tempo);
      const voiceMatch = filters.voices.length === 0 || filters.voices.includes(track.Voice);
      const durationMatch =
        filters.durations.length === 0 || filters.durations.includes(track.Duration);
      const languageMatch =
        filters.languages.length === 0 || filters.languages.includes(track.Language);
      return (
        searchMatch &&
        priceMatch &&
        genreMatch &&
        tempoMatch &&
        voiceMatch &&
        durationMatch &&
        languageMatch
      );
    });

    if (albumId !== 0) {
      const selectedAlbum = albums[albumId];
      const quantity = selectedAlbum
        ? parseInt(selectedAlbum.quantity) || result.length
        : result.length;
      result = result.slice(0, quantity);
    }

    console.log('Отфильтрованные треки:', result);
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
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className='main__column'>
          <div className='main__inner'>{trackFilter}</div>
          <Filters tracks={tracks} />
        </div>
      </div>
    </main>
  );
}
