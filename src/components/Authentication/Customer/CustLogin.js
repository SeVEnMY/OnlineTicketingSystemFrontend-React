import React, { useState, useContext, useEffect } from 'react';
import './CustLogin.css'
import {Link,NavLink, useNavigate} from 'react-router-dom'
import AppContext from '../../../AppContext';
import axios from 'axios';

const CustLogin = () => {
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const myContext = useContext(AppContext);
    const [loginerror,setLoginError] = useState(false)
    const [adminerror,setAdminError] = useState(false)

    const HandleLogin = () => {
        const headers = { 'Content-Type': 'application/json' }; 
        const body = JSON.stringify({ 
            accEmail: email,
            accPwd: password
        });
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ 
        //         accEmail: email,
        //         accPwd: password
        //     }),
        //     credentials:'include'
        // };
        axios.post('http://localhost:8080/account/login', body, {headers})
            .then(response => response.data)
            .then(data => { 
                console.log(data)
                if(data.success === true){
                    axios.get('http://localhost:8080/account/getrole')
                    .then(response=>response.data)
                    .then(data=> {
                        if(data.data==="admin"){
                            setAdminError(true)
                        }else{
                            setLoginError(false)
                            setAdminError(false)
                            myContext.setLogin(true)
                            sessionStorage.setItem("Login",true)
                        }
                    })
                }else{
                    setLoginError(true)
                }
            });
    }

    return (
        <div style={{
            display: 'flex',
            height:'100%',
            width: '100%',
            flexDirection: 'column',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            borderRadius: 20
        }}>
            <img src={require('../../../logo.png')} style={{width:79,height:76,margin:10}}/>
            <div style={{fontSize:20,color:'black',fontFamily:'sans-serif',fontWeight:'bold',marginBottom:20,marginTop:10}}>Login</div>

            <div style={{fontSize:20,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:'9%',marginBottom:10}}>Email</div>
            <input
                style={{width:'80%',height:30,marginBottom:20,borderRadius:6}}
                value={email} // ...force the input's value to match the state variable...
                onChange={e => onChangeEmail(e.target.value)} // ... and update the state variable on any edits!
                placeholder='Enter Email'
                />

            <div style={{fontSize:20,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:'9%',marginBottom:10}}>Password</div>
            <input
                style={{width:'80%',height:30,marginBottom:20,borderRadius:6}}
                value={password} // ...force the input's value to match the state variable...
                onChange={e => onChangePassword(e.target.value)} // ... and update the state variable on any edits!
                placeholder='Enter Password'
                type="password"
                />

            {
                 loginerror &&    
                 <div style={{fontSize:15,color:'red',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'center',marginBottom:10}}>Incorrect Email or Password</div>
            }

            {
                adminerror && 
                <div style={{fontSize:15,color:'red',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'center',marginBottom:10}}>Please use the Admin Login</div>
            }


           
           <button onClick={()=>HandleLogin()} style={{width:'30%',height:40,borderRadius:20,backgroundColor:'black',color:'white',fontFamily:16,marginTop:15}}>Login</button>
           {/* <div style={{fontSize:20,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:70,marginBottom:10}}>{}</div> */}

            <div style={{fontSize:12,color:'black',fontFamily:'sans-serif',fontWeight:'initial',marginTop:10}}>
                Don't have an Account?
                </div>
                {/* <div style={{textDecoration:'underline'}} onClick={()=>SignUpNav}>Sign Up</div> */}
                <Link to="/custsignup">SignUp</Link>
        

            <div style={{fontSize:12,color:'black',fontFamily:'sans-serif',fontWeight:'initial',marginTop:10, marginRight: 1}}>
                Employee Login
            </div>
                    <Link to="/emplogin">
                        Login
                    </Link>
                 
           
        </div>
    );
};

export default CustLogin;