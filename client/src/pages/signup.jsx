import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Button } from "@mui/material";

const Signup = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signup, error, isLoading} = useSignup();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        await signup(email, password);
    }
    
    return(
        <form className="signup" onSubmit ={handleSubmit}>
            <h2>Sign up </h2>
            <div>
                <label><h1>Email:</h1></label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <Button variant="contained" disabled = {isLoading}>Signup</Button>
            {error && <div className="error">{error}</div>}
        </form>

    )
}

export default Signup;