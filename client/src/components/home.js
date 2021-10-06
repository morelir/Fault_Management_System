import React, {useState,useContext} from 'react'
import Navbar  from "react-bootstrap/Navbar"
import Nav  from "react-bootstrap/Nav"
import Container  from "react-bootstrap/Container"
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Login from './login';
import Register from './registration';
import AuthContext from '../store/auth-context';

// this.props.location.login.user.email
const Home = (props) => {
    const authCtx=useContext(AuthContext)
    console.log(authCtx.user)
    const [isLogin,setIsLogin] = useState(false)
    const [user,setUser] = useState(null)

   
    
    return (
        <div >
            <h1>home</h1>
            {/* {isLogin
            ? user.name
            : "guest"
            } */}
         
        </div>
    );
    
}

export default Home;

