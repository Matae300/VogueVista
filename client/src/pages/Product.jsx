import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { QUERY_PRODUCTBYID } from '../../utils/queries';

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
      <h1>{product.productName}</h1>
      <div className="product-item">
        <p>Price: ${product.price}</p>
        <p>Stock: {product.stock}</p>
        <p>Rating: {product.rating}</p>
        <p>Size: {product.size}</p>
        <img src={product.image} alt={product.productName} />
      </div>
    </div>
  );
};


export default ProductDetails;