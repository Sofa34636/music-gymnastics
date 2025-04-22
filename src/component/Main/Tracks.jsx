import React, { useState } from 'react';
import blackCart from '../../Images/icon/black cart.svg';
import activeCart from '../../Images/icon/activeCart.png';
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
  const { items } = useSelector((state) => state.cart);
  const isInCart = items.some((item) => item.id === id); // Проверяем, есть ли трек с данным id в корзине

  const onClickAdd = () => {
    if (!isInCart) {
      const item = {
        id,
        TrackNumber,
        Price,
        Duration,
      };
      dispatch(addProduct(item));
    }
  };

  // Функция для скачивания трека. НАДО БУДЕТ ПЕРЕМЕСТИТЬ В trackSlice, КОГДА ТРЕКИ БУДУТ В МАССИВЕ
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = audio; // Путь к файлу audio.mp3
    link.download = `${TrackNumber || 'track'}.mp3`; // Имя файла при скачивании
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <button onClick={handleDownload}>
            <img src={Import} alt='' />
          </button>
          <button
            onClick={onClickAdd}
            disabled={isInCart} //disabled - делает кнопку неактивной после добавления трека
          >
            <img src={isInCart ? activeCart : blackCart} alt='' />
          </button>
        </div>
      </div>
      {/* <Filters tracks={tracks} onFilterChange={handleFilterChange} /> */}
    </section>
  );
}
