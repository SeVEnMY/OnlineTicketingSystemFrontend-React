import React from 'react';

const AboutUs = () => {
    return (
        <div style={{height:'100vh',width:'100%',display:'flex',flexDirection:'row', paddingTop:30,paddingLeft:20}}>
            <div style={{width:'40%'}}>
            <img src={require('./../../a3.jpg')} style={{height:200}}/>
            <img src={require('./../../a2.jpg')} style={{height:450}}/>
            </div>

            <div style={{
                        fontSize:20,
                        width:'50%',
                        color:'black',
                        fontFamily:'sans-serif',
                        fontWeight:'initial',
                        marginLeft:35,
                        textAlign:'left'
                        }}>
                          Welcome to our amusement park! We are a family-friendly{'\n'} destination that offers a variety of rides, games, and attractions that are sure to delight visitors of all ages. Our park has something for everyone, from thrilling roller coasters to gentle rides for younger children, as well as arcade games, live entertainment, and delicious food options. Our park is dedicated to providing a safe and enjoyable experience for all our guests. We have a team of trained staff who work hard to ensure that all our rides and attractions meet the highest safety standards. We also have a range of amenities on site, including restrooms, first aid stations, and stroller rentals, to ensure that our guests have everything they need for a comfortable and enjoyable day out. We take pride in our park's commitment to sustainability and environmental responsibility. We strive to minimize our impact on the environment through initiatives such as recycling programs, energy-efficient lighting, and water conservation efforts. Whether you're visiting us for a family day out, a birthday party, or a corporate event, we are committed to providing an unforgettable experience that you will cherish for years to come. Thank you for choosing our amusement park, and we look forward to welcoming you soon! 
                    </div>
        </div>
    );
};

export default AboutUs;