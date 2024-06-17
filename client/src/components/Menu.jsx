import React from 'react';
import { Link } from 'react-router-dom';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import '../assets/Sidenav.css';

const Menu = ({ authToken }) => {
  const { loading: collectionLoading, error: collectionError, data: collectionData } = useQuery(QUERY_CATEGORIES, {
    context: { headers: { Authorization: `Bearer ${authToken}` } }, 
  });

  if (collectionLoading) return <p>Loading...</p>;
  if (collectionError) return <p>Error: {collectionError.message}</p>;

  const categories = collectionData.categories;

  return (
    <div>
      <ul>
        {categories.map(category => (
          <Link to={`/category/${category._id}`} className="tile-link" key={category._id}>
            <li>
              {category.categoryName}
            </li>
          </Link>
        ))}
        <li>
          Sign In
        </li>
        <li>
          My Orders
        </li>
      </ul>
    </div>
  );
};

export default Menu;
