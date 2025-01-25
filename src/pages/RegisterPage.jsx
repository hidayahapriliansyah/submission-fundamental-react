import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { register } from '../utils/api';

function RegisterPage() {
  const navigate = useNavigate();

  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate('/');
    }
  }

  return (
    <section className="register-page">
      <h2 style={{ fontWeight: 800 }}>Daftar</h2>
      <RegisterInput register={onRegisterHandler} />
      <p>Sudah punya akun? <Link to="/login">Login</Link></p>
    </section>
  );
}

export default RegisterPage;
