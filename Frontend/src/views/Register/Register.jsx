import {
  MdLockOpen,
  MdLockOutline,
  MdMailOutline,
  MdOutlineFileDownload
} from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { BiWorld } from 'react-icons/bi';
import { BsHouse } from 'react-icons/bs';
import { IoCalendarNumberOutline } from 'react-icons/io5';
import { GrLocation } from 'react-icons/gr';

import style from './Register.module.css';
import { useState } from 'react';

const Register = () => {
  const [viewPassword, setViewPassword] = useState(false);

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h2 className={style.title}>REGISTRO DE USUARIO</h2>

        <div className={style.containUpdatePhoto}>
          <img
            src='https://i.ibb.co/SBtCNfp/Ellipse-2.png'
            alt='User-logo'
            className={style.updatePhoto}
          />
          <MdOutlineFileDownload className={style.iconUpdate} />
        </div>

        <form className={style.form} action=''>
          <div className={style.containInput}>
            <input
              className={style.input}
              type='text'
              placeholder='  NOMBRES'
            />
            <FaRegUser className={style.icon} />
          </div>

          <div className={style.containInput}>
            <input
              className={style.input}
              type='text'
              placeholder='  APELLIDOS'
            />
            <FaRegUser className={style.icon} />
          </div>

          <div className={style.containInput}>
            <input
              className={style.input}
              type='email'
              placeholder='  CORREO ELECTRONICO'
            />
            <MdMailOutline className={style.icon} />
          </div>

          <div className={style.containInput}>
            <select name='GENERO' className={style.select}>
              <option value='masculino' selected disabled>
                GENERO
              </option>

              <option value='masculino'>Masculino</option>
              <option value='femenino'>Femenino</option>
              <option value='no-binario'>No binario</option>
              <option value='otro'>Otro</option>
            </select>
            <FaRegUser className={style.icon} />
          </div>

          <div className={style.containInput}>
            <input type='text' className={style.prefijo} placeholder='+1' />
            <input
              className={style.input}
              type='text'
              placeholder='  NUMERO DE CELULAR'
            />
            <BiWorld className={style.icon} />
          </div>

          <div className={style.containInput}>
            <input className={style.input} type='text' placeholder='  PAIS' />
            <BiWorld className={style.icon} />
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

          <div className={style.containInput}>
            <input className={style.input} type='text' placeholder='  CIUDAD' />
            <GrLocation className={style.icon} />
          </div>

          <div className={style.containInput}>
            <input
              className={style.input}
              type={viewPassword ? 'text' : 'password'}
              placeholder='  CONFIRMACION CONTRASEÑA'
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

          <div className={style.containInput}>
            <input
              className={style.input}
              type='text'
              placeholder='  DIRECCION DOMICILIARIA'
            />
            <BsHouse className={style.icon} />
          </div>

          <div className={style.containDate}>
            <input
              className={style.date}
              type='date'
              placeholder='  FECHA DE NACIMIENTO'
            />
          </div>

          <div className={style.containOptions}>
            <label className={style.label}>
              <input className={style.checkbox} type='checkbox' />
              Acepto los términos y condiciones
            </label>
          </div>
          <button className={style.button}>Registrarse</button>
        </form>
        <div className={style.containRegister}>
          <span className={style.span}>¿Ya tienes una cuenta?</span>
          <span className={style.span}>Iniciar Sesión</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
