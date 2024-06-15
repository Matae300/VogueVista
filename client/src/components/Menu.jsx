import { Link } from 'react-router-dom';
import '../assets/Sidenav.css'
import { Category } from '../../../server/models';

const Menu = () => {
  return (
    <div>
     <ul>
     <Link to={`/category/${category._id}`} className="tile-link">
      <li>
        Handbags
      </li>
      </Link>
      <li>
        Women
      </li>
      <li>
        Men
      </li>
      <li>
        Children
      </li>
      <li>
        Jewlery & Watches
      </li>
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
