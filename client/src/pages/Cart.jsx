import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USERCART, QUERY_ME } from "../../utils/queries";
import { REMOVE_ITEM_FROM_CART } from '../../utils/mutations';
import '../assets/Cart.css';

const Cart = ({ authToken }) => {
  const [removeItem, { loading: removeLoading }] = useMutation(REMOVE_ITEM_FROM_CART);

  const handleRemoveItem = async (userId, productId) => {
    try {
      await removeItem({ variables: { userId, productId } });
      console.log('Item removed successfully');
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  const { loading: meLoading, error: meError, data: meData } = useQuery(QUERY_ME, {
    context: { headers: { Authorization: `Bearer ${authToken}` } },
  });

  const userId = meData?.me?._id;
  console.log("userId:", userId);

  const { loading: cartLoading, error: cartError, data: cartData, refetch: refetchCart } = useQuery(QUERY_USERCART, {
    variables: { userId },
    context: { headers: { Authorization: `Bearer ${authToken}` } },
    skip: !userId, 
  });

  useEffect(() => {
    if (!meLoading && !meError) {
      refetchCart();
    }
  }, [meLoading, meError, refetchCart]);

  if (meLoading || cartLoading) return <p>Loading...</p>;
  if (meError || cartError) return <p>Error: {meError ? meError.message : cartError.message}</p>;

  const cart = cartData?.getUserCart;

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      <div className="cart-items">
        {cart.items.length > 0 ? (
          cart.items.map((item) => {
            const productId = item.product._id; 
            return (
              <Link to={`/product/${productId}`} className="tile-link" key={item._id}>
                <div className="cart-item">
                  <img src={item.product.image} alt={item.product.productName} />
                  <div className="cart-item-content">
                    <p>{item.product.productName}</p>
                    <p>Color: {item.color}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                    <button className='addbtn' onClick={() => handleRemoveItem(userId, productId)}>
                      {removeLoading ? 'Removing...' : 'Remove'}
                    </button>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <p>No items in the cart.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
