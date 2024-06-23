import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Button, Typography } from "@mui/material";
//import { useNavigate } from "react-router-dom";

import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
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
            <div className="centered-container">
                <AccountCircleSharpIcon className="item" sx={{ fontSize: 50 }}  />
                <Typography  className="item" variant="h5"><strong>Welcome!</strong></Typography>
                
            </div>
            
            <div >
                <Typography  className="item" variant="subtitle2">Log in to your account</Typography>
            </div>
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