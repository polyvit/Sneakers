import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Products.module.css';

const Products = ({title, products = [], amount, style = {}}) => {
  const list = products.filter((_, index) => index < amount);
  return (
    <section className={styles.products} style={style}>
      {title && <h2>{title}</h2>}
      <div className={styles.list}>
        {list.map(({id, images, title, price, category: {name}}) => (
        <Link to={`/Sneakers/products/${id}`} key={id} className={styles.product}>
          <div className={styles.image} style={{backgroundImage: `url(${images[0]})`}}/>
          <div className={styles.wrapper}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.cat}>{name}</div>
            <div className={styles.info}>
              <div className={styles.prices}>
                <div className={styles.price}>{Math.floor(price * 0.8)}$</div>
                <div className={styles.oldPrice}>{price}$</div>
              </div>
              <div className={styles.purchases}>
                {Math.floor(Math.random() * 20 + 1)} purchased
              </div>
            </div>
          </div>
        </Link>
      ))}
      </div>
    </section>
  )
}

export default Products