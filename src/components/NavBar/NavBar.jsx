// React Router provides a <Link> component that renders hyperlinks that when clicked, 
// change the URL client-side only without triggering an HTTP request.
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import UserLogOut from '../UserLogOut/UserLogOut';
import './NavBar.css';

export default function NavBar({ user, setUser }) {

  return (
    <nav className='NavBar'>
      <Logo />
      {user ?
        // Clicking any of the links performs client-side routing where React Router will:
        //  • Update the path in the address bar without causing the page to reload
        //  • Automatically trigger a render
        <div id='links'>

          <Link to="/recipes/search" className='link'>
            <button>Search Recipes</button>
          </Link>

          <Link to="/planner" className='link'>
            <button>Meal Planner</button>
          </Link>

          <Link to="/recipes/saved" className='link'>
            <button>My Recipes</button>
          </Link>

          <UserLogOut user={user} setUser={setUser} />
        </div>
        :
        <div id='links'>
          <Link to="/" className='link'>
            <button>Home</button>
          </Link>

          <Link to="/login" className='link'>
            <button>Log In</button>
          </Link>

          <Link to="/signup" className='link'>
            <button>Sign Up</button>
          </Link>

        </div>
      }
    </nav>
  );
}