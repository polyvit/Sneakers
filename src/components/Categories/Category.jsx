import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../features/api/apiSlice';
import styles from './Category.module.css';
import Products from '../Products/Products';

const Category = () => {
  const {id} = useParams();
  const {list} = useSelector(({categories}) => categories);
  const defaultValues = {
    title: "",
    price_min: 0,
    price_max: 0,
  }
  const defaultParams = {
    categoryId: id,
    limit: 5,
    offset: 0,
    ...defaultValues,
  }
  const [category, setCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [values, setValues] = useState(defaultValues);
  const [params, setParams] = useState(defaultParams);
  const [isEnd, setIsEnd] = useState(false);

  const {data, isLoading, isSuccess} = useGetProductsQuery(params);

  useEffect(() => {
    if (!id) return;
    setValues(defaultValues);
    setItems([]);
    setIsEnd(false);
    setParams({...defaultParams, categoryId: id})
  }, [id])

  useEffect(() => {
    if (!id || !list.length) return;
    const cat = list.find(item => item.id === +id);
    setCategory(cat);
  }, [list, id])

  useEffect(() => {
    if (isLoading) return;
    if (!data.length) return setIsEnd(true);
    setItems(prevItems => [...prevItems, ...data]);
  }, [data, isLoading])

  
  const handleChange = ({target: {value, name}}) => {
    setValues({...values, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setItems([]);
    setIsEnd(false);
    setParams({...defaultParams, ...values})
  }

  const handleReset = () => {
    setValues(defaultValues);
    setParams(defaultParams);
    setIsEnd(false);
  }

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{category?.name}</h2>
      <form className={styles.filters} onSubmit={handleSubmit}>
        <div className={styles.filter}>
          <input type="text" name="title" placeholder='Product name' onChange={handleChange} value={values.title}/>
        </div>
        <div className={styles.filter}>
          <input type="number" name="price_min" placeholder='0' onChange={handleChange} value={values.price_min}/>
          <span>Price from</span>
        </div>
        <div className={styles.filter}>
          <input type="number" name="price_max" placeholder='0' onChange={handleChange} value={values.price_max}/>
          <span>Price to</span>
        </div>
          <button type="submit" hidden />
      </form>
      {isLoading ? (
        <div className='preloader'>Loading...</div>
      ) : !isSuccess || !data.length ? (
        <div className={styles.back}><span>No results</span><button onClick={handleReset}>Reset</button></div>
      ) : (
        <Products title="" products={items} amount={items.length} style={{padding: 0}}/>
      )}
      {isEnd && (
        <div className={styles.more}>
          <button onClick={() => setParams({...params, offset: params.offset + params.limit})}>See more</button>
      </div>
      )}
    </section>
  )
}

export default Category;