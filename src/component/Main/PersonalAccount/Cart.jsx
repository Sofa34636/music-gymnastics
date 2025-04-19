import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function Cart() {
  const dispatch = useDispatch();
  return (
    <section>
      <div class='container'>
        <h2 className='cart__title'>Корзина</h2>
        <div class='cart__inner'>
          <div class='cart__checkbox-bloc'>
            <label className='Filters__list' htmlFor=''>
              <input type='checkbox' className='Filters__item' />
              <span className='Filters__box'></span>
              Выбрать всё
            </label>
            <div class=''>
              <label className='Filters__list' htmlFor=''>
                <input type='checkbox' className='Filters__item' />
                <span className='Filters__box'></span>
                Выбрать всё
              </label>
              {/* <div class='track'>
                <div class='track__bloc' key={id}>
                  <AudioPlayer audioFile={audio} />
                  <div class='track__voice'>
                    <div>{TrackNumber}</div>
                    <div>{Price} ₽</div>
                  </div>
                  <div>{Duration}</div>

                  <img src={blackCart} alt='' />
                </div>
              </div> */}
            </div>
          </div>
          <div class='cart__total-bloc'>
            <h2 className='cart__total-title'>Итого</h2>

            <div class='cart__item'>
              <span class='cart__item-active'></span>
              <div class='cart__item-link '>
                <p>Трек</p>
                <div class=''> шт.</div>
              </div>
            </div>
            <div class='cart__item'>
              <span class='cart__item-active'></span>
              <div class='cart__item-link '>
                <h2 class=''>К оплате</h2>
                <h2 class=''>₽</h2>
              </div>
            </div>
            <button className='Button Button__blue'>Оплатить</button>
          </div>
        </div>
      </div>
    </section>
  );
}
