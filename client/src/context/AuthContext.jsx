import {createContext, useReducer, useEffect} from 'react';
export const AuthContext = createContext();

export const authReducer = (state,action) =>{
    switch (action.type){
        case 'LOGIN':
            //console.log(state.payload)
            return {user: action.payload}
        case 'LOGOUT':
            return {user:null}
        default:
            return state
    }
}
export const AuthContextProvider = ({ children })  =>{ // Children is whatever this component warps
    const [state, dispatch] = useReducer(authReducer,{
        user:null
    });
    console.log("auth");
    console.log(state);
    useEffect(() =>{
        const user = JSON.parse(localStorage.getItem('user'));
        if(user){
            dispatch({type:'LOGIN', payload: user});
        }
     }, []); // when the component first render
    // making that check for the token in the local storage

    console.log('AuthContext state: ', state);

    return (
        <AuthContext.Provider value ={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
