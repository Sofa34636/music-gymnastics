import React from 'react';
import LogoText from '../Images/icon/LogoText.svg';
import logo from '../Images/icon/logo.svg';
import personal from '../Images/icon/personal.svg';
import cart from '../Images/icon/cart.svg';
import translate from '../Images/icon/translate.svg';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Header() {
  const { loginAsUser, loginAsAdmin, logout, auth } = useAuth();
  return (
    <header>
      <div class='header'>
        <div class='container-fluid'>
          <div class='header__gradient'>
            <div class='container'>
              <div class='header__inner'>
                <div class='header__container'>
                  <Link to='/'>
                    <img class='header__logo' src={logo} alt='' />
                  </Link>
                  <Link to='/'>
                    <img class='header__logo-text' src={LogoText} alt='' />
                  </Link>
                </div>
                {/* <nav class='header__menu'>
                  <ul class='header__list'>
                    <li class='header__list-item'>
                      <a href='' class='header__list-link'>
                        Услуги
                      </a>
                    </li>
                    <li class='header__list-item'>
                      <a href='' class='header__list-link'>
                        Оферта
                      </a>
                    </li>
                    <li class='header__list-item'>
                      <a href='' class='header__list-link'>
                        Контакты
                      </a>
                    </li>
                    <li class='header__list-item'>
                      <a href='' class='header__list-link'>
                        Выступления
                      </a>
                    </li>
                  </ul>
                </nav> */}
                {/* Добавляем кнопки для тестирования */}
                <div>
                  <span>Роль: {auth.roles.join(', ') || 'Нет'}</span>
                  <button onClick={loginAsUser}>User</button>
                  <button onClick={loginAsAdmin}>Admin</button>
                  <button onClick={logout}>Выйти</button>
                </div>
                <div class='header__icon'>
                  <img src={translate} alt='' />
                  <Link to='/cart'>
                    <img src={cart} alt='' />
                  </Link>
                  <Link to='/personalAccount'>
                    <img src={personal} alt='' />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
