import { AudioPlayer } from '../Main/AudioPlayer';
import audio from '../../../assets/audio.mp3';
import React from 'react';
import Import from '../../../Images/icon/import.svg';

export function TrackFull({ TrackNumber, Price, Duration }) {
  return (
    <section>
      <div class='track'>
        <div class='track__bloc trackFull__width'>
          <AudioPlayer audioFile={audio} />
          <div class='track__voice'>
            <div>{TrackNumber}</div>
            <div>{Price} ₽</div>
          </div>
          <div>{Duration}</div>
          <button>
            <img src={Import} alt='Скачать' />
          </button>
        </div>
      </div>
    </section>
  );
}
