import './ListOfData.css';
import { useGetProducts } from '../../hooks/useGetProducts';

export const ListOfData = () => {
  const { products } = useGetProducts();

  if (!products.length) {
    return (
      <div className="list">
        <p>No data. Find something to see results.</p>
      </div>
    );
  }

  return (
    <>
      <ul className="list">
        {products.map((product, i) => (
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
        {/* <div ref={containerRef} className="interceptor"></div> */}
      </ul>
    </>
  );
};
