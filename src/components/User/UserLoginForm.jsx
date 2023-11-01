import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './User.module.css';
import { loginUser } from '../../features/user/userSlice';

const UserLoginForm = ({toggleCurrentFormType, closeForm}) => {
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    email: "",
    password: "",
  })

  const handleChange = ({target: {name, value}}) => {
    setValues({...values, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmpty = Object.values(values).some(value => !value);
    if (isEmpty) return;
    dispatch(loginUser(values));
    closeForm()
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
        <svg className='icon'>
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}/>
        </svg>
      </div>
      <div className={styles.title}>Login</div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <input type="email" name="email" value={values.email} placeholder='Your email' autoComplete='off' onChange={handleChange} required/>
          <input type="password" name="password" value={values.password} placeholder='Your password' autoComplete='off' onChange={handleChange} required/>
        </div>
        <div className={styles.link} onClick={() => toggleCurrentFormType('signup')}>Create an account</div>
        <button type="submit" className={styles.submit}>Login</button>
      </form>
    </div>
  )
}

export default UserLoginForm