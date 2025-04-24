import React from 'react';
import music from '../../../Images/icon/music.svg';
import albumImg from '../../../Images/Album.svg'; // Переименовал для ясности
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export function Albums({ value, onChangeAlbom, albums }) {
  return (
    <section className='albums'>
      <div className='albums__inner'>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          slidesPerView={5}
          grabCursor={true}
          centeredSlides={false}
          slidesPerGroup={1}
          spaceBetween={20}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          loop={true}
        >
          {albums.map((album, i) => (
            <SwiperSlide
              key={i}
              onClick={() => onChangeAlbom(i)}
              className={value === i ? 'activ' : ''}
            >
              <div className='albums__slider-item'>
                <div className='albums__slider-bloc'>
                  <img className='albums__slider-img' src={album.image || albumImg} alt='' />
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
