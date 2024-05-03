import React, { useEffect } from 'react';

const Home = () => {

    useEffect(()=>{
        fetch('http://localhost:8080/account/islogin')
        .then(response=>response.json())
        .then(data=> {
            console.log(data)
        })
    },[])
    
    return (
        <div style={{height:'100vh',width:'100%'}}>
                <div style={{padding:20, display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#e6ca6e'}}>

                    <img src={require('./../../h1.jpg')} style={{width:'40%', height:250}}/>
                    <div style={{
                        fontSize:35,
                        width:'50%',
                        color:'black',
                        fontFamily:'sans-serif',
                        fontWeight:'bold',
                        marginLeft:35,
                        textAlign:'left'}}>
                            "Come Visit Us to have the best time of your lives!"
                    </div>
                </div>



                <div style={{padding:20, display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#5e54a8'}}>

                <div style={{
                    fontSize:35,
                    width:'50%',
                    color:'white',
                    fontFamily:'sans-serif',
                    fontWeight:'bold',
                    marginRight:35,
                    textAlign:'left'}}>
                        "Buys products from your favourite shows at our Shops!!"
                </div>
                <img src={require('./../../h2.jpg')} style={{width:'40%', height:250}}/>
                </div>

                <div style={{padding:60, display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#6e0c0c'}}>
                    <img src={require('./../../h3.jpg')} style={{width:'50%', height:300}}/>
                    <div style={{
                        fontSize:35,
                        width:'50%',
                        color:'white',
                        fontFamily:'sans-serif',
                        fontWeight:'bold',
                        marginLeft:35,
                        textAlign:'left'}}>
                           "Watch your favourite characters come to life on Stage"
                    </div>
                </div>
        </div>
    );
};

export default Home;