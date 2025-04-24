import { AudioPlayer } from '../Main/AudioPlayer';
import audio from '../../../assets/audio.mp3';
import React, { useState } from 'react';
import clear from '../../../Images/icon/clear.png';
import Import from '../../../Images/icon/import.svg';
import { useDispatch } from 'react-redux';
import { removeItem } from '../../../redux/slices/cartSlice';

export function CartTracks({ id, TrackNumber, Price, Duration }) {
  const dispatch = useDispatch();

  const onClickRemove = () => {
    if (window.confirm('Ты действительно хочешь удалить?')) {
      dispatch(removeItem(id));
    }
  };

  return (
    <section>
      <div class='track'>
        <div class='track__bloc cart__CartTracks'>
          <AudioPlayer audioFile={audio} />
          <div class='track__voice'>
            <div>{TrackNumber}</div>
            <div>{Price} ₽</div>
          </div>
          <div>{Duration}</div>
          <button>
            <img src={Import} alt='Скачать' />
          </button>
          <button onClick={onClickRemove}>
            <img src={clear} alt='Удалить' />
          </button>
        </div>
      </div>
    </section>
  );
}
