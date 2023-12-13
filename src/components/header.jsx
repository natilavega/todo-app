import { useUser } from '../hooks/useUser'
import { logout } from '../services/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import '../styles/header.css'

export function Header () {
  const { user } = useUser()

  return (
    <header>
      { user.photo
        ? (
          <img
            src={ user.photo }
            alt={`Perfil de ${ user.name }`}
            className='user-photo'
          />
        )
        : <FontAwesomeIcon icon={ faUser } />
      }
      <div className='user-name'>{ user.name }</div>
      <button className='btn-logout' onClick={ logout }>
        <FontAwesomeIcon icon={ faArrowRightFromBracket } />
      </button>
    </header>
  )
}
