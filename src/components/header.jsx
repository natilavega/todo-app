import { logout } from '../services/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faUser
} from '@fortawesome/free-solid-svg-icons'

export function Header ( { name, photo } ) {
  return (
    <header
      className='flex flex-row justify-between items-center mt-6 md:mt-10 mb-6 mx-auto w-full md:w-2/4'
    >
      <div className='flex flex-row items-center gap-4'>
      { photo
        ? (
          <img
            src={ photo }
            alt={`Perfil de ${ name }`}
            className='h-6 w-6 rounded-full'
          />
        )
        : <FontAwesomeIcon icon={ faUser } />
      }
        <h3>{ name }</h3>
      </div>
      <button onClick={ logout }>
        <FontAwesomeIcon icon={ faArrowRightFromBracket } />
      </button>
    </header>
  )
}
