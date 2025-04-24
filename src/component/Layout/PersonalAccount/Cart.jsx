import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartTracks } from './CartTracks';
import { clearItem, selectAllTracks, toggleTrackSelection } from '../../../redux/slices/cartSlice';

export function Cart() {
  const dispatch = useDispatch();
  const { items, selectedTracks, selectAll, totalPrice } = useSelector((state) => state.cart);

  const sliderRef = useRef(null);

  const handleSelectAll = (e) => {
    e.stopPropagation();
    dispatch(selectAllTracks(!selectAll)); // Отправляем true/false для выбора/снятия всех треков
  };

  const handleTrackSelect = (trackId) => (e) => {
    e.stopPropagation();
    dispatch(toggleTrackSelection(trackId)); // Отправляем ID трека для переключения
  };

  const onClickClear = () => {
    if (window.confirm('Очистить корзину?')) {
      dispatch(clearItem());
    }
  };

  return (
    <section>
      <div className='container'>
        <h2 className='cart__title'>Корзина</h2>
        <div className='cart__inner'>
          <div className='cart__checkbox-bloc'>
            <label className='cart__checkbox-label' htmlFor='selectAll'>
              <input
                type='checkbox'
                id='selectAll'
                className='cart__checkbox'
                checked={selectAll}
                onChange={handleSelectAll}
              />
              <span className='cart__checkbox-box'></span>
              Выбрать всё
            </label>
            <div
              ref={sliderRef}
              className={`cart__slider-track ${
                items.length > 4 ? 'cart__slider-track--scroll' : ''
              }`}
              style={{
                maxHeight: items.length > 4 ? '370px' : 'auto',
                overflowY: items.length > 4 ? 'auto' : 'hidden',
              }}
            >
              {items.length > 0 ? (
                items
                  .filter((item) => item && typeof item === 'object' && item.id)
                  .map((item) => (
                    <div className='cart__slider-list' key={item.id}>
                      <label className='cart__checkbox-label' htmlFor={`track-${item.id}`}>
                        <input
                          type='checkbox'
                          id={`track-${item.id}`}
                          className='cart__checkbox'
                          checked={selectedTracks.includes(item.id)}
                          onChange={handleTrackSelect(item.id)}
                        />
                        <span className='cart__checkbox-box'></span>
                        <CartTracks {...item} />
                      </label>
                    </div>
                  ))
              ) : (
                <p>Корзина пуста</p>
              )}
            </div>
            <button onClick={onClickClear} className='Button Button__red'>
              Очистить корзину
            </button>
          </div>
          <div className='cart__total-bloc'>
            <h2 className='cart__total-title'>Итого</h2>
            <div className='cart__item'>
              <span className='cart__item-active'></span>
              <div className='cart__item-link'>
                <p>Выбрано треков: </p>
                <div>{selectedTracks.length} шт.</div>
              </div>
            </div>
            <div className='cart__item'>
              <span className='cart__item-active'></span>
              <div className='cart__item-link'>
                <h2>К оплате: </h2>
                <h2>{totalPrice} ₽</h2>
              </div>
            </div>
            <button className='Button Button__blue'>Оплатить</button>
          </div>
        </div>
      </div>
    </section>
  );
}
