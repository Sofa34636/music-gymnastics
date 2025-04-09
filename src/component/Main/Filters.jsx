import React from 'react';
import ReactSlider from 'react-slider';

// Компонент Filters отвечает за отображение и управление фильтрами для треков
export function Filters({ tracks, filters, onFilterChange }) {
  // Извлекаем цены из треков для диапазона цен, если треков нет — используем [0]
  const prices = tracks.length > 0 ? tracks.map((track) => parseInt(track.Price)) : [0];
  // Минимальная цена: минимальное значение из prices или 0, если треков нет
  const minPrice = tracks.length > 0 ? Math.min(...prices) : 0;
  // Максимальная цена: максимальное значение из prices или 1000, если треков нет
  const maxPrice = tracks.length > 0 ? Math.max(...prices) : 1000;

  // Уникальные значения для фильтров: собираем только из доступных треков, иначе пустой массив
  const uniqueGenres = tracks.length > 0 ? [...new Set(tracks.map((track) => track.Genre))] : [];
  const uniqueTempos = tracks.length > 0 ? [...new Set(tracks.map((track) => track.Tempo))] : [];
  const uniqueVoices = tracks.length > 0 ? [...new Set(tracks.map((track) => track.Voice))] : [];
  const uniqueDurations =
    tracks.length > 0 ? [...new Set(tracks.map((track) => track.Duration))] : [];
  const uniqueLanguages =
    tracks.length > 0 ? [...new Set(tracks.map((track) => track.Language))] : [];

  // Функция для разделения списка на две колонки (для жанров и языков, до 6 элементов в одной колонке)
  const splitIntoColumns = (items) => {
    if (items.length <= 6) return [items, []]; // Если <= 6, вторая колонка пустая
    const mid = Math.ceil(items.length / 2); // Делим пополам, округляя вверх
    return [items.slice(0, mid), items.slice(mid)]; // Возвращаем две части
  };

  // Функция для разделения списка на две колонки (для длительности, до 3 элементов в одной колонке)
  const splitIntoColumns2 = (items) => {
    if (items.length <= 3) return [items, []]; // Если <= 3, вторая колонка пустая
    const mid = Math.ceil(items.length / 2); // Делим пополам, округляя вверх
    return [items.slice(0, mid), items.slice(mid)]; // Возвращаем две части
  };

  // Разделяем списки на колонки для отображения
  const [genreCol1, genreCol2] = splitIntoColumns(uniqueGenres);
  const [durationCol1, durationCol2] = splitIntoColumns2(uniqueDurations);
  const [languageCol1, languageCol2] = splitIntoColumns(uniqueLanguages);

  // Обработчик изменения слайдера цены: обновляет priceRange, если разница >= 100
  const handlePriceChange = (value) => {
    if (value[1] - value[0] >= 100) {
      onFilterChange({ ...filters, priceRange: value }); // Обновляем только priceRange
    }
  };

  // Обработчик ввода минимальной цены вручную
  const handleMinPriceInput = (e) => {
    const value = parseInt(e.target.value) || minPrice; // Значение или minPrice, если ввод некорректен
    if (value >= minPrice && value <= filters.priceRange[1] - 100) {
      onFilterChange({ ...filters, priceRange: [value, filters.priceRange[1]] }); // Устанавливаем новое минимальное значение
    } else if (value < minPrice) {
      onFilterChange({ ...filters, priceRange: [minPrice, filters.priceRange[1]] }); // Ограничиваем снизу
    } else if (value > filters.priceRange[1] - 100) {
      onFilterChange({
        ...filters,
        priceRange: [filters.priceRange[1] - 100, filters.priceRange[1]], // Устанавливаем минимально допустимую разницу
      });
    }
  };

  // Обработчик ввода максимальной цены вручную
  const handleMaxPriceInput = (e) => {
    const value = parseInt(e.target.value) || maxPrice; // Значение или maxPrice, если ввод некорректен
    if (value <= maxPrice && value >= filters.priceRange[0] + 100) {
      onFilterChange({ ...filters, priceRange: [filters.priceRange[0], value] }); // Устанавливаем новое максимальное значение
    } else if (value > maxPrice) {
      onFilterChange({ ...filters, priceRange: [filters.priceRange[0], maxPrice] }); // Ограничиваем сверху
    } else if (value < filters.priceRange[0] + 100) {
      onFilterChange({
        ...filters,
        priceRange: [filters.priceRange[0], filters.priceRange[0] + 100], // Устанавливаем минимально допустимую разницу
      });
    }
  };

  // Обработчик изменения жанра: добавляет или убирает жанр из списка
  const handleGenreChange = (genre) => {
    const newGenres = filters.genres.includes(genre)
      ? filters.genres.filter((g) => g !== genre) // Убираем, если уже выбран
      : [...filters.genres, genre]; // Добавляем, если не выбран
    onFilterChange({ ...filters, genres: newGenres });
  };

  // Обработчик изменения темпа: добавляет или убирает темп из списка
  const handleTempoChange = (tempo) => {
    const newTempos = filters.tempos.includes(tempo)
      ? filters.tempos.filter((t) => t !== tempo)
      : [...filters.tempos, tempo];
    onFilterChange({ ...filters, tempos: newTempos });
  };

  // Обработчик изменения голоса: добавляет или убирает голос из списка
  const handleVoiceChange = (voice) => {
    const newVoices = filters.voices.includes(voice)
      ? filters.voices.filter((v) => v !== voice)
      : [...filters.voices, voice];
    onFilterChange({ ...filters, voices: newVoices });
  };

  // Обработчик изменения длительности: добавляет или убирает длительность из списка
  const handleDurationChange = (duration) => {
    const newDurations = filters.durations.includes(duration)
      ? filters.durations.filter((d) => d !== duration)
      : [...filters.durations, duration];
    onFilterChange({ ...filters, durations: newDurations });
  };

  // Обработчик изменения языка: добавляет или убирает язык из списка
  const handleLanguageChange = (language) => {
    const newLanguages = filters.languages.includes(language)
      ? filters.languages.filter((l) => l !== language)
      : [...filters.languages, language];
    onFilterChange({ ...filters, languages: newLanguages });
  };

  // Рендеринг интерфейса фильтров
  return (
    <section>
      <div className='Filters'>
        <div className='Filters__inner'>
          <h2>Фильтры</h2>

          <div className='Filters__genre'>
            <div className='Filters__text Filters__genre-text'>Жанр:</div>
            <div className='Filters__columns'>
              <div className='Filters__column'>
                {genreCol1.length > 0 ? (
                  genreCol1.map((genre, i) => (
                    <div key={i}>
                      <label className='Filters__list' htmlFor={`genre-${i}`}>
                        <input
                          type='checkbox'
                          id={`genre-${i}`}
                          name='genre'
                          className='Filters__item'
                          checked={filters.genres.includes(genre)} // Отмечен, если жанр выбран
                          onChange={() => handleGenreChange(genre)}
                        />
                        <span className='Filters__box'></span>
                        {genre}
                      </label>
                    </div>
                  ))
                ) : (
                  <p>-</p>
                )}
              </div>
              <div className='Filters__column'>
                {genreCol2.map((genre, i) => (
                  <div key={i + genreCol1.length}>
                    <label className='Filters__list' htmlFor={`genre-${i + genreCol1.length}`}>
                      <input
                        type='checkbox'
                        id={`genre-${i + genreCol1.length}`}
                        name='genre'
                        className='Filters__item'
                        checked={filters.genres.includes(genre)}
                        onChange={() => handleGenreChange(genre)}
                      />
                      <span className='Filters__box'></span>
                      {genre}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='Filters__bloc'>
            <div className='Filters__pace'>
              <div className='Filters__text Filters__pace-text'>Темп:</div>
              <div>
                <div className='Filters__column'>
                  {uniqueTempos.length > 0 ? (
                    uniqueTempos.map((tempo, i) => (
                      <div key={i}>
                        <label className='Filters__list' htmlFor={`tempo-${i}`}>
                          <input
                            type='checkbox'
                            id={`tempo-${i}`}
                            name='pace'
                            className='Filters__item'
                            checked={filters.tempos.includes(tempo)}
                            onChange={() => handleTempoChange(tempo)}
                          />
                          <span className='Filters__box'></span>
                          {tempo}
                        </label>
                      </div>
                    ))
                  ) : (
                    <p>-</p>
                  )}
                </div>
              </div>
            </div>
            <div className='Filters__voice'>
              <div className='Filters__text Filters__voice-text'>Голос:</div>
              <div>
                <div className='Filters__column'>
                  {uniqueVoices.length > 0 ? (
                    uniqueVoices.map((voice, i) => (
                      <div key={i}>
                        <label className='Filters__list' htmlFor={`voice-${i}`}>
                          <input
                            type='checkbox'
                            id={`voice-${i}`}
                            name='voice'
                            className='Filters__item'
                            checked={filters.voices.includes(voice)}
                            onChange={() => handleVoiceChange(voice)}
                          />
                          <span className='Filters__box'></span>
                          {voice}
                        </label>
                      </div>
                    ))
                  ) : (
                    <p>-</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='Filters__price'>
            <p className='Filters__text Filters__price-text'>Цена:</p>
            <div className='price-input'>
              <div className='field'>
                <span>От</span>
                <input
                  type='number'
                  className='input-min'
                  value={filters.priceRange[0]} // Текущее минимальное значение
                  onChange={handleMinPriceInput}
                />
              </div>
              <div className='separator'>-</div>
              <div className='field'>
                <span>До</span>
                <input
                  type='number'
                  className='input-max'
                  value={filters.priceRange[1]} // Текущее максимальное значение
                  onChange={handleMaxPriceInput}
                />
              </div>
            </div>
            <ReactSlider
              className='custom-slider'
              min={minPrice}
              max={maxPrice}
              step={10} // Шаг изменения цены
              value={filters.priceRange} // Текущий диапазон
              onChange={handlePriceChange}
              minDistance={100} // Минимальная разница между min и max
              pearling // Позволяет двигать оба ползунка
              trackClassName='custom-track' // Стили для трека
              thumbClassName='custom-thumb' // Стили для ползунков
            />
          </div>
          <div className='Filters__duration'>
            <div className='Filters__text Filters__duration-text'>Длительность:</div>
            <div className='Filters__columns'>
              <div className='Filters__column'>
                {durationCol1.length > 0 ? (
                  durationCol1.map((duration, i) => (
                    <div key={i}>
                      <label className='Filters__list' htmlFor={`duration-${i}`}>
                        <input
                          type='checkbox'
                          id={`duration-${i}`}
                          name='duration'
                          className='Filters__item'
                          checked={filters.durations.includes(duration)}
                          onChange={() => handleDurationChange(duration)}
                        />
                        <span className='Filters__box'></span>
                        {duration}
                      </label>
                    </div>
                  ))
                ) : (
                  <p>-</p>
                )}
              </div>
              <div className='Filters__column'>
                {durationCol2.map((duration, i) => (
                  <div key={i + durationCol1.length}>
                    <label
                      className='Filters__list'
                      htmlFor={`duration-${i + durationCol1.length}`}
                    >
                      <input
                        type='checkbox'
                        id={`duration-${i + durationCol1.length}`}
                        name='duration'
                        className='Filters__item'
                        checked={filters.durations.includes(duration)}
                        onChange={() => handleDurationChange(duration)}
                      />
                      <span className='Filters__box'></span>
                      {duration}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='Filters__language'>
            <div className='Filters__text Filters__language-text'>Язык:</div>
            <div className='Filters__columns'>
              <div className='Filters__column'>
                {languageCol1.length > 0 ? (
                  languageCol1.map((language, i) => (
                    <div key={i}>
                      <label className='Filters__list' htmlFor={`language-${i}`}>
                        <input
                          type='checkbox'
                          id={`language-${i}`}
                          name='language'
                          className='Filters__item'
                          checked={filters.languages.includes(language)}
                          onChange={() => handleLanguageChange(language)}
                        />
                        <span className='Filters__box'></span>
                        {language}
                      </label>
                    </div>
                  ))
                ) : (
                  <p>-</p>
                )}
              </div>
              <div className='Filters__column'>
                {languageCol2.map((language, i) => (
                  <div key={i + languageCol1.length}>
                    <label
                      className='Filters__list'
                      htmlFor={`language-${i + languageCol1.length}`}
                    >
                      <input
                        type='checkbox'
                        id={`language-${i + languageCol1.length}`}
                        name='language'
                        className='Filters__item'
                        checked={filters.languages.includes(language)}
                        onChange={() => handleLanguageChange(language)}
                      />
                      <span className='Filters__box'></span>
                      {language}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            className='Button__red'
            onClick={() => {
              onFilterChange({
                priceRange: [minPrice, maxPrice], // Сбрасываем до начального диапазона
                genres: [],
                tempos: [],
                voices: [],
                durations: [],
                languages: [],
              });
            }}
          >
            Сбросить фильтры
          </button>
        </div>
      </div>
    </section>
  );
}
