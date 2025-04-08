import React, { useState, useEffect } from 'react';
import ReactSlider from 'react-slider';

export function Filters({ tracks, onFilterChange }) {
  // Вычисляем минимальную и максимальную цену из tracks
  const prices = tracks.map((track) => parseInt(track.Price));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // Устанавливаем начальный диапазон цен на основе данных
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedTempos, setSelectedTempos] = useState([]);
  const [selectedVoices, setSelectedVoices] = useState([]);
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const minRange = minPrice;
  const maxRange = maxPrice;
  const priceGap = 100; // Можно оставить или настроить под ваши нужды

  const uniqueGenres = [...new Set(tracks.map((track) => track.Genre))];
  const uniqueTempos = [...new Set(tracks.map((track) => track.Tempo))];
  const uniqueVoices = [...new Set(tracks.map((track) => track.Voice))];
  const uniqueDurations = [...new Set(tracks.map((track) => track.Duration))];
  const uniqueLanguages = [...new Set(tracks.map((track) => track.Language))];

  const splitIntoColumns = (items) => {
    if (items.length <= 6) return [items, []];
    const mid = Math.ceil(items.length / 2);
    return [items.slice(0, mid), items.slice(mid)];
  };
  const splitIntoColumns2 = (items) => {
    if (items.length <= 3) return [items, []];
    const mid = Math.ceil(items.length / 2);
    return [items.slice(0, mid), items.slice(mid)];
  };

  const [genreCol1, genreCol2] = splitIntoColumns(uniqueGenres);
  const [durationCol1, durationCol2] = splitIntoColumns2(uniqueDurations);
  const [languageCol1, languageCol2] = splitIntoColumns(uniqueLanguages);

  const handlePriceChange = (value) => {
    if (value[1] - value[0] >= priceGap) {
      setPriceRange(value);
    }
  };

  const handleMinPriceInput = (e) => {
    const value = parseInt(e.target.value) || minRange;
    if (value >= minRange && value <= priceRange[1] - priceGap) {
      setPriceRange([value, priceRange[1]]);
    } else if (value < minRange) {
      setPriceRange([minRange, priceRange[1]]);
    } else if (value > priceRange[1] - priceGap) {
      setPriceRange([priceRange[1] - priceGap, priceRange[1]]);
    }
  };
  const handleMaxPriceInput = (e) => {
    const value = parseInt(e.target.value) || maxRange;
    if (value <= maxRange && value >= priceRange[0] + priceGap) {
      setPriceRange([priceRange[0], value]);
    } else if (value > maxRange) {
      setPriceRange([priceRange[0], maxRange]);
    } else if (value < priceRange[0] + priceGap) {
      setPriceRange([priceRange[0], priceRange[0] + priceGap]);
    }
  };

  const handleGenreChange = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
  };

  const handleTempoChange = (tempo) => {
    setSelectedTempos((prev) =>
      prev.includes(tempo) ? prev.filter((t) => t !== tempo) : [...prev, tempo],
    );
  };

  const handleVoiceChange = (voice) => {
    setSelectedVoices((prev) =>
      prev.includes(voice) ? prev.filter((v) => v !== voice) : [...prev, voice],
    );
  };

  const handleDurationChange = (duration) => {
    setSelectedDurations((prev) =>
      prev.includes(duration) ? prev.filter((d) => d !== duration) : [...prev, duration],
    );
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguages((prev) =>
      prev.includes(language) ? prev.filter((l) => l !== language) : [...prev, language],
    );
  };

  useEffect(() => {
    onFilterChange({
      priceRange,
      genres: selectedGenres,
      tempos: selectedTempos,
      voices: selectedVoices,
      durations: selectedDurations,
      languages: selectedLanguages,
    });
  }, [
    priceRange,
    selectedGenres,
    selectedTempos,
    selectedVoices,
    selectedDurations,
    selectedLanguages,
    onFilterChange,
  ]);

  return (
    <section>
      <div className='Filters'>
        <div className='Filters__inner'>
          <h2>Фильтры</h2>
          <div className='Filters__genre'>
            <div className='Filters__text Filters__genre-text'>Жанр:</div>

            <div className='Filters__columns'>
              <div className='Filters__column'>
                {genreCol1.map((genre, i) => (
                  <div key={i}>
                    <label className='Filters__list' htmlFor={`genre-${i}`}>
                      <input
                        type='checkbox'
                        id={`genre-${i}`}
                        name='genre'
                        className='Filters__item'
                        checked={selectedGenres.includes(genre)}
                        onChange={() => handleGenreChange(genre)}
                      />
                      <span className='Filters__box'></span>

                      {genre}
                    </label>
                  </div>
                ))}
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
                        checked={selectedGenres.includes(genre)}
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
                  {uniqueTempos.map((tempo, i) => (
                    <div key={i}>
                      <label className='Filters__list' htmlFor={`tempo-${i}`}>
                        <input
                          type='checkbox'
                          id={`tempo-${i}`}
                          name='pace'
                          className='Filters__item'
                          checked={selectedTempos.includes(tempo)}
                          onChange={() => handleTempoChange(tempo)}
                        />
                        <span className='Filters__box'></span>

                        {tempo}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='Filters__voice'>
              <div className='Filters__text Filters__voice-text'>Голос:</div>
              <div>
                <div className='Filters__column'>
                  {uniqueVoices.map((voice, i) => (
                    <div key={i}>
                      <label className='Filters__list' htmlFor={`voice-${i}`}>
                        <input
                          type='checkbox'
                          id={`voice-${i}`}
                          name='voice'
                          className='Filters__item'
                          checked={selectedVoices.includes(voice)}
                          onChange={() => handleVoiceChange(voice)}
                        />
                        <span className='Filters__box'></span>

                        {voice}
                      </label>
                    </div>
                  ))}
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
                  onChange={handleMinPriceInput}
                />
              </div>
              <div className='separator'>-</div>
              <div className='field'>
                <span>До</span>
                <input
                  type='number'
                  className='input-max'
                  value={priceRange[1]}
                  onChange={handleMaxPriceInput}
                />
              </div>
            </div>
            <ReactSlider
              className='custom-slider'
              min={minRange}
              max={maxRange}
              step={10}
              value={priceRange}
              onChange={handlePriceChange}
              minDistance={priceGap}
              pearling
              trackClassName='custom-track'
              thumbClassName='custom-thumb'
            />
          </div>
          <div className='Filters__duration'>
            <div className='Filters__text Filters__duration-text'>Длительность:</div>
            <div className='Filters__columns'>
              <div className='Filters__column'>
                {durationCol1.map((duration, i) => (
                  <div key={i}>
                    <label className='Filters__list' htmlFor={`duration-${i}`}>
                      <input
                        type='checkbox'
                        id={`duration-${i}`}
                        name='duration'
                        className='Filters__item'
                        checked={selectedDurations.includes(duration)}
                        onChange={() => handleDurationChange(duration)}
                      />
                      <span className='Filters__box'></span>

                      {duration}
                    </label>
                  </div>
                ))}
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
                        checked={selectedDurations.includes(duration)}
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
                {languageCol1.map((language, i) => (
                  <div key={i}>
                    <label className='Filters__list' htmlFor={`language-${i}`}>
                      <input
                        type='checkbox'
                        id={`language-${i}`}
                        name='language'
                        className='Filters__item'
                        checked={selectedLanguages.includes(language)}
                        onChange={() => handleLanguageChange(language)}
                      />
                      <span className='Filters__box'></span>
                      {language}
                    </label>
                  </div>
                ))}
              </div>
              <div className='Filters__column'>
                {languageCol2.map((language, i) => (
                  <div key={i + languageCol1.length}>
                    <label
                      className='Filters__list'
                      htmlFor={`uniqueLanguages-${i + languageCol1.length}`}
                    >
                      <input
                        type='checkbox'
                        id={`uniqueLanguages-${i + languageCol1.length}`}
                        name='language'
                        className='Filters__item'
                        checked={selectedLanguages.includes(language)}
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
              setPriceRange([minPrice, maxPrice]);
              setSelectedGenres([]);
              setSelectedTempos([]);
              setSelectedVoices([]);
              setSelectedDurations([]);
              setSelectedLanguages([]);
              onFilterChange({
                priceRange: [minPrice, maxPrice],
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
