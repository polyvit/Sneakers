import React, { useEffect, useState } from 'react'

import styles from './Profile.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../features/user/userSlice';

const Profile = () => {
  const {currentUser} = useSelector(({user}) => user);

  const dispatch = useDispatch()
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  })

  useEffect(() => {
    if (!currentUser) return;
    setValues(currentUser)
  }, [currentUser])

  const handleChange = ({target: {name, value}}) => {
    setValues({...values, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmpty = Object.values(values).some(value => !value);
    if (isEmpty) return;
    dispatch(updateUser(values));
  }

  return (
    <section className={styles.profile}>
      {!currentUser ? <span></span> : (
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <input type="email" name="email" value={values.email} placeholder='Your email' autoComplete='off' onChange={handleChange} required/>
          <input type="name" name="name" value={values.name} placeholder='Your name' autoComplete='off' onChange={handleChange} required/>
          <input type="password" name="password" value={values.password} placeholder='Your password' autoComplete='off' onChange={handleChange} required/>
          <input type="avatar" name="avatar" value={values.avatar} placeholder='Your avatar' autoComplete='off' onChange={handleChange} required/>
        </div>
        <button type="submit" className={styles.submit}>Update</button>
      </form>
      )}
    </section>
  )
}

export default Profile