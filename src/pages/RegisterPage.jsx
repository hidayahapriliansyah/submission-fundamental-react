import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { register } from '../utils/api';
import LocaleContext from '../context/LocaleContext';
import registerTextId from '../constant/page-content-text/id/register';
import registerTextEn from '../constant/page-content-text/en/register';

function RegisterPage() {
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);

  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate('/');
    }
  }

  return (
    <section className="register-page">
      <h2 style={{ fontWeight: 800 }}>
        {locale === 'id' ? registerTextId.title : registerTextEn.title}
      </h2>
      <RegisterInput register={onRegisterHandler} />
      <p>
        {locale === 'id' ? registerTextId.additional_info : registerTextEn.additional_info}{' '}
        {' '}
        <Link to="/login">
          {locale === 'id' ? 'Masuk' : 'Login'}
        </Link>
      </p>
    </section>
  );
}

export default RegisterPage;
