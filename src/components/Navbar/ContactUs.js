import React from 'react';

const ContactUs = () => {
    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            padding: '20px',
            display:'flex',
            flexDirection:'row'
          }}>
            <div style={{width:'50%'}}>
                <img src={require('./../../c1.jpg')} style={{width:'100%',height:250}}/>
            </div>

            <div style={{width:'50%'}}>
                <h2 style={{ marginBottom: '20px' }}>Contact Us</h2>
                <p style={{ marginBottom: '10px' }}>Email: amusementpark@gmail.com</p>
                <p style={{ marginBottom: '10px' }}>Phone: 555-555-5555</p>
                <p>Address: 1027 Riegelmann Boardwalk, Brooklyn, NY 11224</p>
            </div>
           
          </div>
    );
}; 

export default ContactUs;