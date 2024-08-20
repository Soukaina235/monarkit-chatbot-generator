import { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext();
export default AuthContext;             

export const AuthProvider = ({ children }) => {
    /*  the initial value of authTokens is going to be the value of the local storage
        if we do null then once we refresh the page it will become null even if the user is logged in
        because the state is going to be reset
        same goes for the user */
    let [authTokens, setAuthTokens] = useState(
        () => {
            return localStorage.getItem('authTokens') ? 
                JSON.parse(localStorage.getItem('authTokens')) : null
        }
    );
    let [user, setUser] = useState(
        () => localStorage.getItem('authTokens') ? 
            jwtDecode(JSON.parse(localStorage.getItem('authTokens')).access) : null
    );
    
    let [loading, setLoading] = useState(true) // loading the page on the first load

    let navigate = useNavigate()

    let loginUser = async(e) => {
        /*  if we submit that form it going to add some request and refresh the page.
            we don't want that so we prevent the default behavior */
        e.preventDefault() 

        let response = await fetch(
            'http://127.0.0.1:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( // e.target is the form
                    {   
                        'email': e.target.email.value, 
                        'password': e.target.password.value
                    }
                )
        })
        
        let tokens = await response.json()
        console.log('tokens: ',tokens)
        if (response.status === 200) {
            setAuthTokens(tokens)
            setUser(jwtDecode(tokens.access)) // we want to decode our access token only
            console.log('decoded token: ', jwtDecode(tokens.access))
            localStorage.setItem('authTokens', JSON.stringify(tokens))

            // these next line of codes is to go back to the top of the page, because there is a scroll when we get an error
            window.scrollTo({
                top: 0, // Go back to normal value
            });

            navigate('/')
        } else {
            return 'Your login credentials are incorrect. Please try again.'
        }
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/')
    } 
    

    let updateToken = async () => {
        console.log('Update token called!')
        let response = await fetch(
            'http://127.0.0.1:8000/api/token/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // making sure that we are not trying to get the refresh token if authTokens doesn't have anything
                body: JSON.stringify({'refresh': authTokens?.refresh})
        })

        let tokens = await response.json()

        if (response.status === 200) {
            setAuthTokens(tokens)
            setUser(jwtDecode(tokens.access))
            localStorage.setItem('authTokens', JSON.stringify(tokens))
        } else {
            // logoutUser()
        }

        if (loading) {
            /*  this change triggers a re-render, allowing the children components 
                to render now that the authentication status is clear 
                if authenticate => authorized route
                if not => login page for example    
            */
            setLoading(false) 
        }
    }

    let contextData = { // we want to bring these data and functions down to other pages
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser
    }

    useEffect(() => {
        if(loading) {
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4
        let intervalId = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, fourMinutes)
        /*  for example if it was twoSeconds
            we this function gets called for the first time,
            it is going to be 2s, next time 4s, next time 4s
            and so forth
            until we get a timeout error
        */
        return () => clearInterval(intervalId) 
    }, [authTokens, loading]) // list of dependencies

    
    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children} {/* if loading is true then we don't want to render the children yet */}
        </AuthContext.Provider>
    )
}