import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIESBYID } from '../../utils/queries';
import '../assets/Collection.css';

const Category = ({ authToken }) => {
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
    <div className="collection-container">
      <h3 className="category-title">{category?.categoryName}</h3>
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
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Category;
