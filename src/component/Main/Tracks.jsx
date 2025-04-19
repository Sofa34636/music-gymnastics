import React, { useState } from 'react';
import blackCart from '../../Images/icon/black cart.svg';
import Import from '../../Images/icon/import.svg';
import sound from '../../Images/icon/sound.svg';
import pause from '../../Images/icon/pause.svg';
import play from '../../Images/icon/play.svg';
import { AudioPlayer } from './AudioPlayer';
import { Filters } from './Filters';
import audio from '../../assets/audio.mp3';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../redux/slices/cartSlice';

export function Tracks({ id, TrackNumber, Price, Duration }) {
  const dispatch = useDispatch();

  const onClickAdd = () => {
    const item = {
      id,
      TrackNumber,
      Price,
      Duration,
    };
    dispatch(addProduct(item));
  };

  return (
    <section>
      <div class='track'>
        <div class='track__bloc' key={id}>
          <AudioPlayer audioFile={audio} />
          <div class='track__voice'>
            <div>{TrackNumber}</div>
            <div>{Price} ₽</div>
          </div>
          <div>{Duration}</div>
          <button onClick={onClickAdd}>
            <img src={blackCart} alt='' />
          </button>
        </div>
      </div>
      {/* <Filters tracks={tracks} onFilterChange={handleFilterChange} /> */}
    </section>
  );
}
