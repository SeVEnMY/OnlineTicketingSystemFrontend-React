import { useEffect, useState , useContext} from 'react';
import './App.css';
import CustLogin from './components/Authentication/Customer/CustLogin';
import CustSignUp from './components/Authentication/Customer/CustSignUp';
import EmpLogin from './components/Authentication/Employee/EmpLogin';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Navbar/Home';
import AboutUs from './components/Navbar/AboutUs';
import ContactUs from './components/Navbar/ContactUs';
import Attractions from './components/Navbar/Attractions';
import Stores from './components/Navbar/Stores';
import Shows from './components/Navbar/Shows';
import Profile from './components/Navbar/Profile';
import MyOrders from './components/Navbar/MyOrders';
import BookTickets from './components/Navbar/BookTickets';
import AdminProfile from './components/Navbar/AdminProfile';
import {BrowserRouter,Route,Routes, Redirect, Navigate} from 'react-router-dom'
import AppContext from './AppContext';
import axios from 'axios'; 

axios.defaults.withCredentials = true; 

function App() {
  const [login,setLogin] = useState()
  const [admin,setAdmin] = useState()
  const myContext = useContext(AppContext);

  const userSettings = {
    loginname:login, 
    adminname:admin,
    setLogin,
    setAdmin, 
  };

  useEffect(()=>{
    console.log("Refresh")
    setLogin(false) 
    setAdmin(false)
    console.log(sessionStorage.getItem("Login"))
  },[])


  useEffect(()=>{ 
    axios.get('http://localhost:8080/account/getrole')
    .then(response=>response.data)
    .then(data=> {
        if(data.data === "admin"){
            setAdmin(true) 
        }
    })
  },[login])

  return ( 
  <AppContext.Provider value={userSettings}>
  <BrowserRouter>
  <div className="App">

    {
      console.log("login in session: " + sessionStorage.getItem("Login"))
    }
      {((sessionStorage.getItem("Login")===null) || (sessionStorage.getItem("Login")==="false")) && 
        <div>
          {
            console.log("login here1!")
          }
          <Routes>
                <Route path="/" element={<Navigate to ="/custlogin" />}/>
                <Route exact path="/custlogin" element={<CustLogin/>}/>
                <Route exact path="/custsignup" element={<CustSignUp/>}/>
                <Route exact path="/emplogin" element={<EmpLogin/>}/>
          </Routes>
        </div>
      }
      {
          
          (sessionStorage.getItem("Login")==="true" && !admin) && 
          <div>
            <Navbar admin={admin}/>
            {
              console.log("login here2!")
            }
            <Routes>
                <Route path="/custlogin" element={<Navigate to ="/" />}/>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/about"  element={<AboutUs/>} />
                <Route exact path="/contact"  element={<ContactUs/>} /> 
                <Route exact path="/attractions" element={<Attractions/>}/>
                <Route exact path="/stores" element={<Stores/>} />
                <Route exact path="/shows" element={<Shows/>} />
                <Route exact path="/book" element={<BookTickets/>} />
                <Route exact path="/orders" element={<MyOrders/>} />
                <Route exact path="/profile" element={<Profile/>} />
            </Routes>
          </div>
        }

        {
          (sessionStorage.getItem("Login")==="true" && admin) &&
          <div>
            <Navbar admin={admin}/>
            
            {
              console.log("login here3!")
            }
            <Routes>
                <Route path="/emplogin" element={<Navigate to ="/admin" />}/>
                <Route exact path="/admin" element={<AdminProfile/>} />
            </Routes>
          </div>
        }
       
          {
            console.log("login here4!")
          }
  </div>
  </BrowserRouter>
  </AppContext.Provider>
  );
} 

export default App;
