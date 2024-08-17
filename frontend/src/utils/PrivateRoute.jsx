import { Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
    let {user} = useContext(AuthContext);

    // ...rest is going to contain the properties passed into our component
    // console.log('Private route works')
    if (user) return children;
    else return <Navigate to="/login" />;

};
export default PrivateRoute