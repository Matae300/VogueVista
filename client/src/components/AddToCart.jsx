import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_PRODUCTBYID, QUERY_ME } from '../../utils/queries';
import { ADDITEMTOCART } from '../../utils/mutations';
import Auth from '../../utils/auth';
import '../assets/Form.css';

const AddItemToCart = ({ authToken }) => {
  const { id } = useParams();

  const { loading: userLoading, error: userError, data: userData } = useQuery(QUERY_ME, {
    context: { headers: { Authorization: `Bearer ${authToken}` } },
  });

  const userId = userData?.me?._id;

  const { loading: productLoading, error: productError, data: productData } = useQuery(QUERY_PRODUCTBYID, {
    variables: { productById: id },
    context: { headers: { Authorization: `Bearer ${authToken}` } },
  });

  const product = productData?.productById;
  const sizeOptions = product?.size || [];
  const colorOptions = product?.color || [];

  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState(1); 
  const [errorState, setErrorState] = useState('');
  const [success, setSuccess] = useState(false);

  const [addItemToCart] = useMutation(ADDITEMTOCART);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    try {

      console.log('Submitting form with data:', { userId, productId: productData?.productById?._id, size, color, quantity });

      await addItemToCart({
        variables: {
          userId,
          productId: productData?.productById?._id,
          size,
          color,
          quantity,
        },
      });

      console.log('Item added to cart successfully!');

      setSize('');
      setColor('');
      setQuantity(1);
      setErrorState('');
      setSuccess(true);

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setSuccess(false);
    }
  };

  if (userLoading || productLoading) return <p>Loading...</p>;
  if (userError || productError) return <p>Error: {userError?.message || productError?.message}</p>;

  return (
    <div className="form-container">
      <form onSubmit={handleFormSubmit} className="form">
        {Auth.loggedIn() ? (
          <>
            <div className="form-group">
              <label htmlFor="size">Size</label>
              <select id="size" value={size} onChange={(e) => setSize(e.target.value)} required>
                <option value="" disabled>Select Size</option>
                {sizeOptions.map((sizeOption, index) => (
                  <option key={index} value={sizeOption}>{sizeOption}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="color">Color</label>
              <select id="color" value={color} onChange={(e) => setColor(e.target.value)} required>
                <option value="" disabled>Select Color</option>
                {colorOptions.map((colorOption, index) => (
                  <option key={index} value={colorOption}>{colorOption}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="addbtn">Place In Cart</button>
          </>
        ) : (
          <p>You need to be logged in to add an item to the cart. Please log in or sign up.</p>
        )}
      </form>
      {errorState && <p className="error-message">{errorState}</p>}
      {success && <p className="success-message">Item added to cart successfully!</p>}
    </div>
  );
};

export default AddItemToCart;
