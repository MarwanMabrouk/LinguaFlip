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
    <div>
      <nav className="flex justify-between items-center mb-6">
        <Link to="/">
          <img alt="MongoDB logo" className="h-10 inline" src="https://raw.githubusercontent.com/mongodb-developer/mern-stack-example/603144e25ba5549159d1962601337652a7bfa253/mern/client/src/assets/mongodb.svg"></img>
        </Link>

        <Link className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3" to="/create">
          Create Employee
        </Link>
        {user && (  // when the user is login show this
          <div>
            <span>{user.email}</span>
            <button onClick ={handleClick}>Logout</button>
          </div>
        )}
        { !user && ( // when the user is not login show this
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
       
        
      </nav>
    </div>
  );
}
