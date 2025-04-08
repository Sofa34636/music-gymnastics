import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Register.module.scss';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';

const USER_REGEX = /^[A-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const REGISTER_URL = '/register';

export function Register() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [birthDate, setBirthDate] = useState('');
  const [validBirthDate, setValidBirthDate] = useState(false);
  const [birthDateFocus, setBirthDateFocus] = useState(false);

  const [country, setCountry] = useState('');
  const [validCountry, setValidCountry] = useState(false);
  const [countryFocus, setCountryFocus] = useState(false);

  const [region, setRegion] = useState('');
  const [validRegion, setValidRegion] = useState(false);
  const [regionFocus, setRegionFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus(); //Устанавливает фокус на поле <input> для имени пользователя при первой загрузке компонента.
  }, []);

  useEffect(() => {
    // проверяет правильность имени пользователя, каждый раз, когда оно меняется
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    // Проверяет пароль на соответствие PWD_REGEX и сравнивает его с подтверждением (matchPwd). Обновляет validPwd и validMatch.
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd == matchPwd; // сравнивает пароль с состоянием совпадения пароля
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setValidBirthDate(DATE_REGEX.test(birthDate));
  }, [birthDate]);

  useEffect(() => {
    setValidCountry(country.trim().length > 0); // Простая проверка на непустую строку
  }, [country]);

  useEffect(() => {
    setValidRegion(region.trim().length > 0); // Простая проверка на непустую строку
  }, [region]);

  useEffect(() => {
    // Обрабатывает отправку формы
    setErrMsg('');
  }, [user, pwd, matchPwd, birthDate, country, region]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = DATE_REGEX.test(birthDate);
    const v4 = country.trim().length > 0;
    const v5 = region.trim().length > 0;

    if (!v1 || !v2 || !v3 || !v4 || !v5) {
      setErrMsg('Invalid Entry');
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd, birthDate, country, region }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      console.log(response?.data);
      setSuccess(true);
      setUser('');
      setPwd('');
      setMatchPwd('');
      setBirthDate('');
      setCountry('');
      setRegion('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <section className={styles.inner}>
      {success ? ( // проверка на успешное заполнение
        <div className={styles.section}>
          <h1>Success!</h1>
          <p>
            <a href='#'>Sign In</a>
          </p>
        </div>
      ) : (
        <div className={styles.section}>
          <p
            ref={errRef}
            className={errMsg ? styles.errmsg : styles.offscreen}
            aroa-live='assertive'
          >
            {errMsg} {/* выводим сообщение об ошибке*/}
          </p>
          <h1>Регистрация</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor='username'>
              <span className={validName ? styles.valid : styles.hide}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? styles.hide : styles.invalid}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type='text'
              id='username'
              ref={userRef}
              autoComplete='off'
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? 'false' : 'true'}
              aria-describedby='uidnote'
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              placeholder='E-mail'
            />
            <p
              id='uidnote'
              className={userFocus && user && !validName ? styles.instructions : styles.offscreen}
            >
              {' '}
              {/* елси условия выполнетй то показйвает жто instructions, если нет то это offscreen*/}
              <FontAwesomeIcon icon={faInfoCircle} />
              от 4 до 24 символов.
              <br />
              Должно начинаться с буквы.
              <br />
              Допускаются буквы, цифры, подчеркивания, дефисы.
            </p>

            <label htmlFor='password'>
              <span className={validPwd ? styles.valid : styles.hide}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? styles.hide : styles.invalid}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type='password'
              id='password'
              onChange={(e) => setPwd(e.target.value)}
              required // обязательно для заполнения
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby='pwdnote'
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              placeholder='Пароль'
            />
            <p
              id='pwdnote'
              className={pwdFocus && !validPwd ? styles.instructions : styles.offscreen}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              от 8 до 24 символов.
              <br />
              Должен содержать заглавные и строчные буквы, цифру и специальный символ.
              <br />
              Разрешенные специальные символы:<span aria-label='exclamation mark'>!</span>{' '}
              <span aria-label='at symbol'>@</span> <span aria-label='hashtag'>#</span>{' '}
              <span aria-label='dollar sign'>$</span> <span aria-label='percent'>%</span>
            </p>

            <label htmlFor='confirm_pwd'>
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && matchPwd ? styles.valid : styles.hide}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !matchPwd ? styles.hide : styles.invalid}
              />
            </label>
            <input
              type='password'
              id='confirm_pwd'
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? 'false' : 'true'}
              aria-describedby='confirmnote'
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              placeholder='Пароль повторно'
            />
            <p
              id='confirmnote'
              className={matchFocus && !validMatch ? styles.instructions : styles.offscreen}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Должен совпадать с первым паролем.
            </p>
            {/* Birth Date */}
            <label htmlFor='birthDate'>
              <span className={validBirthDate ? styles.valid : styles.hide}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validBirthDate || !birthDate ? styles.hide : styles.invalid}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type='date'
              id='birthDate'
              onChange={(e) => setBirthDate(e.target.value)}
              required
              aria-invalid={validBirthDate ? 'false' : 'true'}
              aria-describedby='datenote'
              onFocus={() => setBirthDateFocus(true)}
              onBlur={() => setBirthDateFocus(false)}
            />
            <p
              id='datenote'
              className={birthDateFocus && !validBirthDate ? styles.instructions : styles.offscreen}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Укажите дату рождения
            </p>
            <div className={styles.form__country}>
              {/* Country */}
              <div>
                <label htmlFor='country'>
                  <span className={validCountry ? styles.valid : styles.hide}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validCountry || !country ? styles.hide : styles.invalid}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  className={styles.form__input}
                  type='text'
                  id='country'
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  aria-invalid={validCountry ? 'false' : 'true'}
                  aria-describedby='countrynote'
                  onFocus={() => setCountryFocus(true)}
                  onBlur={() => setCountryFocus(false)}
                  placeholder='Страна'
                />
                <p
                  id='countrynote'
                  className={countryFocus && !validCountry ? styles.instructions : styles.offscreen}
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Укажите страну
                </p>
              </div>
              {/* Region */}
              <div>
                <label htmlFor='region'>
                  <span className={validRegion ? styles.valid : styles.hide}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validRegion || !region ? styles.hide : styles.invalid}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  className={styles.form__input}
                  type='text'
                  id='region'
                  onChange={(e) => setRegion(e.target.value)}
                  required
                  aria-invalid={validRegion ? 'false' : 'true'}
                  aria-describedby='regionnote'
                  onFocus={() => setRegionFocus(true)}
                  onBlur={() => setRegionFocus(false)}
                  placeholder='Область'
                />
                <p
                  id='regionnote'
                  className={regionFocus && !validRegion ? styles.instructions : styles.offscreen}
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Укажите область
                </p>
              </div>
            </div>
            <button
              className={`${styles.form__button_blue} ${styles.form__button_register}`}
              disabled={
                !validName ||
                !validPwd ||
                !validMatch ||
                !validBirthDate ||
                !validCountry ||
                !validRegion
              }
            >
              Зарегистрироваться
            </button>
          </form>
          <p>
            Уже зарегистрировался?
            <br />
            <span className={styles.line}>
              <Link to='/login'>Войти</Link>
            </span>
          </p>
        </div>
      )}
    </section>
  );
}
