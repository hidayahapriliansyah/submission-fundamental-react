import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import LocaleContext from '../context/LocaleContext';

import registerTextId from '../constant/page-content-text/id/register';
import registerTextEn from '../constant/page-content-text/en/register';
import useMutateApi from '../hooks/useMutateApi';
import useInput from '../hooks/useInput';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const { isLoading, mutate: registerMutate } = useMutateApi(register);

  const { locale } = useContext(LocaleContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    await registerMutate({ name, email, password });
  };

  const text = locale === 'id' ? registerTextId : registerTextEn;

  return (
    <form onSubmit={onSubmitHandler} className="register-input">
      <input
        type="text"
        placeholder={text.form.name}
        value={name}
        onChange={onNameChange}
      />
      <input
        type="email"
        placeholder={text.form.email}
        value={email}
        onChange={onEmailChange}
      />
      <input
        type="password"
        placeholder={text.form.password}
        autoComplete="current-password"
        value={password}
        onChange={onPasswordChange}
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

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
