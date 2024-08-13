import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import logo from "../assets/LinguaFlip.png";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };
  return (
    <header className="nav">
      <div>
        <nav
          className="nav-links flex items-center"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
            height: "80px",
            backgroundColor: "#e1f5fe",
            color: "#333",
            borderBottom: "1px solid #ccc",
          }}
        >
          <img
            alt="LinguaFlip logo"
            className="navbar-logo"
            style={{
              maxHeight: "100%",
              height: "auto",
              display: "inline-block",
            }}
            src={logo}
          />
          {user && (
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/CardList">Card Lists</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/play">Play</Link>
              {/*  <Link to="/AboutUs">About the Project</Link> */}
            </div>
          )}

          {user && ( // when the user is login show this
            <div className="nav-links">
              <span>{user.email}</span>
              <Link onClick={handleClick}>Logout</Link>
            </div>
          )}
          {!user && ( // when the user is not login show this
            <div className="nav-links">
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
