import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";


export default function Navbar() {

  const {logout} = useLogout();
  const {user} = useAuthContext();

  const handleClick = () =>{
    logout();
  }
  return (
    <header className="nav">
      <nav className="nav-links">
        
        {user && (  // when the user is login show this
          <div>
            <span>{user.email}</span>
            <button onClick ={handleClick}>Logout</button>
          </div>
        )}
        { !user && ( // when the user is not login show this
          <div className="nav-links">
             <Link to="/login">Login</Link>
             <Link to="/signup">Signup</Link>
          </div>
           
          
)}
       
        
      </nav>
    </header>
  );
}
