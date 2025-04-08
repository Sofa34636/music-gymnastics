import React, { useState } from 'react';
import blackCart from '../../Images/icon/black cart.svg';
import Import from '../../Images/icon/import.svg';
import sound from '../../Images/icon/sound.svg';
import pause from '../../Images/icon/pause.svg';
import play from '../../Images/icon/play.svg';
import { AudioPlayer } from './AudioPlayer';
import { Filters } from './Filters';
import audio from '../../assets/audio.mp3';

export const tracks = [
  {
    id: '1',
    TrackNumber: 'Track_8913',
    Artist: '-',
    Title: '-',
    Genre: 'Упал',
    Tempo: 'Быстро',
    Voice: 'Есть',
    Duration: '1:00',
    Language: 'Русский',
    Albums: '-',
    Price: '749',
    Composer: '-',
    Lyricist: '-',
    Arrangement: '-',
    RecordingStudio: '-',
  },
  {
    id: '2',
    TrackNumber: 'Track_8913',
    Artist: '-',
    Title: '-',
    Genre: 'Встал',
    Tempo: 'Умеренно',
    Voice: 'Нет',
    Duration: '1:15',
    Language: 'Английский',
    Albums: '-',
    Price: '300',
    Composer: '-',
    Lyricist: '-',
    Arrangement: '-',
    RecordingStudio: '-',
  },
  {
    id: '3',
    TrackNumber: 'Track_8913',
    Artist: '-',
    Title: '-',
    Genre: 'Упай',
    Tempo: 'Медленно',
    Voice: 'Вокализ',
    Duration: '1:30',
    Language: 'Французский',
    Albums: '-',
    Price: '800',
    Composer: '-',
    Lyricist: '-',
    Arrangement: '-',
    RecordingStudio: '-',
  },
  {
    id: '4',
    TrackNumber: 'Track_8913',
    Artist: '-',
    Title: '-',
    Genre: 'Не',
    Tempo: 'Быстро',
    Voice: 'Есть',
    Duration: '2:00',
    Language: 'Испанский',
    Albums: '-',
    Price: '756',
    Composer: '-',
    Lyricist: '-',
    Arrangement: '-',
    RecordingStudio: '-',
  },
  {
    id: '5',
    TrackNumber: 'Track_8913',
    Artist: '-',
    Title: '-',
    Genre: 'Дабуди',
    Tempo: 'Умеренно',
    Voice: 'Нет',
    Duration: '2:30',
    Language: 'Татарский',
    Albums: '-',
    Price: '853',
    Composer: '-',
    Lyricist: '-',
    Arrangement: '-',
    RecordingStudio: '-',
  },
  {
    id: '6',
    TrackNumber: 'Track_8913',
    Artist: '-',
    Title: '-',
    Genre: 'Вставай',
    Tempo: 'Умеренно',
    Voice: 'Нет',
    Duration: '2:30',
    Language: 'Казахский',
    Albums: '-',
    Price: '964',
    Composer: '-',
    Lyricist: '-',
    Arrangement: '-',
    RecordingStudio: '-',
  },
  {
    id: '7',
    TrackNumber: 'Track_8913',
    Artist: '-',
    Title: '-',
    Genre: 'Чокопай',
    Tempo: 'Медленно',
    Voice: 'Вокализ',
    Duration: '1:30',
    Language: 'Китайский',
    Albums: '-',
    Price: '583',
    Composer: '-',
    Lyricist: '-',
    Arrangement: '-',
    RecordingStudio: '-',
  },
];

export function Tracks() {
  const [filters, setFilters] = useState({
    priceRange: [
      Math.min(...tracks.map((t) => parseInt(t.Price))),
      Math.max(...tracks.map((t) => parseInt(t.Price))),
    ],
    genres: [],
    tempos: [],
    voices: [],
    durations: [],
    languages: [],
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredTracks = tracks.filter((track) => {
    const price = parseInt(track.Price);
    const priceMatch = price >= filters.priceRange[0] && price <= filters.priceRange[1];
    const genreMatch = filters.genres.length === 0 || filters.genres.includes(track.Genre);
    const tempoMatch = filters.tempos.length === 0 || filters.tempos.includes(track.Tempo);
    const voiceMatch = filters.voices.length === 0 || filters.voices.includes(track.Voice);
    const durationMatch =
      filters.durations.length === 0 || filters.durations.includes(track.Duration);
    const languageMatch =
      filters.languages.length === 0 || filters.languages.includes(track.Language);

    return priceMatch && genreMatch && tempoMatch && voiceMatch && durationMatch && languageMatch;
  });

  return (
    <section>
      <div class='track'>
        <div class='track__inner'>
          {filteredTracks.map((track, index) => (
            <div class='track__bloc' key={index}>
              <AudioPlayer audioFile={audio} />
              {/* <div class='track__voice'> */}
              <div>{track.TrackNumber}</div>
              <div>{track.Price} ₽</div>
              {/* </div> */}
              {/* <div>{track.Duration}</div> */}

              <img src={blackCart} alt='' />
            </div>
          ))}
        </div>
        <Filters tracks={tracks} onFilterChange={handleFilterChange} />
      </div>
    </section>
  );
}
