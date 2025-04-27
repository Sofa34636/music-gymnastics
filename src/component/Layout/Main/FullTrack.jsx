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
          <div class='fullTrack__titel'>
            <h2>Информация о треке</h2>
            <h2>Информация об авторстве</h2>
          </div>
          <div className='fullTrack__item'>
            <div className='fullTrack__item-blok'>
              <TrackFull key={track.id} {...track} />
              <div className='fullTrack__flex fullTrack__color '>
                <p className=''>Исполнитель</p>
                <p>{track.Artist}</p>
              </div>
              <div className='fullTrack__flex fullTrack__color fullTrack__brown'>
                <p className=''>Название</p>
                <p>{track.Title}</p>
              </div>
              <div className='fullTrack__flex fullTrack__color '>
                <p className=''>Жанр</p>
                <p>{track.Genre}</p>
              </div>
              <div className='fullTrack__flex fullTrack__color fullTrack__brown'>
                <p className=''>Темп</p>
                <p>{track.Tempo}</p>
              </div>
              <div className='fullTrack__flex fullTrack__color '>
                <p className=''>Голос</p>
                <p>{track.Voice}</p>
              </div>
              <div className='fullTrack__flex fullTrack__color fullTrack__brown'>
                <p className=''>Длительность</p>
                <p>{track.Duration}</p>
              </div>
              <div className='fullTrack__flex fullTrack__color '>
                <p className=''>Язык</p>
                <p>{track.Language}</p>
              </div>
              <div className='fullTrack__flex fullTrack__color fullTrack__brown'>
                <p className=''>Альбомы</p>
                <p>{track.Albums}</p>
              </div>
            </div>
            <div className='fullTrack__item-blok'>
              <div className='fullTrack__flex fullTrack__color '>
                <p className=''>Композитор</p>
                <p>{track.Composer}</p>
              </div>
              <div className='fullTrack__flex fullTrack__color fullTrack__brown'>
                <p className=''>Текст</p>
                <p>{track.Lyricist}</p>
              </div>
              <div className='fullTrack__flex fullTrack__color '>
                <p className=''>Аранжировка</p>
                <p>{track.Arrangement}</p>
              </div>
              <div className='fullTrack__flex fullTrack__color fullTrack__brown'>
                <p className=''>Студия записи</p>
                <p>{track.RecordingStudio}</p>
              </div>
            </div>
          </div>

          <button className='Button Button__blue '>Отправить повторно</button>
        </div>
      </div>
    </section>
  );
}
