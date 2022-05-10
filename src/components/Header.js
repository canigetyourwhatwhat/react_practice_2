import {Link} from 'react-router-dom';
import '../../css/Nav.css';

const Nav = () => {
  return (
    <nav>
      <h3>Weather Dashboard</h3>

      <Link to={'/'}>
        <span> + Add Widget </span>
      </Link>

      <Link to={'/history'}>
        <span> Show history </span>
      </Link>

      <Link to={'/widgets'}>
        <span> List of created widgets </span>
      </Link>


    </nav>
  );
};

export default Nav;
