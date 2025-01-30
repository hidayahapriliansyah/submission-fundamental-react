import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import LocaleContext from '../context/LocaleContext';
import loginTextId from '../constant/page-content-text/id/login';
import loginTextEn from '../constant/page-content-text/en/login';
import useMutateApi from '../hooks/useMutateApi';

function LoginInput({ login }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoading, mutate: loginMutate } = useMutateApi(login);

  const { locale } = useContext(LocaleContext);

  const onEmailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    await loginMutate({ email, password });
  };

  const text = locale === 'id' ? loginTextId : loginTextEn;

  return (
    <form onSubmit={onSubmitHandler} className="login-input">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={onEmailChangeHandler}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={onPasswordChangeHandler}
        autoComplete="current-password"
      />
      <button
        type="submit"
        disabled={isLoading}
        style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
      >
        {isLoading ? 'Loading...' : text.submit_btn}
      </button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
