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
      {/* <ul className="list">
        {repos.map((el) => (
          <li className="card" key={`${el.node.name}__${el.node.owner.login}`}>
            <a
              href={`${GITHUB_URL}${el.node.resourcePath}`}
              className="card__img"
            >
              <img className="img" src={el.node.owner.avatarUrl} alt="Avatar" />
            </a>
            <div className="card__text-wrap">
              <div className="card__text">
                <p className="title">Repository name: </p>
                <a
                  className="link"
                  href={`${GITHUB_URL}${el.node.resourcePath}`}
                >
                  {el.node.name}
                </a>
              </div>
              <div className="card__text">
                <p className="title">Repository link: </p>
                <a
                  className="link"
                  href={`${GITHUB_URL}${el.node.resourcePath}`}
                >
                  {`${GITHUB_URL}${el.node.resourcePath}`}
                </a>
              </div>
              <div className="card__text">
                <p className="title">Repository author: </p>
                <a
                  className="link"
                  href={`${GITHUB_URL}${el.node.owner.resourcePath}`}
                >
                  {`${GITHUB_URL}${el.node.owner.resourcePath}`}
                </a>
              </div>
              <div className="card__text">
                <p className="title">Repository description: </p>
                <span>
                  {el.node.description ? el.node.description : 'Empty'}
                </span>
              </div>
            </div>
          </li>
        ))}
        <div ref={containerRef} className="interceptor"></div>
      </ul> */}
    </>
  );
};
