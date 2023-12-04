import { useState } from 'react';
import style from './Login.module.css';
import { MdMailOutline } from 'react-icons/md';
import { MdLockOutline, MdLockOpen } from 'react-icons/md';

const Login = () => {
  const [viewPassword, setViewPassword] = useState(false);
  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h2 className={style.title}>INICIAR SESIÓN</h2>
        <form className={style.form} action=''>
          <div className={style.containInput}>
            <input
              className={style.input}
              type='text'
              placeholder='  CORREO ELECTRONICO'
            />
            <MdMailOutline className={style.icon} />
          </div>
          <div className={style.containInput}>
            <input
              className={style.input}
              type={viewPassword ? 'text' : 'password'}
              placeholder='  CONTRASEÑA'
            />
            {viewPassword ? (
              <MdLockOpen
                className={style.icon}
                onClick={() => {
                  setViewPassword(!viewPassword);
                }}
              />
            ) : (
              <MdLockOutline
                className={style.icon}
                onClick={() => {
                  setViewPassword(!viewPassword);
                }}
              />
            )}
          </div>
          <div className={style.containOptions}>
            <label className={style.label}>
              <input className={style.checkbox} type='checkbox' />
              Recordarme
            </label>

            <span className={style.span}>¿Olvidaste tu contraseña?</span>
          </div>
          <button className={style.button}>Iniciar Sesión</button>
        </form>
        <div className={style.containRegister}>
          <span className={style.span}>¿No tienes una cuenta?</span>
          <span className={style.span}>Registrate</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
