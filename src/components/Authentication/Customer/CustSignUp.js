import React,{useEffect, useState} from 'react';
import {Link,NavLink, useNavigate} from 'react-router-dom'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from 'axios';

const CustSignUp = () => {
    const [email, onChangeEmail] = useState('');
    const [fname, onChangeFname] = useState('');
    const [mname, onChangeMname] = useState('');
    const [lname, onChangeLname] = useState('');
    const [staddr, onChangeSttName] = useState('');
    const [city, onChangeCity] = useState('');
    const [state, onChangeState] = useState('');
    const [country, onChangeCountry] = useState(''); 
    const [emailerror, setEmailError] = useState(false);

    const [school, onChangeSchool] = useState(''); 

    const [phno, onChangePhNo] = useState('');
    const [bday, onChangebday] = useState('');
    const [password, onChangePassword] = useState('');
    const [vtype,setVType] = useState('');
    const options = [
        'student', 'member', 'individual' , 'group'
      ];

    const [resp,setResponse] = useState();
    const navigate = useNavigate();

    const handlesignup = () =>{
        if(vtype === "S"){ 
            const headers = { 'Content-Type': 'application/json' }; 
            const body = JSON.stringify({ 
                accEmail: email,
                accPwd: password,
                vfName: fname,
                vmName: mname,
                vlName: lname ,
                vstAdd: staddr,
                vcity:city,
                vstate:state,
                vcountry:country,
                vemail:email,
                vtelNum: phno,
                vtype: "S",
                vbDate: bday,
                stuSchool: school
            })
            console.log(body)
            axios.post('http://localhost:8080/account/stu/register', body, {headers})
                .then(response => response.data)
                .then(data => {
                    if(data.status === "fail"){
                        setEmailError(true)
                    }else{
                        setEmailError(false)
                        navigate("/custlogin")
                    }
                });
        }

        if(vtype === "M"){
            //console.log(new Date(new Date().setFullYear(new Date().getFullYear()+1)).getFullYear())
            const headers = { 'Content-Type': 'application/json' }; 
            const body = JSON.stringify({ 
                accEmail: email,
                accPwd: password,
                vfName: fname,
                vmName: mname,
                vlName: lname ,
                vstAdd: staddr,
                vcity:city,
                vstate:state,
                vcountry:country,
                vemail:email,
                vtelNum: phno,
                vtype: "M",
                vbDate: bday,
                mstartDate:new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() ,
                mendDate: new Date(new Date().setFullYear(new Date().getFullYear()+1)).getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
                mnumPurchased: 0
            })
            console.log(body)
            axios.post('http://localhost:8080/account/member/register', body, {headers})
                .then(response => response.data)
                .then(data => {
                    if(data.status === "fail"){
                        setEmailError(true)
                    }else{
                        setEmailError(false)
                        navigate("/custlogin")
                    }
                });
        }

        if(vtype === "I"){
            const headers = { 'Content-Type': 'application/json' }; 
            const body = JSON.stringify({ 
                accEmail: email,
                accPwd: password,
                vfName: fname,
                vmName: mname,
                vlName: lname ,
                vstAdd: staddr,
                vcity:city,
                vstate:state,
                vcountry:country,
                vemail:email,
                vtelNum: phno,
                vtype: "I",
                vbDate: bday,
                itimesVisit: 0
            })
        
            console.log(body)
            axios.post('http://localhost:8080/account/indi/register', body, {headers})
                .then(response => response.data)
                .then(data => {
                    if(data.status === "fail"){
                        setEmailError(true)
                    }else{
                        setEmailError(false)
                        navigate("/custlogin")
                    }
                });
        }

        if(vtype === "G"){
            const headers = { 'Content-Type': 'application/json' }; 
            const body = JSON.stringify({ 
                accEmail: email,
                accPwd: password,
                vfName: fname,
                vmName: mname,
                vlName: lname ,
                vstAdd: staddr,
                vcity:city,
                vstate:state,
                vcountry:country,
                vemail:email,
                vtelNum: phno,
                vtype: "G",
                vbDate: bday,
                gsize: 0
            })
            
            console.log(body)
            axios.post('http://localhost:8080/account/group/register', body, {headers})
                .then(response => response.data)
                .then(data => {
                    if(data.status === "fail"){
                        setEmailError(true)
                    }else{
                        setEmailError(false)
                        navigate("/custlogin")
                    }
                });
        }

    }

    return (
        <div style={{
            display: 'flex',
            height:'100%',
            width: '100%',
            flexDirection: 'column',
            alignSelf: 'center',
            // alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            borderRadius: 20
        }}>
            <img src={require('../../../logo.png')} style={{width:79,height:76,margin:10, alignSelf:'center'}}/>
            <div style={{fontSize:20,color:'black',fontFamily:'sans-serif',fontWeight:'bold',marginBottom:20}}>SignUp</div>

            <div style={{fontSize:15,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:70,marginBottom:5}}>First Name</div>
            <input
                style={{width:'80%',height:30,marginBottom:5,borderRadius:6,marginLeft:70}}
                value={fname} // ...force the input's value to match the state variable...
                onChange={e => onChangeFname(e.target.value)} // ... and update the state variable on any edits!
                placeholder='Enter First Name'
                />

            <div style={{fontSize:15,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:70,marginBottom:5}}>Middle Name</div>
            <input
                style={{width:'80%',height:30,marginBottom:5,borderRadius:6,marginLeft:70}}
                value={mname} // ...force the input's value to match the state variable...
                onChange={e => onChangeMname(e.target.value)} // ... and update the state variable on any edits!
                placeholder='Enter Middle Name'
                />

            <div style={{fontSize:15,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:70,marginBottom:5}}>Last Name</div>
            <input
                style={{width:'80%',height:30,marginBottom:5,borderRadius:6,marginLeft:70}}
                value={lname} // ...force the input's value to match the state variable...
                onChange={e => onChangeLname(e.target.value)} // ... and update the state variable on any edits!
                placeholder='Enter Last Name'
                />

            <div style={{fontSize:15,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:70,marginBottom:5}}>Street Address</div>
            <input
                style={{width:'80%',height:30,marginBottom:5,borderRadius:6,marginLeft:70}}
                value={staddr} // ...force the input's value to match the state variable...
                onChange={e => onChangeSttName(e.target.value)} // ... and update the state variable on any edits!
                placeholder='Enter Street Address'
                />

<div style={{fontSize:15,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:70,marginBottom:5}}>City</div>
            <input
                style={{width:'80%',height:30,marginBottom:5,borderRadius:6,marginLeft:70}}
                value={city} // ...force the input's value to match the state variable...
                onChange={e => onChangeCity(e.target.value)} // ... and update the state variable on any edits!
                placeholder='Enter City'
                />

<div style={{fontSize:15,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:70,marginBottom:5}}>State</div>
            <input
                style={{width:'80%',height:30,marginBottom:5,borderRadius:6,marginLeft:70}}
                value={state} // ...force the input's value to match the state variable...
                onChange={e => onChangeState(e.target.value)} // ... and update the state variable on any edits!
                placeholder='Enter State'
                />

<div style={{fontSize:15,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:70,marginBottom:5}}>Country</div>
            <input
                style={{width:'80%',height:30,marginBottom:5,borderRadius:6,marginLeft:70}}
                value={country} // ...force the input's value to match the state variable...
                onChange={e => onChangeCountry(e.target.value)} // ... and update the state variable on any edits!
                placeholder='Enter Country'
                />

<div style={{fontSize:15,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:70,marginBottom:5}}>Phone Number</div>
            <input
                style={{width:'80%',height:30,marginBottom:5,borderRadius:6,marginLeft:70}}
                value={phno} // ...force the input's value to match the state variable...
                onChange={e => onChangePhNo(e.target.value)} // ... and update the state variable on any edits!
                placeholder='Enter Phone Number'
                type='number'
                />

            <div style={{fontSize:15,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:70,marginBottom:5}}>Date of Birth</div>
            <input
                style={{width:'80%',height:30,marginBottom:5,borderRadius:6,marginLeft:70}}
                value={bday} // ...force the input's value to match the state variable...
                onChange={e => onChangebday(e.target.value)} // ... and update the state variable on any edits!
                placeholder='MM-DD-YYYY'
                type='date'
                />

        <div style={{fontSize:15,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:70,marginBottom:5}}>Email</div>
            <input
                style={{width:'80%',height:30,marginBottom:5,borderRadius:6,marginLeft:70}}
                value={email} // ...force the input's value to match the state variable...
                onChange={e => onChangeEmail(e.target.value)} // ... and update the state variable on any edits!
                placeholder='Enter Email'
                type='email'
                />
                {
                    emailerror &&
                    <div style={{fontSize:15,color:'red',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:70,marginBottom:5}}>Email Already Exists</div>
                }
           

            <div style={{fontSize:15,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:70,marginBottom:5}}>Password</div>
            <input
                style={{width:'80%',height:30,marginBottom:5,borderRadius:6,marginLeft:70}}
                value={password} // ...force the input's value to match the state variable...
                onChange={e => onChangePassword(e.target.value)} // ... and update the state variable on any edits!
                placeholder='Enter Password'
                type="password"
                />

            <div style={{fontSize:15,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginLeft:70,marginBottom:5}}>Visitor Type</div>

            <div style={{width:200,marginLeft:70}}>
                <Dropdown options={options} onChange={(e)=>{
                                                    switch(e.value){
                                                        case "student":
                                                            setVType("S");
                                                            break
                                                        case "member":
                                                            setVType("M");
                                                            break
                                                        case "individual":
                                                            setVType("I");
                                                            break
                                                        case "group":
                                                            setVType("G");
                                                            break
                                                    }}}  placeholder="Select an option"/>
            </div>

            {
                vtype === "S" && 
                <div style={{alignSelf:'flex-start'}}>
                <div style={{fontSize:15,color:'black',fontFamily:'sans-serif',fontWeight:'initial',alignSelf:'flex-start',marginBottom:5, marginTop:15}}>School Name</div>
                <input
                style={{width:'100%',height:30,marginBottom:5,borderRadius:6,marginLeft:70}}
                value={school} // ...force the input's value to match the state variable...
                onChange={e => onChangeSchool(e.target.value)} // ... and update the state variable on any edits!
                placeholder='Enter School Name'
                />
                </div>
            }

            {
                vtype === "M" && 
                <div>
                  
                </div>
            }

            {
                vtype === "I" && 
                <div>
                   
                </div>
            }

            {
                vtype === "G" && 
                <div>
                   
                </div>
            }
           
      

            <button onClick={()=>handlesignup()} style={{width:'30%',height:40,borderRadius:20,backgroundColor:'black',color:'white',fontFamily:16,marginTop:15,alignSelf:'center'}}>SignUp</button>

            <div style={{fontSize:12,color:'black',fontFamily:'sans-serif',fontWeight:'initial',marginTop:10}}>
                Have an Account?
            </div>
                <Link to="/custlogin">Login</Link>

            <div style={{fontSize:12,color:'black',fontFamily:'sans-serif',fontWeight:'initial',marginTop:10}}>
                Employee Login
            </div>
                <Link to="/emplogin">Login</Link>
          
        </div>
    );
};

export default CustSignUp;