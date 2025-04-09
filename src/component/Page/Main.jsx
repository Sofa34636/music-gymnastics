import React from 'react';
import { Tracks } from '../Main/Tracks';
import { Albums } from '../Main/Albums';
import { Filters } from '../Main/Filters';
import { Search } from '../Main/Search';

// Локальные данные альбомов: массив объектов с информацией об альбомах
const albums = [
  { image: '', title: 'Все треки', quantity: '357' },
  { image: '', title: 'NEW', quantity: '357' },
  { image: '', title: 'NEW', quantity: '357' },
  { image: '', title: 'NEW', quantity: '357' },
  { image: '', title: 'NEW', quantity: '357' },
  { image: '', title: 'NEW', quantity: '357' },
  { image: '', title: 'NEW', quantity: '357' },
  { image: '', title: 'NEW', quantity: '357' },
];

// Начальные значения фильтров: объект с пустыми массивами и диапазоном цен по умолчанию
const defaultFilters = {
  priceRange: [0, 1000], // Диапазон цен от 0 до 1000
  genres: [], // Список выбранных жанров
  tempos: [], // Список выбранных темпов
  voices: [], // Список выбранных голосов
  durations: [], // Список выбранных длительностей
  languages: [], // Список выбранных языков
};

export function Main() {
  const [tracks, setTracks] = React.useState([]); // Состояние для хранения списка треков, изначально пустой массив
  const [albumId, setAlbomId] = React.useState(0); // Состояние для текущего выбранного альбома, изначально 0 (все треки)
  const [filters, setFilters] = React.useState(defaultFilters); // Состояние для текущих фильтров, изначально берётся из defaultFilters
  const [searchValue, setSearchValue] = React.useState('');

  // Функция для обработки загруженных треков из API
  const handleTracksLoad = (arr, currentAlbumId) => {
    const validTracks = Array.isArray(arr) ? arr : []; // Проверяем, является ли ответ массивом, если нет — пустой массив

    console.log('Треки для альбома', currentAlbumId, ':', validTracks); // Логируем загруженные треки для отладки

    setTracks(validTracks); // Устанавливаем треки в состояние

    const minPrice = // Вычисляем минимальную цену из треков или 0, если треков нет
      validTracks.length > 0 ? Math.min(...validTracks.map((t) => parseInt(t.Price))) : 0;
    // Вычисляем максимальную цену из треков или 1000, если треков нет
    const maxPrice =
      validTracks.length > 0 ? Math.max(...validTracks.map((t) => parseInt(t.Price))) : 1000;
    // Обновляем фильтры: сбрасываем все поля, кроме priceRange, который устанавливаем по данным
    setFilters({
      ...defaultFilters,
      priceRange: [minPrice, maxPrice],
    });
  };

  React.useEffect(() => {
    // Формируем URL в зависимости от albumId: все треки для 0, иначе по альбому
    const url =
      albumId === 0
        ? `https://66fbc16c8583ac93b40d1654.mockapi.io/tracks`
        : `https://66fbc16c8583ac93b40d1654.mockapi.io/tracks?Albums=${albumId}`;

    // Выполняем запрос к API
    fetch(url)
      .then((ref) => ref.json()) // Преобразуем ответ в JSON
      .then((arr) => handleTracksLoad(arr, albumId)) // Обрабатываем данные через функцию
      .catch((error) => {
        // В случае ошибки логируем её
        console.error('Ошибка:', error);
        // Сбрасываем треки до пустого массива
        setTracks([]);
        // Сбрасываем фильтры до начальных значений
        setFilters(defaultFilters);
      });
    // Прокручиваем страницу вверх после загрузки
    window.scrollTo(0, 0);
  }, [albumId]); // Зависимость: эффект срабатывает при смене albumId

  // Обработчик изменения фильтров из компонента Filters
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters); // Устанавливаем новые фильтры
    console.log('Фильтры:', newFilters); // Логируем для отладки
  };

  // Мемоизация отфильтрованных треков для оптимизации производительности
  const filteredTracks = React.useMemo(() => {
    // Фильтруем треки по текущим значениям фильтров
    let result = tracks.filter((track) => {
      const price = parseInt(track.Price); // Преобразуем цену трека в число
      const searchMatch = searchValue
        ? track.TrackNumber.toLowerCase().includes(searchValue.toLowerCase())
        : true; // Поиск по TrackNumber
      const priceMatch = price >= filters.priceRange[0] && price <= filters.priceRange[1]; // Соответствие диапазону цен
      const genreMatch = filters.genres.length === 0 || filters.genres.includes(track.Genre); // Соответствие жанру (если жанры не выбраны — все)
      const tempoMatch = filters.tempos.length === 0 || filters.tempos.includes(track.Tempo); // Соответствие темпу
      const voiceMatch = filters.voices.length === 0 || filters.voices.includes(track.Voice); // Соответствие голосу
      const durationMatch =
        filters.durations.length === 0 || filters.durations.includes(track.Duration); // Соответствие длительности
      const languageMatch =
        filters.languages.length === 0 || filters.languages.includes(track.Language); // Соответствие языку

      // Трек проходит фильтр, если все условия истинны
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

    // Если выбран альбом (не 0), ограничиваем количество треков по quantity
    if (albumId !== 0) {
      const selectedAlbum = albums[albumId]; // Получаем текущий альбом
      // Устанавливаем лимит: quantity альбома или длина результата, если quantity не задано
      const quantity = selectedAlbum
        ? parseInt(selectedAlbum.quantity) || result.length
        : result.length;
      result = result.slice(0, quantity); // Обрезаем массив до указанного количества
    }

    // Логируем результат фильтрации для отладки
    console.log('Отфильтрованные треки:', result);
    return result;
  }, [tracks, filters, albumId, searchValue]); // Зависимости: пересчитываем при изменении tracks, filters или albumId

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
        <Albums
          value={albumId} // Текущий выбранный альбом
          onChangeAlbom={(id) => setAlbomId(id)} // Обработчик смены альбома
          albums={albums} // Передаём массив альбомов
        />
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className='main__column'>
          <div className='main__inner'>{trackFilter}</div>
          <Filters
            tracks={tracks} // Передаём список треков
            filters={filters} // Передаём текущие фильтры
            onFilterChange={handleFilterChange} // Передаём обработчик изменений
          />
        </div>
      </div>
    </main>
  );
}
