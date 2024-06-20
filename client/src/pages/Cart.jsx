import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_USERCART, QUERY_ME } from "../../utils/queries";
import '../assets/Cart.css'; // Import external CSS file

const Cart = ({ authToken }) => {
  const { id } = useParams();

  const { loading: meLoading, error: meError, data: meData } = useQuery(QUERY_ME, {
    context: { headers: { Authorization: `Bearer ${authToken}` } },
  });

  const userId = meData?.me?._id;

  const { loading: cartLoading, error: cartError, data: cartData } = useQuery(QUERY_USERCART, {
    variables: { userId: userId },
    context: { headers: { Authorization: `Bearer ${authToken}` } },
  });

  if (meLoading || cartLoading) return <p>Loading...</p>;
  if (meError || cartError) return <p>Error: {meError ? meError.message : cartError.message}</p>;

  const cart = cartData?.getUserCart;

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      <div className="cart-items">
        {cart.items.map((item) => (
          <div key={item.product._id} className="cart-item">
            <img src={item.product.image} alt={item.product.productName} />
            <div className="cart-item-content">
              <p>{item.product.productName}</p>
              <p>Color: {item.color}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Size: {item.size}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
