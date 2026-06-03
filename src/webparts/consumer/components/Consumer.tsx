import * as React from 'react';
import styles from './Consumer.module.scss';
import type { IConsumerProps } from './IConsumerProps';
import { COLUMNS } from '../../../constants';

export const Consumer: React.FC<IConsumerProps> = (props) => {
  const { products, productCount, selectedProduct, loading } = props;

  if (loading) {
    return (
      <section className={styles.consumer}>
        <p>Loading...</p>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className={styles.consumer}>
        <p>No data source is configured. Add a Dynamic Data source in the web part property pane.</p>
      </section>
    );
  }

  return (
    <section className={styles.consumer}>
      <h2>Products ({productCount})</h2>
      <table className={styles.productTable}>
        <thead>
          <tr>
            <th>{COLUMNS.TITLE}</th>
            <th>{COLUMNS.PRECIO}</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.Id}
              className={selectedProduct?.Id === product.Id ? styles.selectedRow : ''}
            >
              <td>{product.Title}</td>
              <td>{product.Precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
