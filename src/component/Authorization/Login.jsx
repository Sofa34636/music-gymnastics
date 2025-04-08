import { useRef, useState, useEffect } from 'react';
import axios from '../../api/axios';
import styles from './Register.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const LOGIN_URL = '/auth';

export function Login() {
  const { setAuth } = useAuth(); // Функция для сохранения данных авторизации

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const userRef = useRef(); // Ссылка на input имени пользователя
  const errRef = useRef(); // Ссылка на элемент ошибки

  const [user, setUser] = useState(''); // Состояние имени пользователя
  const [pwd, setPwd] = useState(''); // Состояние пароля
  const [errMsg, setErrMsg] = useState(''); // Состояние сообщения об ошибке

  useEffect(() => {
    userRef.current.focus(); // Устанавливает фокус на поле имени при загрузке
  }, []);

  useEffect(() => {
    setErrMsg(''); // Сбрасывает ошибку при изменении имени или пароля
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // предатвращение перезагрузки страницы

    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }), {
        // Отправляет имя и пароль
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true, // Отправляет куки
      });
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken; // Получает токен
      const roles = response?.data?.roles; // Получает роли
      setAuth({ user, pwd, roles, accessToken }); // Сохраняет данные авторизации
      setUser(''); // Очищает поле имени
      setPwd(''); // Очищает поле пароля
      navigate(from, { replace: true });
    } catch (err) {
      // Обрабатывает ошибки
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus(); // Фокус на сообщение об ошибке
    }
  };

  return (
    <section className={styles.inner}>
      <div className={styles.section}>
        <p ref={errRef} className={errMsg ? styles.errmsg : styles.offscreen} aria-live='assertive'>
          {errMsg}
        </p>
        <h1>Вход</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.form__bloc}>
            <label htmlFor='username'>E-mail</label>
            <input
              type='text'
              id='username'
              ref={userRef}
              autoComplete='off'
              onChange={(e) => setUser(e.target.value)}
              value={user} // очищаем данные
              required
            />
          </div>
          <div className={styles.form__bloc}>
            <label htmlFor='password'>Пароль</label>
            <input
              type='password'
              id='password'
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
          </div>
          <div className={styles.form__button}>
            <button className={`${styles.form__button_gray} ${styles.form__button_item}`}>
              <Link to='/register'>Регистрация</Link>
            </button>
            <button className={`${styles.form__button_blue} ${styles.form__button_item}`}>
              Войти
            </button>
          </div>
        </form>
        <p>
          Забыли пароль?
          <br />
        </p>
      </div>
    </section>
  );
}
