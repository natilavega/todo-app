import { logout } from '../services/firebase';
import '../styles/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

const Header = ({ name, photo }) => {
  return (
    <header>
      {photo ? (
        <img src={photo} alt='' className='user-photo' />
      ) : (
        <FontAwesomeIcon icon={faUser} />
      )}
      <div className='user-name'>{name}</div>
      <button className='btn-logout' onClick={logout}>
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </button>
    </header>
  );
};

export default Header;
