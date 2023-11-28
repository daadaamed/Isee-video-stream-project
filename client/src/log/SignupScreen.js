/** @format */

import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import './SignupScreen.css';
import axios from '../api/axios';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const password_REGEX = /^[A-Za-z]\w{6,14}$/;
const REGISTER_URL = '/register'; // the endpoint of signup in the backend

export default function SignupScreen() {
  // email and psw are displayed in console
  // we should add first name...

  const userRef = useRef();
  const emailRef = useRef();
  const errRef = useRef();

  const [pseudo, setPseudo] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchpassword, setMatchpassword] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    const result = USER_REGEX.test(pseudo);
    console.log(result);
    console.log(pseudo);
    setValidName(result);
  }, [pseudo]);

  useEffect(() => {
    emailRef.current.focus();
  }, []);
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = password_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
    const match = password === matchpassword;
    setValidMatch(match);
  }, [password, matchpassword]);

  useEffect(() => {
    setErrMsg('');
  }, [pseudo, password, matchpassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(pseudo);
    const v2 = password_REGEX.test(password);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      setErrMsg('Invalid Entry');
      return;
    }
    try {
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          pseudo,
          email,
          password,
        },
      }).then((res) => {
        console.log(res);
        if (res.data.errors) {
          // pseudoError.innerHTML = res.data.errors.pseudo;
          // emailError.innerHTML = res.data.errors.email;
          // passwordError.innerHTML = res.data.errors.password;
        } else {
          setSuccess(true);
        }
      });
    } catch (err) {
      if (!err.response) {
        setErrMsg('no server response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username taken');
      } else {
        setErrMsg('registration failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="signupScreen">
      {success ? (
        <section className="success-signup">
          <h1>Success!</h1>
          <p>
            <a href="login">Sign In</a>
          </p>
        </section>
      ) : (
        <section className="signupScreen__baseForm">
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="formTitle">REGISTER</h1>
          <form className="SignupScreen__form" onSubmit={handleSubmit}>
            {/* pseudo */}
            <label htmlFor="pseudo">
              Pseudo:
              <span className={validName ? 'valid' : 'hide'}>
                <FontAwesomeIcon icon={faCheck} />{' '}
              </span>
              <span className={validName || !pseudo ? 'hide' : 'invalid'}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setPseudo(e.target.value)}
              required
              aria-invalid={validName ? 'false' : 'true'}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && pseudo && !validName ? 'instructions' : 'offscreen'
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
            </p>
            {/* email */}
            <label htmlFor="email">
              Email:
              <span className={validEmail ? 'valid' : 'hide'}>
                <FontAwesomeIcon icon={faCheck} />{' '}
              </span>
              <span className={validEmail || !email ? 'hide' : 'invalid'}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="email"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={validEmail ? 'false' : 'true'}
              aria-describedby="uidnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p
              id="uidnote"
              className={
                emailFocus && email && !validName ? 'instructions' : 'offscreen'
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Should be a real email format
              <br />
            </p>
            {/* password */}
            <label htmlFor="password">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPassword ? 'valid' : 'hide'}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPassword || !password ? 'hide' : 'invalid'}
              />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              aria-invalid={validPassword ? 'false' : 'true'}
              aria-describedby="passwordnote"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <p
              id="passwordnote"
              className={
                passwordFocus && !validPassword ? 'instructions' : 'offscreen'
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />8 to 24 characters.
              {/* <br /> */}
              {/* Must include uppercase and lowercase letters, a number. */}
              {/* <br /> */}
              {/* Allowed special characters:{' '}
              <span aria-label="exclamation mark">!</span>{' '}
              <span aria-label="at symbol">@</span>{' '}
              <span aria-label="hashtag">#</span>{' '}
              <span aria-label="dollar sign">$</span>{' '}
              <span aria-label="percent">%</span> */}
            </p>

            <label htmlFor="confirm_password">
              Confirm Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && matchpassword ? 'valid' : 'hide'}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !matchpassword ? 'hide' : 'invalid'}
              />
            </label>
            <input
              type="password"
              id="confirm_password"
              onChange={(e) => setMatchpassword(e.target.value)}
              value={matchpassword}
              required
              aria-invalid={validMatch ? 'false' : 'true'}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? 'instructions' : 'offscreen'
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>

            <button
              disabled={
                !validName || !validPassword || !validMatch ? true : false
              }
              className={`${
                (validName || validPassword || validMatch) && 'button-hover'
              }`}
            >
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              {/*put router link here*/}
              <a href="login">Sign In</a>
            </span>
          </p>
        </section>
      )}
    </div>
  );
}
