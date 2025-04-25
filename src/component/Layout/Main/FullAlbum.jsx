import React from 'react';
import fullAlbum from '../../../Images/FullAlbum.png';

export function FullAlbum() {
  return (
    <section>
      <div class='container'>
        <div class='fullAlbum__inner'>
          <img src={fullAlbum} alt='' class='fullAlbum__img' />
          <div class='fullAlbum__bloc'>
            <div class='fullAlbum__item'>
              <p>NEW</p>
              <p>треков в альбоме: 357</p>
            </div>
            <div class='fullAlbum__text'>
              Описание альбома Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. {' '}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
