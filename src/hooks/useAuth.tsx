import {createContext, useContext, useState} from "react";

const authContext = createContext<ProvideAuth | null>(null);

export function ProvideAuth({children}){
    const auth = useProvideAuth();

    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext);
}

function useProvideAuth(){
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function signIn(email: string, password: string){
        setIsLoading(true);
        let loginUrl = `${process.env.API_SCOREKEEP_URL} + /api/login`;

        fetch(loginUrl,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        }).then((response) => {
            setIsLoading(false);
            if(response.ok){
                response.json().then(data => console.log(data));
            }else{
                response.json().then((err) => setErrors(err));
           }
        })
    }

    function signOut(){
        let logoutUrl = `${process.env.API_SCOREKEEP_URL} + /api/logout`;

        fetch(logoutUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then((response) => {
            if(response.ok){
                setUser(null);
            }else{
                response.json().then((err) => setErrors(err));
            }
        })
    }

    function autoSignIn(){
        let autoSignInUrl = `${process.env.API_SCOREKEEP_URL} + /api/me`;

        fetch(autoSignInUrl).then((response) => {
            if(response.ok){
                response.json().then((user) => setUser(user));
            }else{
                response.json().then((err) => setErrors(err));
            }
        })
    }

    return {
        user,
        errors,
        signIn,
        signOut,
        autoSignIn
    };
}