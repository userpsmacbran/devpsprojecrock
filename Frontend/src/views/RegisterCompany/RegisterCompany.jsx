import {
  MdLockOpen,
  MdLockOutline,
  MdMailOutline,
  MdOutlineFileDownload
} from 'react-icons/md';
import { PiIdentificationCard } from 'react-icons/pi';
import { FaRegUser } from 'react-icons/fa';
import { BiWorld } from 'react-icons/bi';
import { BsHouse } from 'react-icons/bs';
import { GrLocation } from 'react-icons/gr';

import style from './RegisterCompany.module.css';
import { useState } from 'react';

const RegisterCompany = () => {
  const [viewPassword, setViewPassword] = useState(false);

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h2 className={style.title}>REGISTRO DE EMPRESA</h2>

        <div className={style.containUpdatePhoto}>
          <img
            src='https://i.ibb.co/Dpxj9TF/company.png'
            alt='company-logo'
            className={style.updatePhoto}
          />
          <MdOutlineFileDownload className={style.iconUpdate} />
        </div>

        <form className={style.form} action=''>
          <div className={style.containInput}>
            <input
              className={style.input}
              type='text'
              placeholder='  NOMBRE DEL PROPIETARIO'
            />
            <FaRegUser className={style.icon} />
          </div>

          <div className={style.containInput}>
            <input className={style.input} type='text' placeholder='  PAIS' />
            <BiWorld className={style.icon} />
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
            <input className={style.input} type='text' placeholder='  CIUDAD' />
            <BiWorld className={style.icon} />
          </div>

          <div className={style.containInput}>
            <select name='TIPO DE EMPRESA' className={style.select}>
              <option value='DEFAULT' selected disabled>
                TIPO DE EMPRESA
              </option>

              <option value='masculino'>1</option>
              <option value='femenino'>2</option>
              <option value='no-binario'>3</option>
              <option value='otro'>Otro</option>
            </select>
            <BsHouse className={style.icon} />
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
            <input
              className={style.input}
              type='text'
              placeholder='  DIRECCION DE LA EMPRESA'
            />
            <GrLocation className={style.icon} />
          </div>

          <div className={style.containInput}>
            <input
              className={style.input}
              type='text'
              placeholder='  IDENTIFICACION'
            />
            <PiIdentificationCard className={style.icon} />
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

export default RegisterCompany;
