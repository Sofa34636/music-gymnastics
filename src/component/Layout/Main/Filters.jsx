import React from 'react';
import ReactSlider from 'react-slider';
import {
  setPriceRange,
  toggleGenre,
  toggleTempo,
  toggleVoice,
  toggleDuration,
  toggleLanguage,
  setMinPrice,
  setMaxPrice,
  updateFromTracks,
  setFilters, // Добавляем для сброса
} from '../../../redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

// Компонент Filters отвечает за отображение и управление фильтрами для треков
export function Filters({ tracks }) {
  const dispatch = useDispatch();
  const {
    priceRange,
    genres,
    tempos,
    voices,
    durations,
    languages,
    minPrice,
    maxPrice,
    uniqueGenres,
    uniqueTempos,
    uniqueVoices,
    uniqueDurations,
    uniqueLanguages,
  } = useSelector((state) => state.filters);

  // Обновляем вычисляемые значения при изменении tracks
  React.useEffect(() => {
    dispatch(updateFromTracks(tracks));
  }, [tracks, dispatch]);

  // Функции для разделения на колонки
  const splitIntoColumns = (items, maxPerColumn = 6) => {
    if (items.length <= maxPerColumn) return [items, []];
    const mid = Math.ceil(items.length / 2);
    return [items.slice(0, mid), items.slice(mid)];
  };

  const [genreCol1, genreCol2] = splitIntoColumns(uniqueGenres);
  const [durationCol1, durationCol2] = splitIntoColumns(uniqueDurations, 3); // 3 для длительности
  const [languageCol1, languageCol2] = splitIntoColumns(uniqueLanguages);

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
                          checked={genres.includes(genre)}
                          onChange={() => dispatch(toggleGenre(genre))}
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
                        checked={genres.includes(genre)}
                        onChange={() => dispatch(toggleGenre(genre))}
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
                            checked={tempos.includes(tempo)}
                            onChange={() => dispatch(toggleTempo(tempo))}
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
                            checked={voices.includes(voice)}
                            onChange={() => dispatch(toggleVoice(voice))}
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
                  value={priceRange[0]}
                  onChange={(e) => dispatch(setMinPrice(e.target.value))}
                />
              </div>
              <div className='separator'>-</div>
              <div className='field'>
                <span>До</span>
                <input
                  type='number'
                  className='input-max'
                  value={priceRange[1]}
                  onChange={(e) => dispatch(setMaxPrice(e.target.value))}
                />
              </div>
            </div>
            <ReactSlider
              className='custom-slider'
              min={minPrice}
              max={maxPrice}
              step={10}
              value={priceRange}
              onChange={(value) => dispatch(setPriceRange(value))}
              minDistance={100}
              pearling
              trackClassName='custom-track'
              thumbClassName='custom-thumb'
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
                          checked={durations.includes(duration)}
                          onChange={() => dispatch(toggleDuration(duration))}
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
                        checked={durations.includes(duration)}
                        onChange={() => dispatch(toggleDuration(duration))}
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
                          checked={languages.includes(language)}
                          onChange={() => dispatch(toggleLanguage(language))}
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
                        checked={languages.includes(language)}
                        onChange={() => dispatch(toggleLanguage(language))}
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
            className='Button Button__red'
            onClick={() => {
              dispatch(
                setFilters({
                  priceRange: [minPrice, maxPrice],
                  genres: [],
                  tempos: [],
                  voices: [],
                  durations: [],
                  languages: [],
                }),
              );
            }}
          >
            Сбросить фильтры
          </button>
        </div>
      </div>
    </section>
  );
}
