import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup = () =>{
    
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [nativeLanguage, setNativeLanguage] = useState('');
    const [foreignLanguage, setForeignLanguage]=useState('');
    const {signup,  error, isLoading} = useSignup();
    //const navigate = useNavigate();


    const handleSubmit = async (e) =>{
        e.preventDefault();
        await signup(email, password, nativeLanguage, foreignLanguage);
        //navigate('/home'); i'm not sure if that goes there
    }
   
    
    return(
        <form className="signup" onSubmit ={handleSubmit}>
            <h2>Sign up </h2>
            <div>
                <label><h1>Email:</h1></label>
                <input type="email"  onChange={(e) => setEmail(e.target.value)} value={email} required/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <div>
                <label>Native Language:</label>
                <input type="nativeLanguage" value={nativeLanguage} onChange={(e) => setNativeLanguage(e.target.value)} required/>
            </div>
            <div>
                <label>Foreign Language:</label>
                <input type="foreignLanguage" value={foreignLanguage} onChange={(e) => setForeignLanguage(e.target.value)} required/>
            </div>
            <Button type="submit" variant="contained" disabled = {isLoading}>Signup</Button>
            {error && <div className="error">{error}</div>}
        </form>

    )
}

export default Signup;