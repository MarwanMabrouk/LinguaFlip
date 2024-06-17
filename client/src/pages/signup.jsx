import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Button } from "@mui/material";

const Signup = () =>{
    const [user, setUser] = useState({email:'', password:'', nativeLanguage:'', foreignLanguage:''});
    const {signup, error, isLoading} = useSignup();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        await signup(user);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };
    
    
    return(
        <form className="signup" onSubmit ={handleSubmit}>
            <h2>Sign up </h2>
            <div>
                <label><h1>Email:</h1></label>
                <input type="email" value={user.email} onChange={handleChange} required/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={user.password} onChange={handleChange} required/>
            </div>
            <div>
                <label>Native Language:</label>
                <input type="nativeLanguage" value={user.nativeLanguage} onChange={handleChange} required/>
            </div>
            <div>
                <label>Foreign Language:</label>
                <input type="foreignLanguage" value={user.foreignLanguage} onChange={handleChange} required/>
            </div>
            <Button variant="contained" disabled = {isLoading}>Signup</Button>
            {error && <div className="error">{error}</div>}
        </form>

    )
}

export default Signup;