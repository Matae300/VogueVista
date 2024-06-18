import { useParams, Link } from 'react-router-dom';
import { useQuery} from '@apollo/client';
import { QUERY_CATEGORIESBYID } from '../../utils/queries';
import '../assets/Collection.css'

const Collection = ({ authToken }) => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(QUERY_CATEGORIESBYID, {
    variables: { categoryById: id }, 
    context: { headers: { Authorization: `Bearer ${authToken}` } },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const category = data?.categoryById;
  const products = category?.products || [];

  return (
    <div>
      <h1>{category?.categoryName}</h1>
      <div className="product-list">
        {products.map(product => (
          <Link to={`/product/${product._id}`} className="tile-link" key={product._id}>
            <div className="product-item">
              <h2>{product.productName}</h2>
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stock}</p>
              <p>Rating: {product.rating}</p>
              <p>Size: {product.size}</p>
              <img src={product.image} alt={product.productName} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Collection;
