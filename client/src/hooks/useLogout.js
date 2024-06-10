import {useAuthContext} from './useAuthContext'

export const useLogout = () =>{

    const {dispatch} = useAuthContext();


    const logout =()=>{ // we don't have to send a request to the backend
        // remove user form storage

        localStorage.removeItem('user');
        
        // dispatch logout action
        dispatch ({type:'LOGOUT'});

    }

    return {logout}
}