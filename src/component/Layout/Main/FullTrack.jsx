import React, { useEffect, useState } from 'react';
import { TrackFull } from './TrackFull';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export function FullTrack() {
  const { id } = useParams(); // передаем параметры и делаем перересовку

  const [track, setTrack] = useState();

  useEffect(() => {
    async function fatchTrack() {
      try {
        const { data } = await axios.get(
          `https://66fbc16c8583ac93b40d1654.mockapi.io/tracks/` + id,
        );
        setTrack(data);
      } catch (error) {
        alert('Жопа');
      }
    }
    fatchTrack();
  }, [id]);
  if (!track) {
    return 'Загрузка...';
  }
  return (
    <section className='FullTrack'>
      <div className='container'>
        <div className='fullTrack__inner'>
          <div className=''>
            <h2>{id}</h2>
            <h2>Информация о треке</h2>
            <TrackFull key={track?.id} {...track} />
            <div className=''>
              <p className=''>Исполнитель</p>
              <p>{track.Artist}</p>
            </div>
            <div className=''>
              <p className=''>Название</p>
              <p>{track.Title}</p>
            </div>
            <div className=''>
              <p className=''>Жанр</p>
              <p>{track.Genre}</p>
            </div>
            <div className=''>
              <p className=''>Темп</p>
              <p>{track.Tempo}</p>
            </div>
            <div className=''>
              <p className=''>Голос</p>
              <p>{track.Voice}</p>
            </div>
            <div className=''>
              <p className=''>Длительность</p>
              <p>{track.Duration}</p>
            </div>
            <div className=''>
              <p className=''>Язык</p>
              <p>{track.Language}</p>
            </div>
            <div className=''>
              <p className=''>Альбомы</p>
              <p>{track.Albums}</p>
            </div>
          </div>
          <div className=''>
            <h2>Информация об авторстве</h2>
            <div className=''>
              <p className=''>Композитор</p>
              <p>{track.Composer}</p>
            </div>
            <div className=''>
              <p className=''>Текст</p>
              <p>{track.Lyricist}</p>
            </div>
            <div className=''>
              <p className=''>Аранжировка</p>
              <p>{track.Arrangement}</p>
            </div>
            <div className=''>
              <p className=''>Студия записи</p>
              <p>{track.RecordingStudio}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
