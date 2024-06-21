import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import logo from "../assets/LinguaFlip.png";

export default function Navbar() {

  const {logout} = useLogout();
  const {user} = useAuthContext();

  const handleClick = () =>{
    logout();
  }
  return (
    <header className="nav" >

      <nav className="nav-links ">
        <img alt="LinguaFlip logo" class="h-20 inline" src={logo} />
        <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/CardList">CardList</Link>
            <Link to="/CardList">About Us</Link>
        </div>

        <div className="flex-grow"></div> 

        {user && (  // when the user is login show this
          <div className="nav-links">
            <span>{user.email}</span>
            <Link onClick ={handleClick}>Logout</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/play">Play</Link>
            <Link to="/create">Create</Link>
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
