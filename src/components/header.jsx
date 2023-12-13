import { logout } from '../services/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import '../styles/header.css'

export function Header ( { name, photo } ) {
  return (
    <header>
      { photo
        ? (
          <img
            src={ photo }
            alt={`Perfil de ${ name }`}
            className='user-photo'
          />
        )
        : <FontAwesomeIcon icon={ faUser } />
      }
      <div className='user-name'>{ name }</div>
      <button className='btn-logout' onClick={ logout }>
        <FontAwesomeIcon icon={ faArrowRightFromBracket } />
      </button>
    </header>
  )
}
