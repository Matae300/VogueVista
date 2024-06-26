import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_COLLECTBYID } from '../../utils/queries';
import '../assets/Collection.css';

const Collection = ({ authToken }) => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(QUERY_COLLECTBYID, {
    variables: { id: id }, 
    context: { headers: { Authorization: `Bearer ${authToken}` } },
  });

  console.log(data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const collect = data?.collectById;
  const products = collect?.products || [];

  return (
    <div className="collection-container">
      <h3 className="category-title">{collect?.collectName}</h3>
      <div className="product-list">
        {products.length > 0 ? (
          products.map(product => (
            <Link to={`/product/${product._id}`} className="tile-link" key={product._id}>
              <div className="product-item">
                <img src={product.image} alt={product.productName} className="product-image" />
                <div className="product-info">
                  <h2>{product.productName}</h2>
                  <p>${product.price.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No products found in this collection.</p>
        )}
      </div>
    </div>
  );
};

export default Collection;
