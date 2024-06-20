import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADDITEMTOCART } from '../../utils/mutations';
import '../assets/Form.css';

const AddItemToCart = ({ userId }) => {
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [productId, setProductId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [addItemToCart] = useMutation(ADDITEMTOCART);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addItemToCart({
        variables: {
          userId,
          productId,
          size,
          color,
          quantity: 1, 
        },
      });

      setSize('');
      setColor('');
      setProductId('');
      setError('');
      setSuccess(true);
    } catch (err) {
      console.error('Error adding item to cart:', err);
      setError('Failed to add item to cart. Please try again.');
      setSuccess(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Size</label>
          <select value={size} onChange={(e) => setSize(e.target.value)} required>
            <option value="" disabled>Select Size</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="XL">Extra Large</option>
          </select>
        </div>
        <div>
          <label>Color</label>
          <select value={color} onChange={(e) => setColor(e.target.value)} required>
            <option value="" disabled>Select Color</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="black">Black</option>
          </select>
        </div>
        <div>
          <label>Product ID</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Item To Cart</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Item added to cart successfully!</p>}
    </div>
  );
};

export default AddItemToCart;
