import React, { useEffect, useState, useContext } from 'react';
import { useNavigate} from 'react-router-dom'
import AppContext from '../../AppContext';
import axios from 'axios';

const Profile = () => {
    const [profile,setProfile] = useState();
    const [vtype,setVType] = useState();
    const myContext = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:8080/account/profile')
        .then(response=>response.data)
        .then(data=> {
            setProfile(data.data) 
            switch(data.data.vtype){
                case "S": setVType("Student");
                          break;
                case "G": setVType("Group");
                          break;
                case "M": setVType("Member");
                          break;
                case "I": setVType("Individual");
                          break;
            }

        })
    },[])

    const handlelogout = () =>{
        axios.get('http://localhost:8080/account/logout')
        .then(response=>response.data)
        .then(data=> {
            if(data.success === true){
                myContext.setLogin(false)
                sessionStorage.setItem("Login",false)
                navigate("/")
            }
        })
    }

    return (
        <div style={{display: 'flex',
        height:'100%',
        width: '100%',
        flexDirection: 'column', 
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        marginTop:20}}>
            {profile!==undefined && 
            <div>
            <div style={{display:'flex',flexDirection:'row',alignSelf:'flex-start',marginLeft:70,marginBottom:10}}>
                <div style={{fontSize:23,color:'black',fontFamily:'sans-serif',fontWeight:'initial'}}>Email:</div>
                <div style={{fontSize:23,color:'grey',fontFamily:'sans-serif',fontWeight:'initial', marginLeft:10}}>{profile.vemail}</div>
            </div>

            <div style={{display:'flex',flexDirection:'row',alignSelf:'flex-start',marginLeft:70,marginBottom:10}}>
                <div style={{fontSize:23,color:'black',fontFamily:'sans-serif',fontWeight:'initial'}}>Full Name:</div>
                <div style={{fontSize:23,color:'grey',fontFamily:'sans-serif',fontWeight:'initial', marginLeft:10}}>{profile.vfname} {profile.vmname} {profile.vlname}</div>
            </div>

            <div style={{display:'flex',flexDirection:'row',alignSelf:'flex-start',marginLeft:70,marginBottom:10}}>
                <div style={{fontSize:23,color:'black',fontFamily:'sans-serif',fontWeight:'initial'}}>Address:</div>
                <div style={{fontSize:23,color:'grey',fontFamily:'sans-serif',fontWeight:'initial', marginLeft:10}}>{profile.vstAdd}, {profile.vcity}, {profile.vstate}, {profile.vcountry} </div>
            </div>

            <div style={{display:'flex',flexDirection:'row',alignSelf:'flex-start',marginLeft:70,marginBottom:10}}>
                <div style={{fontSize:23,color:'black',fontFamily:'sans-serif',fontWeight:'initial'}}>Phone Number:</div>
                <div style={{fontSize:23,color:'grey',fontFamily:'sans-serif',fontWeight:'initial', marginLeft:10}}>{profile.vtelNum}</div>
            </div>

            <div style={{display:'flex',flexDirection:'row',alignSelf:'flex-start',marginLeft:70,marginBottom:10}}>
                <div style={{fontSize:23,color:'black',fontFamily:'sans-serif',fontWeight:'initial'}}>Date of Birth:</div>
                <div style={{fontSize:23,color:'grey',fontFamily:'sans-serif',fontWeight:'initial', marginLeft:10}}>{new Date(profile.vbdate).getMonth() + 1}/{new Date(profile.vbdate).getDate()}/{new Date(profile.vbdate).getFullYear()}</div>
            </div>

            <div style={{display:'flex',flexDirection:'row',alignSelf:'flex-start',marginLeft:70,marginBottom:10}}>
                <div style={{fontSize:23,color:'black',fontFamily:'sans-serif',fontWeight:'initial'}}>Acount Type:</div>
                <div style={{fontSize:23,color:'grey',fontFamily:'sans-serif',fontWeight:'initial', marginLeft:10}}>{vtype}</div>
            </div>

            {
                 profile.vtype == "S" &&
                 <div>
                     <div style={{display:'flex',flexDirection:'row',alignSelf:'flex-start',marginLeft:70,marginBottom:10}}>
                         <div style={{fontSize:23,color:'black',fontFamily:'sans-serif',fontWeight:'initial'}}>School Name:</div>
                         <div style={{fontSize:23,color:'grey',fontFamily:'sans-serif',fontWeight:'initial', marginLeft:10}}>{profile.stuSchool}</div>
                     </div>
                 </div>
            }

            {
                profile.vtype == "M" &&
                <div>
                    <div style={{display:'flex',flexDirection:'row',alignSelf:'flex-start',marginLeft:70,marginBottom:10}}>
                        <div style={{fontSize:23,color:'black',fontFamily:'sans-serif',fontWeight:'initial'}}>Membership Start date:</div>
                        <div style={{fontSize:23,color:'grey',fontFamily:'sans-serif',fontWeight:'initial', marginLeft:10}}>{new Date(profile.mstartDate).getMonth() + 1}/{new Date(profile.mstartDate).getDate()}/{new Date(profile.mstartDate).getFullYear()}</div>
                    </div>

                    <div style={{display:'flex',flexDirection:'row',alignSelf:'flex-start',marginLeft:70,marginBottom:10}}>
                        <div style={{fontSize:23,color:'black',fontFamily:'sans-serif',fontWeight:'initial'}}>Membership end date:</div>
                        <div style={{fontSize:23,color:'grey',fontFamily:'sans-serif',fontWeight:'initial', marginLeft:10}}>{new Date(profile.mendDate).getMonth() + 1}/{new Date(profile.mendDate).getDate()}/{new Date(profile.mendDate).getFullYear()}</div>
                    </div>
                </div>
            }

            {
                profile.vtype == "G" &&
                <div>
                    <div style={{display:'flex',flexDirection:'row',alignSelf:'flex-start',marginLeft:70,marginBottom:10}}>
                        <div style={{fontSize:23,color:'black',fontFamily:'sans-serif',fontWeight:'initial'}}>Group Size:</div>
                        <div style={{fontSize:23,color:'grey',fontFamily:'sans-serif',fontWeight:'initial', marginLeft:10}}>{profile.gsize}</div>
                    </div>
                </div>
            }

            {
                profile.vtype == "I" &&
                <div>
                    <div style={{display:'flex',flexDirection:'row',alignSelf:'flex-start',marginLeft:70,marginBottom:10}}>
                        <div style={{fontSize:23,color:'black',fontFamily:'sans-serif',fontWeight:'initial'}}>Park Visits:</div>
                        <div style={{fontSize:23,color:'grey',fontFamily:'sans-serif',fontWeight:'initial', marginLeft:10}}>{profile.itimesVisit}</div>
                    </div>
                </div>
            }

            <button onClick={()=>handlelogout()} style={{width:'30%',height:40,borderRadius:20,backgroundColor:'black',color:'white',fontFamily:16,marginTop:15, marginBottom:15}}>Logout</button>

            </div>
            }
           

            {/* {
                profile!== undefined &&
                profile.vtype == "S" &&
                <div>
                    <div style={{display:'flex',flexDirection:'row',alignSelf:'flex-start',marginLeft:70,marginBottom:10}}>
                        <div style={{fontSize:23,color:'black',fontFamily:'sans-serif',fontWeight:'initial'}}>School Name:</div>
                        <div style={{fontSize:23,color:'grey',fontFamily:'sans-serif',fontWeight:'initial', marginLeft:10}}>email</div>
                    </div>
                </div>
            }

            {
                profile!== undefined &&
                profile.vtype == "M" &&
                <div>
                    <div style={{display:'flex',flexDirection:'row',alignSelf:'flex-start',marginLeft:70,marginBottom:10}}>
                        <div style={{fontSize:23,color:'black',fontFamily:'sans-serif',fontWeight:'initial'}}>Membership Start date:</div>
                        <div style={{fontSize:23,color:'grey',fontFamily:'sans-serif',fontWeight:'initial', marginLeft:10}}>email</div>
                    </div>

                    <div style={{display:'flex',flexDirection:'row',alignSelf:'flex-start',marginLeft:70,marginBottom:10}}>
                        <div style={{fontSize:23,color:'black',fontFamily:'sans-serif',fontWeight:'initial'}}>Membership end date:</div>
                        <div style={{fontSize:23,color:'grey',fontFamily:'sans-serif',fontWeight:'initial', marginLeft:10}}>email</div>
                    </div>
                </div>
            } */}

        </div>
    );
}; 

export default Profile;