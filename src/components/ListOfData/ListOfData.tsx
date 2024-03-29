import './ListOfData.css';
import { IProduct } from '../../constants';

export const ListOfData = (props: { products: IProduct[] }) => {
  if (!props.products.length) {
    return (
      <div className="list__nothing">
        No data. Find something to see results.
      </div>
    );
  }

  return (
    <>
      <ul className="list">
        {props.products.map((product, i) => (
          <li className="card" key={`${product.product}__${product.id}?${i}`}>
            <div className="card__text-wrap">
              <div className="card__text">
                <p className="title">Product id: </p>
                <b>{product.id}</b>
              </div>
              <div className="card__text">
                <p className="title">Product name: </p>
                <b>{product.product}</b>
              </div>
              <div className="card__text">
                <p className="title">Product price: </p>
                <b>{product.price}</b>
              </div>
              <div className="card__text">
                <p className="title">Product brand: </p>
                <b>{product.brand?.length ? product.brand : 'Empty'}</b>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
