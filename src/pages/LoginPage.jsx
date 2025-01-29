import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { login } from '../utils/api';
import LocaleContext from '../context/LocaleContext';
import loginTextId from '../constant/page-content-text/id/login';
import loginTextEn from '../constant/page-content-text/en/login';

function LoginPage({ loginSuccess }) {
  const { locale } = useContext(LocaleContext);
  const navigate = useNavigate();

  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
      navigate('/');
    }
  }

  return (
    <section className="login-page">
      <h2 style={{ fontWeight: 800 }}>
        {locale === 'id' ? loginTextId.title : loginTextEn.title}
      </h2>
      <LoginInput login={onLogin} />
      <p>
        {locale === 'id' ? loginTextId.additional_info : loginTextEn.additional_info}{' '}
        <Link to="/register">
          {locale === 'id' ? loginTextId.cta : loginTextEn.cta}{' '}
        </Link>
      </p>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
