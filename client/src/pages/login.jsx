import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Login = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login,  error, isLoading} = useLogin();
   // const navigate = useNavigate();


    const handleSubmit = async (e) =>{
        e.preventDefault();
        await login(email, password);
       // navigate('/home');
    }
    
    return(
        <form className="login" onSubmit ={handleSubmit}>
            <h1>Login</h1>

            <div>
                <label>Email:</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} required/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
            
            </div>
            
            <Button type="submit" variant="contained" disabled ={isLoading}>Login</Button>
            {error && <div className="error">{error}</div>}
        </form>


    )
}

export default Login;