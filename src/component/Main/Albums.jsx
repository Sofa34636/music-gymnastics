import React from 'react';
import music from '../../Images/icon/music.svg';
import album from '../../Images/Album.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
const albums = [
  {
    image: album,
    title: 'NEW',
    quantity: '357',
  },
  {
    image: album,
    title: 'NEW',
    quantity: '357',
  },
  {
    image: album,
    title: 'NEW',
    quantity: '357',
  },
  {
    image: album,
    title: 'NEW',
    quantity: '357',
  },
  {
    image: album,
    title: 'NEW',
    quantity: '357',
  },
  {
    image: album,
    title: 'NEW',
    quantity: '357',
  },
  {
    image: album,
    title: 'NEW',
    quantity: '357',
  },
  {
    image: album,
    title: 'NEW',
    quantity: '357',
  },
];

export function Albums() {
  return (
    <section className='albums'>
      <div className='albums__inner'>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          slidesPerView='3'
          grabCursor={true}
          centeredSlides={false} // Отключаем центрирование для равномерного распределения
          slidesPerGroup={1}
          spaceBetween={20}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next', // Класс для кнопки "вперед"
            prevEl: '.swiper-button-prev', // Класс для кнопки "назад"
          }}
          loop={true}
          //   modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          //   slidesPerView='auto'
          //   grabCursor={true} // Добавляем визуальный курсор для перетаскивания
          //   centeredSlides={true}
          //   slidesPerGroup={1}
          //   spaceBetween={20}
          //   pagination={{ clickable: true }}
          //   loop={true}
          //  breakpoints={{
          //    700: {
          //      slidesPerView: 3,
          //    },
          //    10: {
          //      slidesPerView: 1,
          //    },
          //  }}
        >
          {albums.map((album, index) => (
            <SwiperSlide key={index}>
              <div className='albums__slider-item'>
                <div className='albums__slider-bloc'>
                  <img className='albums__slider-img' src={album.image} alt='' />
                  <div className='albums__slider-shadow'>
                    <img className='albums__img' src={music} alt='' />
                    <div className='albums__text'>{album.quantity}</div>
                  </div>
                </div>
                <p className='albums__slider-text'>{album.title}</p>
              </div>
            </SwiperSlide>
          ))}
          <div className='swiper-button-prev'></div>
          <div className='swiper-button-next'></div>
        </Swiper>
      </div>
    </section>
  );
}
