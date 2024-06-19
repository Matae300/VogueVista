import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTBYID } from '../../utils/queries';
import '../assets/ProductDetails.css';

const ProductDetails = ({ authToken }) => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(QUERY_PRODUCTBYID, {
    variables: { productById: id },
    context: { headers: { Authorization: `Bearer ${authToken}` } },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const product = data?.productById;

  return (
    <div className="product-details">
      <div className="item-image">
        <img src={product.image} alt={product.productName} />
      </div>
      <div className="item-info">
        <h1>{product.productName}</h1>
        <p className="price">${product.price}</p>
        <p>Stock: {product.stock}</p>
        <p>Rating: {product.rating}</p>
        <p>Size: {product.size}</p>
        <a href="#" className="button">Add to Cart</a>
      </div>
    </div>
  );
};

export default ProductDetails;
