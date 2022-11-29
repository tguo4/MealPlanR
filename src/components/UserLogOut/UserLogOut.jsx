import './UserLogOut.css';
import { logOut } from '../../utilities/users-service';

export default function UserLogOut({ user, setUser }) {
  function handleLogOut() {
    // delegate to the users-servide module
    logOut();
    // Update state will alos cause a re-render
    setUser(null);
  }

  return (
    <div className="UserLogOut">
      <div>Welcome, {user.name}</div>
      <button className="btn-sm" onClick={handleLogOut}>LOG OUT</button>
    </div>
  );
}