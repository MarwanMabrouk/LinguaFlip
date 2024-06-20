import  {useState} from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null); // is gonnan be true when we start the request
    const {dispatch} = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('http://localhost:5050/api/user/login', { // i am not sure if the parameter is correct

            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({email, password})
        })  

        const json = await response.json();

        if(!response.ok){
            setIsLoading(false);
            setError(JSON.error);
        }
        if (response.ok){
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            //update the auth context
            dispatch({type:'LOGIN', payload: json});
            setIsLoading(false);
        }


    }

    return {login, isLoading, error};
}